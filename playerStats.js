// ================== playerStats.js ==================

// Example players (one per team, extend for full rosters)
const players = [
  { name: "Nick Daicos", team: "Collingwood", position: "MID", age: 19, overall: 95, salary: 900000, contractYears: 4, kick: 95, handball: 90, mark: 92, tackle: 88, speed: 94, stamina: 96, footyIQ: 97, clutch: 93, strength: 89, discipline: 90, rucking: 85, injured: false },
  { name: "Patrick Cripps", team: "Carlton", position: "MID", age: 27, overall: 92, salary: 850000, contractYears: 3, kick: 92, handball: 91, mark: 90, tackle: 89, speed: 91, stamina: 90, footyIQ: 95, clutch: 88, strength: 92, discipline: 90, rucking: 86, injured: false },
  { name: "Joel Selwood", team: "Geelong", position: "MID", age: 33, overall: 90, salary: 800000, contractYears: 2, kick: 90, handball: 89, mark: 88, tackle: 92, speed: 87, stamina: 88, footyIQ: 94, clutch: 89, strength: 90, discipline: 88, rucking: 84, injured: false },
  { name: "Zach Merrett", team: "Essendon", position: "MID", age: 26, overall: 91, salary: 840000, contractYears: 3, kick: 91, handball: 89, mark: 87, tackle: 90, speed: 90, stamina: 91, footyIQ: 92, clutch: 90, strength: 88, discipline: 89, rucking: 85, injured: false }
  // Add more players for other teams...
];

// Categories for stats display
const statCategories = ["kick","handball","mark","tackle","speed","stamina","footyIQ","clutch","strength","discipline","rucking"];

// Render team players stats
function renderTeamPlayerStats() {
  const container = document.getElementById("playerStatsContent");
  container.innerHTML = `<h3>${selectedTeam} Players</h3>`;

  const teamPlayers = players.filter(p => p.team === selectedTeam);

  let html = `<table>
    <tr>
      <th>Name</th><th>Position</th><th>Age</th><th>Overall</th><th>Salary</th><th>Contract</th>`;
  statCategories.forEach(cat => { html += `<th>${cat}</th>`; });
  html += `</tr>`;

  teamPlayers.forEach(p => {
    html += `<tr class="${p.injured ? 'injured' : ''}">
      <td>${p.name}</td>
      <td>${p.position}</td>
      <td>${p.age}</td>
      <td>${p.overall}</td>
      <td>$${p.salary.toLocaleString()}</td>
      <td>${p.contractYears} yrs</td>`;
    statCategories.forEach(cat => { html += `<td>${p[cat]}</td>`; });
    html += `</tr>`;
  });

  html += `</table>`;
  container.innerHTML = html;
}

// Render competition leaders (top player for each stat)
function renderPlayerLeaders() {
  const container = document.getElementById("playerStatsContent");
  container.innerHTML += `<h3>Competition Leaders</h3>`;

  let html = `<table>
    <tr><th>Stat</th><th>Player</th><th>Team</th><th>Value</th></tr>`;

  statCategories.forEach(stat => {
    let topPlayer = [...players].sort((a,b)=>b[stat]-a[stat])[0];
    html += `<tr>
      <td>${stat}</td>
      <td>${topPlayer.name}</td>
      <td>${topPlayer.team}</td>
      <td>${topPlayer[stat]}</td>
    </tr>`;
  });

  html += `</table>`;
  container.innerHTML += html;
}

// Function to update overalls dynamically (if stats change)
function updatePlayerOverall(player) {
  const sum = statCategories.reduce((acc,cat)=>acc+player[cat],0);
  player.overall = Math.round(sum / statCategories.length);
}

// Initialize Player Stats Tab
function renderPlayerStatsTab() {
  renderTeamPlayerStats();
  renderPlayerLeaders();
}
