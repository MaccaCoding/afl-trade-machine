// ================== teamStats.js ==================

// Example AFL teams (expand as needed)
const aflTeams = [
  "Collingwood",
  "Carlton",
  "Geelong",
  "Essendon",
  "Richmond",
  "Hawthorn",
  "Western Bulldogs",
  "Sydney",
  "Brisbane",
  "Adelaide",
  "Port Adelaide",
  "Fremantle",
  "St Kilda",
  "North Melbourne",
  "Gold Coast",
  "GWS"
];

// Example team stats (can later be dynamic or pulled from player performances)
let teamStats = aflTeams.map((team, idx) => ({
  team: team,
  rank: idx + 1,
  played: 24,
  wins: Math.floor(Math.random() * 15),
  losses: Math.floor(Math.random() * 9),
  points: Math.floor(Math.random() * 60 + 20),
  percentage: (Math.random() * 100 + 50).toFixed(2),
  for: Math.floor(Math.random() * 2500 + 1000),
  against: Math.floor(Math.random() * 2500 + 1000)
}));

// Render ladder table
function renderTeamStats() {
  const container = document.getElementById("teamStatsTable");

  let html = `<table>
    <tr>
      <th>Rank</th>
      <th>Team</th>
      <th>Played</th>
      <th>Wins</th>
      <th>Losses</th>
      <th>Points</th>
      <th>%</th>
      <th>For</th>
      <th>Against</th>
    </tr>`;

  // Sort by rank
  teamStats.sort((a, b) => a.rank - b.rank);

  teamStats.forEach(team => {
    html += `<tr class="${team.team === selectedTeam ? 'highlight' : ''}">
      <td>${team.rank}</td>
      <td>${team.team}</td>
      <td>${team.played}</td>
      <td>${team.wins}</td>
      <td>${team.losses}</td>
      <td>${team.points}</td>
      <td>${team.percentage}</td>
      <td>${team.for}</td>
      <td>${team.against}</td>
    </tr>`;
  });

  html += `</table>`;
  container.innerHTML = html;
}

// Optional: allow sorting by column
function sortTeamStats(column) {
  teamStats.sort((a, b) => b[column] - a[column]);
  renderTeamStats();
}

// Initialize Team Stats Tab
function renderTeamStatsTab() {
  renderTeamStats();
}
