// script.js

// ================== Placeholder Data ==================

// Sample players (1 per AFL team for now)
const players = [
  { team: "Collingwood", name: "Nick Daicos", position: "MID", age: 19, salary: 900000, potential: {min:92,max:99}, stats:{kick:90,handball:85,mark:88,tackle:82,speed:90,stamina:88,footyIQ:94,clutch:85,strength:80,discipline:90,rucking:60} },
  { team: "Carlton", name: "Patrick Cripps", position: "MID", age: 27, salary: 1000000, potential: {min:95,max:99}, stats:{kick:92,handball:88,mark:85,tackle:90,speed:86,stamina:90,footyIQ:92,clutch:88,strength:87,discipline:89,rucking:65} },
  { team: "Essendon", name: "Zach Merrett", position: "MID", age: 26, salary: 850000, potential: {min:92,max:98}, stats:{kick:88,handball:86,mark:83,tackle:85,speed:87,stamina:88,footyIQ:90,clutch:87,strength:85,discipline:88,rucking:60} },
  { team: "Richmond", name: "Jack Riewoldt", position: "FF", age: 31, salary: 800000, potential: {min:88,max:95}, stats:{kick:85,handball:80,mark:92,tackle:78,speed:80,stamina:82,footyIQ:88,clutch:90,strength:86,discipline:85,rucking:55} },
  // Add remaining AFL teams
];

// Ladder placeholder
const ladderData = [
  { pos:1, team:"Collingwood", points:0, percentage:100 },
  { pos:2, team:"Carlton", points:0, percentage:100 },
  { pos:3, team:"Essendon", points:0, percentage:100 },
  { pos:4, team:"Richmond", points:0, percentage:100 },
  // Continue all 18 teams
];

// Fixtures with byes and highlighting selected team
const fixtures = [
  // Round 1 (5 games, other teams bye)
  [
    {home:"Collingwood", away:"Carlton", score:null},
    {home:"Essendon", away:"Richmond", score:null},
    {home:"Geelong", away:"Sydney", score:null},
    {home:"Melbourne", away:"Brisbane", score:null},
    {home:"West Coast", away:"Fremantle", score:null}
  ],
  // Round 2 (7 games)
  [
    {home:"Collingwood", away:"Essendon", score:null},
    {home:"Carlton", away:"Richmond", score:null},
    {home:"Geelong", away:"Brisbane", score:null},
    {home:"Sydney", away:"Melbourne", score:null},
    {home:"West Coast", away:"Port Adelaide", score:null},
    {home:"Fremantle", away:"St Kilda", score:null},
    {home:"Adelaide", away:"GWS", score:null}
  ],
  // Continue rounds up to 24 with your bye rules...
];

// Selected team for control
let selectedTeam = "Collingwood";

// ================== Helper Functions ==================
function showSection(id){
  document.querySelectorAll("main section").forEach(s=>s.style.display="none");
  document.getElementById(id).style.display="block";

  switch(id){
    case "home": renderHome(); break;
    case "fixtures": renderFixtures(); break;
    case "lineup": renderLineup(); break;
    case "tactics": renderTactics(); break;
    case "coaching": renderCoaching(); break;
    case "draft": renderDraft(); break;
    case "freeAgency": renderFreeAgency(); break;
    case "trade": renderTrade(); break;
    case "teamStats": renderTeamStats(); break;
    case "playerStats": renderPlayerStats(); break;
    case "awards": renderAwards(); break;
    case "finals": renderFinals(); break;
  }
}

function calculateOverall(player){
  const stats = player.stats;
  const sum = Object.values(stats).reduce((a,b)=>a+b,0);
  const categories = Object.keys(stats).length;
  return Math.round((categories-2)*(sum/categories));
}

// ================== Home Section ==================
function renderHome(){
  // Selected Team Players
  const teamPlayers = players.filter(p=>p.team===selectedTeam);
  let html=`<h2>${selectedTeam} (Your Team)</h2><table><tr>
    <th>Player</th><th>Pos</th><th>Age</th><th>Salary</th><th>Overall</th><th>Potential</th></tr>`;
  teamPlayers.forEach(p=>{
    html+=`<tr>
      <td>${p.name}</td><td>${p.position}</td><td>${p.age}</td><td>$${p.salary.toLocaleString()}</td>
      <td>${calculateOverall(p)}</td><td>${p.potential.min}-${p.potential.max}</td>
    </tr>`;
  });
  html+="</table>";
  document.getElementById("selectedTeamBox").innerHTML=html;

  // Next fixture
  const nextOpponent = "Carlton"; // placeholder
  document.getElementById("nextFixtureBox").innerHTML=`<h3>Next Match: ${selectedTeam} vs ${nextOpponent}</h3>
    <p>${selectedTeam} Record: 0-0 | ${nextOpponent} Record: 0-0</p>`;

  // Ladder
  let ladderHtml=`<h3>Ladder</h3><table><tr><th>Pos</th><th>Team</th><th>Points</th><th>%</th></tr>`;
  ladderData.sort((a,b)=>a.pos-b.pos).forEach(t=>{
    ladderHtml+=`<tr><td>${t.pos}</td><td>${t.team}</td><td>${t.points}</td><td>${t.percentage}</td></tr>`;
  });
  ladderHtml+="</table>";
  document.getElementById("ladderBox").innerHTML=ladderHtml;
}

