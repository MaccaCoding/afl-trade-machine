// lineup.js

// Example: selected team lineup data (expandable with all players)
const positions = [
  "Full Back", "Half Back", "Midfield", "Half Forward", "Full Forward", "Followers"
];

// Render lineup table for selected team
function renderLineup() {
  const container = document.getElementById("selectedTeamLineup");
  const teamPlayers = players.filter(p => p.team === selectedTeam);

  let html = `<h3>${selectedTeam} Lineup</h3>
    <table>
      <tr><th>Position</th><th>Name</th><th>Age</th><th>Overall</th><th>Salary</th><th>Contract</th></tr>`;

  teamPlayers.forEach(p => {
    const injuredClass = p.injured ? "injured" : "";
    html += `<tr class="${injuredClass}" data-player="${p.name}" data-position="${p.position}">
      <td>${p.position}</td>
      <td>${p.name}</td>
      <td>${p.age}</td>
      <td>${p.overall}</td>
      <td>$${p.salary.toLocaleString()}</td>
      <td>${p.contractYears} yrs</td>
    </tr>`;
  });

  html += `</table>`;
  container.innerHTML = html;

  // Update dropdown for other teams
  const otherSelect = document.getElementById("otherTeamSelect");
  otherSelect.innerHTML = "";
  aflTeams.forEach(team => {
    const option = document.createElement("option");
    option.value = team;
    option.textContent = team;
    otherSelect.appendChild(option);
  });

  // Set default selection to selectedTeam
  otherSelect.value = selectedTeam;

  renderTeamRatings();
}

// Swap positions when clicking players
let firstClick = null;
document.getElementById("selectedTeamLineup").addEventListener("click", (e) => {
  const tr = e.target.closest("tr");
  if (!tr) return;
  if (tr.classList.contains("injured")) return; // cannot swap injured

  if (!firstClick) {
    firstClick = tr;
    tr.style.background = "#555"; // highlight selection
  } else {
    // swap positions
    const name1 = firstClick.dataset.player;
    const pos1 = firstClick.dataset.position;
    const name2 = tr.dataset.player;
    const pos2 = tr.dataset.position;

    const player1 = players.find(p => p.name === name1);
    const player2 = players.find(p => p.name === name2);

    // swap positions
    [player1.position, player2.position] = [player2.position, player1.position];

    firstClick.style.background = "";
    firstClick = null;

    renderLineup();
  }
});

// Render team ratings
function renderTeamRatings() {
  const container = document.getElementById("teamRatings");
  const teamPlayers = players.filter(p => p.team === selectedTeam);
  const offence = Math.round(teamPlayers.reduce((sum, p) => sum + p.offence, 0)/teamPlayers.length);
  const defence = Math.round(teamPlayers.reduce((sum, p) => sum + p.defence, 0)/teamPlayers.length);
  const overall = Math.round(teamPlayers.reduce((sum, p) => sum + p.overall, 0)/teamPlayers.length);

  container.innerHTML = `
    <p>Offence Rating: ${offence}/100</p>
    <p>Defence Rating: ${defence}/100</p>
    <p>Overall Rating: ${overall}/100</p>
  `;
}

// Dropdown change for other teams (read-only view)
document.getElementById("otherTeamSelect").addEventListener("change", (e) => {
  const selected = e.target.value;
  const container = document.getElementById("selectedTeamLineup");
  const teamPlayers = players.filter(p => p.team === selected);

  let html = `<h3>${selected} Lineup (AI Controlled)</h3>
    <table>
      <tr><th>Position</th><th>Name</th><th>Age</th><th>Overall</th></tr>`;

  teamPlayers.forEach(p => {
    const injuredClass = p.injured ? "injured" : "";
    html += `<tr class="${injuredClass}">
      <td>${p.position}</td>
      <td>${p.name}</td>
      <td>${p.age}</td>
      <td>${p.overall}</td>
    </tr>`;
  });

  html += `</table>`;
  container.innerHTML = html;
  renderTeamRatings(); // still shows selected team ratings only
}

// Initialize lineup
renderLineup();
