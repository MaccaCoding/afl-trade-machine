// ================== tactics.js ==================

// Track current page in Tactics section
let currentTacticsPage = 1;

// Render Tactics Section
function renderTactics() {
    const page1 = document.getElementById("tacticsPage1");
    const page2 = document.getElementById("tacticsPage2");

    if (currentTacticsPage === 1) {
        page1.style.display = "block";
        page2.style.display = "none";
    } else {
        page1.style.display = "none";
        page2.style.display = "block";

        // Populate dropdowns with players from selected team
        const teamPlayers = players.filter(p => p.team === selectedTeam);

        const captainSelect = document.getElementById("captainSelect");
        const leadership1 = document.getElementById("leadership1");
        const leadership2 = document.getElementById("leadership2");
        const leadership3 = document.getElementById("leadership3");
        const kickoutSelect = document.getElementById("kickoutSelect");
        const backupRuck1 = document.getElementById("backupRuck1");
        const backupRuck2 = document.getElementById("backupRuck2");
        const backupForward = document.getElementById("backupForward");
        const backupDefensive = document.getElementById("backupDefensive");
        const taggerSelect = document.getElementById("taggerSelect");
        const tagTargetSelect = document.getElementById("tagTargetSelect");

        const dropdowns = [
            captainSelect, leadership1, leadership2, leadership3,
            kickoutSelect, backupRuck1, backupRuck2,
            backupForward, backupDefensive, taggerSelect
        ];

        dropdowns.forEach(dd => {
            dd.innerHTML = "";
            teamPlayers.forEach(p => {
                const opt = document.createElement("option");
                opt.value = p.name;
                opt.textContent = p.name;
                dd.appendChild(opt);
            });
        });

        // Tag target options
        tagTargetSelect.innerHTML = `
            <option value="none">None</option>
            <option value="highest">Highest Overall</option>
            <option value="position">Highest in Position</option>
        `;
    }

    // Optional: update effects on team stats
    updateTeamTacticsEffects();
}

// Event listeners for Previous / Next buttons
document.getElementById("tacticsPrev").addEventListener("click", () => {
    if (currentTacticsPage > 1) currentTacticsPage--;
    renderTactics();
});
document.getElementById("tacticsNext").addEventListener("click", () => {
    if (currentTacticsPage < 2) currentTacticsPage++;
    renderTactics();
});

// Event listeners for page 1 dropdowns
document.querySelectorAll("#playStyle, #ballMovement, #sparePlayer").forEach(sel => {
    sel.addEventListener("change", () => {
        console.log("Page 1 tactic changed:", sel.id, sel.value);
        updateTeamTacticsEffects();
    });
});

// Event listeners for page 2 dropdowns
document.querySelectorAll(
    "#captainSelect,#leadership1,#leadership2,#leadership3,#kickoutSelect,#backupRuck1,#backupRuck2,#backupForward,#backupDefensive,#taggerSelect,#tagTargetSelect"
).forEach(sel => {
    sel.addEventListener("change", () => {
        console.log("Page 2 tactic changed:", sel.id, sel.value);
        updateTeamTacticsEffects();
    });
});

// Placeholder function to calculate effects of tactics on team stats
function updateTeamTacticsEffects() {
    // Get selected tactic values
    const playStyle = document.getElementById("playStyle").value;
    const ballMovement = document.getElementById("ballMovement").value;
    const spare = document.getElementById("sparePlayer").value;

    // For example: attacking increases offence by 5, defensive increases defence by 5
    let teamOffence = 0;
    let teamDefence = 0;

    const teamPlayers = players.filter(p => p.team === selectedTeam);

    teamPlayers.forEach(p => {
        let offence = p.offence;
        let defence = p.defence;

        if (playStyle === "attacking") offence += 5;
        if (playStyle === "defensive") defence += 5;
        if (ballMovement === "wide") offence += 2;
        if (ballMovement === "narrow") defence += 2;

        teamOffence += offence;
        teamDefence += defence;
    });

    teamOffence = Math.round(teamOffence / teamPlayers.length);
    teamDefence = Math.round(teamDefence / teamPlayers.length);
    const overall = Math.round((teamOffence + teamDefence) / 2);

    // Update ratings display
    const container = document.getElementById("teamRatings");
    container.innerHTML = `<p>Offence: ${teamOffence}/100</p>
                           <p>Defence: ${teamDefence}/100</p>
                           <p>Overall: ${overall}/100</p>`;
}

// Initial render
renderTactics();
