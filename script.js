// --- Trade Machine Logic ---

// Store added players and draft picks
let teamASelectedPlayers = [];
let teamBSelectedPlayers = [];
let teamADraft = [];
let teamBDraft = [];

// Add player to a team
function addPlayer(team, btn) {
    const row = btn.parentElement.parentElement;
    const name = row.children[0].innerText;
    const rating = parseInt(row.children[2].innerText);
    const salary = parseInt(row.children[3].innerText);

    const playerObj = { name, rating, salary };

    if(team === 'A'){
        teamASelectedPlayers.push(playerObj);
        row.style.backgroundColor = '#d0ffd0'; // Mark as added
    } else {
        teamBSelectedPlayers.push(playerObj);
        row.style.backgroundColor = '#d0ffd0';
    }
}

// Add draft pick to a team
function addDraft(team, btn) {
    const row = btn.parentElement.parentElement;
    const pick = parseInt(row.children[0].innerText);
    const value = parseInt(row.children[1].innerText);

    const draftObj = { pick, value };

    if(team === 'A'){
        teamADraft.push(draftObj);
        row.style.backgroundColor = '#d0ffd0';
    } else {
        teamBDraft.push(draftObj);
        row.style.backgroundColor = '#d0ffd0';
    }
}

// Evaluate trade
function evaluateTrade(){
    const teamA = document.getElementById("teamA").value;
    const teamB = document.getElementById("teamB").value;

    if(!teamA || !teamB){
        document.getElementById("tradeResult").innerText = "Please select both teams!";
        return;
    }

    // Calculate total value
    let teamAValue = 0;
    teamASelectedPlayers.forEach(p => teamAValue += p.rating + p.salary/100000); // Normalize salary
    teamADraft.forEach(d => teamAValue += d.value/100); // Normalize draft values

    let teamBValue = 0;
    teamBSelectedPlayers.forEach(p => teamBValue += p.rating + p.salary/100000);
    teamBDraft.forEach(d => teamBValue += d.value/100);

    const diff = Math.abs(teamAValue - teamBValue);

    let resultText = '';
    if(diff < 10){
        resultText = `Fair trade between ${teamA} and ${teamB}!`;
    } else if(teamAValue > teamBValue){
        resultText = `${teamA} gets the better deal!`;
    } else {
        resultText = `${teamB} gets the better deal!`;
    }

    document.getElementById("tradeResult").innerText = resultText;
}

// --- Coaching Simulator Logic ---

function simulateMatch(){
    const team = document.getElementById("coachTeam").value;
    const tactics = document.getElementById("tactics").value;
    const attack = Number(document.getElementById("playerAttack").value);
    const defence = Number(document.getElementById("playerDefence").value);
    const speed = Number(document.getElementById("playerSpeed").value);

    if(!team || isNaN(attack) || isNaN(defence) || isNaN(speed)){
        document.getElementById("coachingResult").innerText = "Please select team and enter all attributes!";
        return;
    }

    // Base score formula
    let score = attack*0.4 + defence*0.3 + speed*0.3;

    // Adjust for tactics
    switch(tactics){
        case 'attack':
            score *= 1.05;
            break;
        case 'defence':
            score *= 1.03;
            break;
        case 'pressure':
            score *= 1.04;
            break;
    }

    // Randomness
    score += Math.random() * 10;

    document.getElementById("coachingResult").innerText =
        `${team} using ${tactics} tactics scores ${Math.round(score)} points!`;
}
