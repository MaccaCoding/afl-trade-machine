// ================== draft.js ==================

// Example draft prospects data
const draftProspects = [
  { name: "Player A", position: "MID", age: 18, rating: 88, potential: 95 },
  { name: "Player B", position: "DEF", age: 17, rating: 85, potential: 93 },
  { name: "Player C", position: "FWD", age: 19, rating: 82, potential: 90 },
  { name: "Player D", position: "MID", age: 18, rating: 87, potential: 92 },
  { name: "Player E", position: "RUC", age: 18, rating: 80, potential: 89 }
  // Add more players as needed
];

// Example draft hints for your team
const draftHints = [
  "Focus on a strong midfielder",
  "Consider a key forward for scoring",
  "Defensive depth would be useful"
];

// Simulate scout discovery (randomized visibility)
function getScoutVisibility(player, scoutLevel) {
  // scoutLevel 1-5, higher means more info
  const reveal = Math.random() * 5 <= scoutLevel;
  return reveal;
}

// Render draft hints
function renderDraftHints() {
  const container = document.getElementById("draftHints");
  let html = "<ul>";
  draftHints.forEach(hint => {
    html += `<li>${hint}</li>`;
  });
  html += "</ul>";
  container.innerHTML = html;
}

// Render draft board
function renderDraftBoard() {
  const container = document.getElementById("draftBoard");
  let html = `<table>
    <tr>
      <th>Rank</th>
      <th>Name</th>
      <th>Position</th>
      <th>Age</th>
      <th>Current Rating</th>
      <th>Potential</th>
    </tr>`;

  draftProspects.forEach((player, idx) => {
    // Assume a basic scout level for demonstration
    const scoutLevel = 3;
    const showStats = getScoutVisibility(player, scoutLevel);
    html += `<tr>
      <td>${idx + 1}</td>
      <td>${player.name}</td>
      <td>${player.position}</td>
      <td>${player.age}</td>
      <td>${showStats ? player.rating : "??"}</td>
      <td>${showStats ? player.potential : "??"}</td>
    </tr>`;
  });

  html += `</table>`;
  container.innerHTML = html;
}

// Initialize Draft Tab
function renderDraft() {
  renderDraftHints();
  renderDraftBoard();
}

// Call when draft tab is activated
renderDraft();
