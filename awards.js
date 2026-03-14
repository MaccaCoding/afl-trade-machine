// ================== awards.js ==================

// Example: Calculate Brownlow Medal based on player performances
// For simplicity, we’ll generate votes randomly; later you can link to match stats
function calculateBrownlow() {
  // Only consider players who are not injured
  const eligiblePlayers = players.filter(p => !p.injured);

  // Give each player random votes for the season (simulate performance)
  eligiblePlayers.forEach(p => {
    p.brownlowVotes = Math.floor(Math.random() * 30); // max 30 votes
  });

  // Sort descending by votes
  const sorted = eligiblePlayers.sort((a,b)=>b.brownlowVotes - a.brownlowVotes);

  return sorted[0]; // Winner
}

// Example: Coleman Medal (highest goals)
function calculateColeman() {
  const eligiblePlayers = players.filter(p => !p.injured);
  
  eligiblePlayers.forEach(p => {
    p.goals = Math.floor(Math.random() * 80); // Random goals for season
  });

  const sorted = eligiblePlayers.sort((a,b)=>b.goals - a.goals);
  return sorted[0];
}

// Example: Rising Star (young players under 21 with high overall)
function calculateRisingStar() {
  const eligiblePlayers = players.filter(p => p.age <= 21 && !p.injured);
  const sorted = eligiblePlayers.sort((a,b)=>b.overall - a.overall);
  return sorted[0];
}

// Render Awards Tab
function renderAwardsTab() {
  const container = document.getElementById("awardsContent");
  container.innerHTML = `<h3>Awards</h3>`;

  const brownlowWinner = calculateBrownlow();
  const colemanWinner = calculateColeman();
  const risingStarWinner = calculateRisingStar();

  let html = `<ul>
    <li><strong>Brownlow Medal:</strong> ${brownlowWinner.name} (${brownlowWinner.team}) - ${brownlowWinner.brownlowVotes} votes</li>
    <li><strong>Coleman Medal:</strong> ${colemanWinner.name} (${colemanWinner.team}) - ${colemanWinner.goals} goals</li>
    <li><strong>Rising Star:</strong> ${risingStarWinner.name} (${risingStarWinner.team}) - Overall ${risingStarWinner.overall}</li>
  </ul>`;

  container.innerHTML = html;
}
