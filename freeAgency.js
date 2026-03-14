// ================== freeAgency.js ==================

// Example players data
const allPlayers = [
  { name: "Nick Daicos", team: "Collingwood", age: 20, overall: 95, salary: 900000, contractYears: 4, injured: false },
  { name: "Patrick Cripps", team: "Carlton", age: 25, overall: 92, salary: 850000, contractYears: 3, injured: false },
  { name: "Joel Selwood", team: "Geelong", age: 33, overall: 88, salary: 700000, contractYears: 1, injured: true },
  { name: "Toby Greene", team: "GWS", age: 27, overall: 90, salary: 750000, contractYears: 2, injured: false }
  // Add all other players here
];

// Function to render your team’s free agency table
function renderTeamFreeAgency() {
  const container = document.getElementById("freeAgencyContent");
  let html = `<h3>Your Team Free Agency</h3>`;
  html += `<table>
    <tr>
      <th>Name</th><th>Position</th><th>Age</th><th>Overall</th><th>Salary</th><th>Contract Remaining</th><th>Action</th>
    </tr>`;

  allPlayers.filter(p => p.team === selectedTeam).forEach(player => {
    html += `<tr class="${player.injured?'injured':''}">
      <td>${player.name}</td>
      <td>${player.position || "MID"}</td>
      <td>${player.age}</td>
      <td>${player.overall}</td>
      <td>$${player.salary.toLocaleString()}</td>
      <td>${player.contractYears} yrs</td>
      <td><button onclick="extendContract('${player.name}')">Extend Contract</button></td>
    </tr>`;
  });

  html += `</table>`;
  container.innerHTML = html;
}

// Function to extend a player's contract
function extendContract(playerName) {
  const player = allPlayers.find(p => p.name === playerName);
  if(player) {
    player.contractYears += 1;
    alert(`${player.name}'s contract extended by 1 year.`);
    renderTeamFreeAgency();
  }
}

// Function to render other teams’ free agents (read-only)
function renderOtherTeamsFreeAgents() {
  const container = document.getElementById("freeAgencyContent");
  let html = `<h3>Other Teams Free Agents (Read-Only)</h3>`;
  html += `<table>
    <tr>
      <th>Name</th><th>Team</th><th>Position</th><th>Age</th><th>Overall</th><th>Salary</th><th>Contract Remaining</th>
    </tr>`;

  allPlayers.filter(p => p.team !== selectedTeam).forEach(player => {
    html += `<tr class="${player.injured?'injured':''}">
      <td>${player.name}</td>
      <td>${player.team}</td>
      <td>${player.position || "MID"}</td>
      <td>${player.age}</td>
      <td>${player.overall}</td>
      <td>$${player.salary.toLocaleString()}</td>
      <td>${player.contractYears} yrs</td>
    </tr>`;
  });

  html += `</table>`;
  container.innerHTML += html;
}

// Initialize Free Agency Tab
function renderFreeAgency() {
  renderTeamFreeAgency();
  renderOtherTeamsFreeAgents();
}