// ================== Fixtures Section ==================
let currentRound=1;
function renderFixtures(){
  const content=document.getElementById("fixturesContent");
  const roundDisplay=document.getElementById("roundDisplay");
  roundDisplay.textContent=`Round ${currentRound}`;
  const roundGames = fixtures[currentRound-1] || [];
  let html="<table><tr><th>Home</th><th>Away</th><th>Score</th></tr>";
  roundGames.forEach(g=>{
    const cls=(g.home===selectedTeam||g.away===selectedTeam)?"class='highlight'":"";
    html+=`<tr ${cls}><td>${g.home}</td><td>${g.away}</td><td>${g.score||"-"}</td></tr>`;
  });
  html+="</table>"; content.innerHTML=html;
}
document.getElementById("prevRound").addEventListener("click",()=>{
  if(currentRound>1){currentRound--; renderFixtures();}
});
document.getElementById("nextRound").addEventListener("click",()=>{
  if(currentRound<fixtures.length){currentRound++; renderFixtures();}
});

// ================== Lineup Section ==================
function renderLineup(){
  const teamPlayers=players.filter(p=>p.team===selectedTeam);
  let html="<h3>Selected Team Lineup</h3><table><tr><th>Position</th><th>Player</th></tr>";
  teamPlayers.forEach(p=>{
    html+=`<tr class="${p.injured?'injured':''}"><td>${p.position}</td><td>${p.name}</td></tr>`;
  });
  html+="</table>";
  document.getElementById("selectedTeamLineup").innerHTML=html;

  // Dropdown for other teams
  const select=document.getElementById("otherTeamSelect"); select.innerHTML="";
  [...new Set(players.map(p=>p.team))].forEach(t=>{
    let o=document.createElement("option"); o.value=t;o.textContent=t; select.appendChild(o);
  });
  document.getElementById("teamRatings").innerHTML="Offence: 80 | Defence: 85 | Overall: 82";
}

// ================== Tactics Section ==================
function renderTactics(){
  document.getElementById("tacticsPage1").innerHTML="<h3>Game Plan</h3><p>Style & Width selections here</p>";
  document.getElementById("tacticsPage2").innerHTML="<h3>Leadership & Roles</h3><p>Captain, Kickouts, Backup Rucks, Tagger, Spare</p>";
}

// ================== Coaching Section ==================
function renderCoaching(){
  document.getElementById("headCoachBox").innerHTML="<p>Head Coach Placeholder</p>";
  document.getElementById("assistantCoachesBox").innerHTML="<p>4 Assistant Coaches Placeholder</p>";
  document.getElementById("scoutsBox").innerHTML="<p>5 Scouts Placeholder</p>";
  document.getElementById("medicalBox").innerHTML="<p>Medical Team Placeholder</p>";
  document.getElementById("freeAgentCoachesBox").innerHTML="<p>Free Agent Coaches Placeholder</p>";
}

// ================== Draft Section ==================
function renderDraft(){
  document.getElementById("draftBoard").innerHTML="<p>Draft Board Placeholder</p>";
}

// ================== Free Agency ==================
function renderFreeAgency(){
  document.getElementById("freeAgencyContent").innerHTML="<p>Free Agency Placeholder</p>";
}

// ================== Trade Section ==================
function renderTrade(){
  document.getElementById("tradeYourTeam").innerHTML="<p>Your Team Trade Box Placeholder</p>";
  document.getElementById("tradeOtherTeams").innerHTML="<p>Other Teams Trade Box Placeholder</p>";
}

// ================== Team Stats ==================
function renderTeamStats(){
  document.getElementById("teamStatsTable").innerHTML="<p>Team Stats Placeholder</p>";
}

// ================== Player Stats ==================
function renderPlayerStats(){
  document.getElementById("playerStatsContent").innerHTML="<p>Player Stats Placeholder</p>";
}

// ================== Awards ==================
function renderAwards(){
  document.getElementById("awardsContent").innerHTML="<p>Awards Placeholder</p>";
}

// ================== Finals ==================
function renderFinals(){
  document.getElementById("finalsBracket").innerHTML="<p>Finals Bracket Placeholder</p>";
  document.getElementById("finalsStats").innerHTML="<p>Finals Stats Placeholder</p>";
}

// ================== Initialize ==================
showSection("home");
