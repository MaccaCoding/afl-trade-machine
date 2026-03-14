// ================== trade.js ==================

// Example teams and players (expand as needed)
const tradeTeams = ["Collingwood", "Carlton", "Geelong", "Essendon", "Richmond"];

// Example players for each team
const tradePlayers = [
  { name: "Nick Daicos", team: "Collingwood", age: 20, overall: 95, salary: 900000, contractYears: 4, position: "MID" },
  { name: "Patrick Cripps", team: "Carlton", age: 25, overall: 92, salary: 850000, contractYears: 3, position: "MID" },
  { name: "Joel Selwood", team: "Geelong", age: 33, overall: 88, salary: 700000, contractYears: 1, position: "MID" },
  { name: "Dyson Heppell", team: "Essendon", age: 29, overall: 89, salary: 750000, contractYears: 2, position: "MID" },
  { name: "Jack Riewoldt", team: "Richmond", age: 31, overall: 87, salary: 720000, contractYears: 1, position: "FWD" }
  // Add more players for each team
];

// Formula to calculate player value
function calculatePlayerValue(player) {
  // Using your formula: 5000 x overall x (45 - age) / (0.001 x salary)
  return Math.floor(5000 * player.overall * (45 - player.age) / (0.001 * player.salary));
}

// Render trade tables
function renderTrade() {
  const container = document.getElementById("tradeYourTeam");
  let html = `<h3>Your Team: ${selectedTeam}</h3>`;
  const yourPlayers = tradePlayers.filter(p => p.team === selectedTeam);

  html += `<table>
    <tr>
      <th>Name</th><th>Position</th><th>Age</th><th>Overall</th><th>Salary</th><th>Contract</th><th>Value</th><th>Trade</th>
    </tr>`;

  yourPlayers.forEach(player => {
    const value = calculatePlayerValue(player) - 2000; // subtract 2000 per your instructions
    html += `<tr>
      <td>${player.name}</td>
      <td>${player.position}</td>
      <td>${player.age}</td>
      <td>${player.overall}</td>
      <td>$${player.salary.toLocaleString()}</td>
      <td>${player.contractYears} yrs</td>
      <td>${value}</td>
      <td><input type="checkbox" class="tradeYourCheckbox" data-player="${player.name}"></td>
    </tr>`;
  });

  html += `</table>`;
  container.innerHTML = html;

  // Render other teams
  const otherContainer = document.getElementById("tradeOtherTeams");
  let otherHtml = "";
  tradeTeams.filter(t => t !== selectedTeam).forEach(team => {
    const teamPlayers = tradePlayers.filter(p => p.team === team);
    otherHtml += `<h4>${team}</h4>`;
    otherHtml += `<table>
      <tr>
        <th>Name</th><th>Position</th><th>Age</th><th>Overall</th><th>Salary</th><th>Contract</th><th>Value</th><th>Trade</th>
      </tr>`;
    teamPlayers.forEach(player => {
      const value = calculatePlayerValue(player);
      otherHtml += `<tr>
        <td>${player.name}</td>
        <td>${player.position}</td>
        <td>${player.age}</td>
        <td>${player.overall}</td>
        <td>$${player.salary.toLocaleString()}</td>
        <td>${player.contractYears} yrs</td>
        <td>${value}</td>
        <td><input type="checkbox" class="tradeOtherCheckbox" data-player="${player.name}" data-team="${team}"></td>
      </tr>`;
    });
    otherHtml += `</table>`;
  });
  otherContainer.innerHTML = otherHtml;

  // Add evaluate trade button
  otherContainer.innerHTML += `<button id="evaluateTradeBtn">Evaluate Trade</button>`;

  // Add event listener
  document.getElementById("evaluateTradeBtn").addEventListener("click", evaluateTrade);
}

// Evaluate trade logic
function evaluateTrade() {
  const yourSelected = Array.from(document.querySelectorAll(".tradeYourCheckbox:checked"));
  const otherSelected = Array.from(document.querySelectorAll(".tradeOtherCheckbox:checked"));

  if(yourSelected.length + otherSelected.length > 6) { // Max 3 in/out per side
    alert("Cannot trade more than 3 players in or out!");
    return;
  }

  // Calculate totals
  let yourTotal = 0;
  yourSelected.forEach(cb => {
    const player = tradePlayers.find(p => p.name === cb.dataset.player);
    yourTotal += calculatePlayerValue(player) - 2000;
  });

  let otherTotal = 0;
  otherSelected.forEach(cb => {
    const player = tradePlayers.find(p => p.name === cb.dataset.player);
    otherTotal += calculatePlayerValue(player);
  });

  const diff = Math.abs(yourTotal - otherTotal);
  if(diff < 100) {
    alert("Fair Trade!");
  } else {
    alert("Trade is unbalanced.");
  }
}

// Initialize Trade Tab
function renderTradeTab() {
  renderTrade();
}
