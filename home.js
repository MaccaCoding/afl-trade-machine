// ================== Home Tab Rendering ==================

// Controlled team
let selectedTeam = "Collingwood"; // Change this to control a different team

// Example ladder data (can be replaced with dynamic calculations later)
let ladder = aflTeams.map((team, idx)=>{
  return { rank: idx+1, team, points: Math.floor(Math.random()*50+20), percentage: (Math.random()*50+80).toFixed(2) };
});

// Example fixtures (you can extend all 24 rounds)
const fixtures = [
  { round: 1, games: [
    { teamA: "Collingwood", teamB: "Carlton", scoreA: null, scoreB: null },
    { teamA: "Essendon", teamB: "Geelong", scoreA: null, scoreB: null },
    { teamA: "Adelaide", teamB: "Brisbane", scoreA: null, scoreB: null },
    { teamA: "Fremantle", teamB: "Sydney", scoreA: null, scoreB: null },
    { teamA: "Richmond", teamB: "Port Adelaide", scoreA: null, scoreB: null },
  ]},
  // Add more rounds here...
];

// ================ Render Selected Team Players ================
function renderSelectedTeam() {
  const container = document.getElementById("homeSelectedTeam");
  container.innerHTML = `<h3>Your Team: ${selectedTeam}</h3>`;

  let html = `<table>
    <tr>
      <th>Name</th><th>Position</th><th>Age</th><th>Overall</th><th>Salary</th><th>Contract</th>
    </tr>`;

  const teamPlayers = players.filter(p=>p.team === selectedTeam);
  teamPlayers.forEach(p=>{
    html += `<tr class="${p.injured?'injured':''}">
      <td>${p.name}</td>
      <td>${p.position}</td>
      <td>${p.age}</td>
      <td>${p.overall}</td>
      <td>$${p.salary.toLocaleString()}</td>
      <td>${p.contractYears} yrs</td>
    </tr>`;
  });

  html += `</table>`;
  container.innerHTML += html;
}

// ================ Render Next Fixture ================
function renderNextFixture() {
  const container = document.getElementById("homeNextFixture");
  container.innerHTML = `<h3>Next Fixture</h3>`;

  let nextGame;
  for(let r of fixtures){
    nextGame = r.games.find(g=>g.teamA===selectedTeam || g.teamB===selectedTeam);
    if(nextGame) break;
  }

  if(!nextGame){
    container.innerHTML += "<p>No upcoming fixtures.</p>";
    return;
  }

  // Placeholder team records
  container.innerHTML += `<p>${nextGame.teamA} vs ${nextGame.teamB}</p>`;
  container.innerHTML += `<p>${nextGame.teamA} record: ${Math.floor(Math.random()*10)}W-${Math.floor(Math.random()*10)}L</p>`;
  container.innerHTML += `<p>${nextGame.teamB} record: ${Math.floor(Math.random()*10)}W-${Math.floor(Math.random()*10)}L</p>`;
}

// ================ Render Ladder ================
function renderLadder() {
  const container = document.getElementById("homeLadder");
  container.innerHTML = `<h3>Ladder</h3>`;

  ladder.sort((a,b)=>a.rank-b.rank);

  let html = `<table>
    <tr><th>Rank</th><th>Team</th><th>Points</th><th>%</th></tr>`;

  ladder.forEach(team=>{
    html += `<tr class="${team.team===selectedTeam?'highlight':''}">
      <td>${team.rank}</td>
      <td>${team.team}</td>
      <td>${team.points}</td>
      <td>${team.percentage}</td>
    </tr>`;
  });

  html += `</table>`;
  container.innerHTML = html;
}

// ================ Initialize Home Tab ================
function renderHome() {
  renderSelectedTeam();
  renderNextFixture();
  renderLadder();
}

// Call when Home tab is active
renderHome();
