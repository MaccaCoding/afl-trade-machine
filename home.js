// home.js

// Example selected team
let selectedTeam = "Collingwood";

// Example teams for ladder
const aflTeams = [
  "Adelaide","Brisbane","Carlton","Collingwood","Essendon",
  "Fremantle","Geelong","Gold Coast","Greater Western Sydney",
  "Hawthorn","Melbourne","North Melbourne","Port Adelaide",
  "Richmond","St Kilda","Sydney","West Coast","Western Bulldogs"
];

// Example players (1 per team)
const players = aflTeams.map((team, idx) => ({
  team: team,
  name: `${team} Player`,
  position: "MID",
  age: 24 + (idx % 5),
  overall: 90 - idx % 10,
  salary: 900000,
  contractYears: 3,
  injured: false
}));

// Example ladder
let ladder = aflTeams.map((team, idx) => ({
  rank: idx + 1,
  team: team,
  points: Math.floor(Math.random() * 50 + 20),
  percentage: (Math.random() * 50 + 80).toFixed(2)
}));

// Example fixture: next game
const fixtures = [
  { round: 1, games: [
      { teamA: "Collingwood", teamB: "Carlton", scoreA: null, scoreB: null },
      { teamA: "Essendon", teamB: "Geelong", scoreA: null, scoreB: null },
      { teamA: "Adelaide", teamB: "Brisbane", scoreA: null, scoreB: null },
      { teamA: "Fremantle", teamB: "Sydney", scoreA: null, scoreB: null },
      { teamA: "Richmond", teamB: "Port Adelaide", scoreA: null, scoreB: null }
    ]
  }
];

// ============ Render Selected Team ============
function renderSelectedTeam() {
  const container = document.getElementById("selectedTeamBox");
  let html = `<h2>Your Team: ${selectedTeam}</h2>`;
  html += `<table>
    <tr><th>Name</th><th>Position</th><th>Age</th><th>Overall</th><th>Salary</th><th>Contract</th></tr>`;

  const teamPlayers = players.filter(p => p.team === selectedTeam);
  teamPlayers.forEach(p => {
    html += `<tr class="${p.injured ? 'injured' : ''}">
      <td>${p.name}</td>
      <td>${p.position}</td>
      <td>${p.age}</td>
      <td>${p.overall}</td>
      <td>$${p.salary.toLocaleString()}</td>
      <td>${p.contractYears} yrs</td>
    </tr>`;
  });

  html += `</table>`;
  container.innerHTML = html;
}

// ============ Render Next Fixture ============
function renderNextFixture() {
  const container = document.getElementById("nextFixtureBox");
  container.innerHTML = `<h3>Next Fixture</h3>`;

  let nextGame;
  for (let r of fixtures) {
    nextGame = r.games.find(g => g.teamA === selectedTeam || g.teamB === selectedTeam);
    if (nextGame) break;
  }

  if (!nextGame) {
    container.innerHTML += "<p>No upcoming fixtures.</p>";
    return;
  }

  // Display teams and fake records
  container.innerHTML += `<p>${nextGame.teamA} vs ${nextGame.teamB}</p>`;
  container.innerHTML += `<p>${nextGame.teamA} record: ${Math.floor(Math.random() * 10)}W-${Math.floor(Math.random() * 10)}L</p>`;
  container.innerHTML += `<p>${nextGame.teamB} record: ${Math.floor(Math.random() * 10)}W-${Math.floor(Math.random() * 10)}L</p>`;
}

// ============ Render Ladder ============
function renderLadder() {
  const container = document.getElementById("ladderBox");
  ladder.sort((a, b) => a.rank - b.rank);

  let html = `<h3>Ladder</h3><table>
    <tr><th>Rank</th><th>Team</th><th>Points</th><th>%</th></tr>`;

  ladder.forEach(team => {
    html += `<tr class="${team.team === selectedTeam ? 'highlight' : ''}">
      <td>${team.rank}</td>
      <td>${team.team}</td>
      <td>${team.points}</td>
      <td>${team.percentage}</td>
    </tr>`;
  });

  html += `</table>`;
  container.innerHTML = html;
}

// ============ Initialize Home ============
function renderHome() {
  renderSelectedTeam();
  renderNextFixture();
  renderLadder();
}
