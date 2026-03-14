// ================== finals.js ==================

// Example finals teams (top 8 teams from ladder)
let finalsTeams = ladder.slice(0, 8).map(t => t.team);

// Example: simulate finals series (quarter-finals, semi-finals, prelim, grand final)
let finalsRounds = [
  { name: "Quarter Finals", games: [
    { teamA: finalsTeams[1], teamB: finalsTeams[8-1], scoreA: null, scoreB: null },
    { teamA: finalsTeams[2], teamB: finalsTeams[7-1], scoreA: null, scoreB: null },
    { teamA: finalsTeams[3], teamB: finalsTeams[6-1], scoreA: null, scoreB: null },
    { teamA: finalsTeams[4], teamB: finalsTeams[5-1], scoreA: null, scoreB: null }
  ]},
  { name: "Semi Finals", games: [
    { teamA: "", teamB: "", scoreA: null, scoreB: null },
    { teamA: "", teamB: "", scoreA: null, scoreB: null }
  ]},
  { name: "Preliminary Finals", games: [
    { teamA: "", teamB: "", scoreA: null, scoreB: null },
    { teamA: "", teamB: "", scoreA: null, scoreB: null }
  ]},
  { name: "Grand Final", games: [
    { teamA: "", teamB: "", scoreA: null, scoreB: null }
  ]}
];

// Simulate finals scores based on overall rating (placeholder logic)
function simulateFinals() {
  // Quarter Finals
  finalsRounds[0].games.forEach(game => {
    const teamAOverall = Math.floor(Math.random()*100); // Placeholder for team's overall
    const teamBOverall = Math.floor(Math.random()*100);
    game.scoreA = Math.floor(teamAOverall + Math.random()*50);
    game.scoreB = Math.floor(teamBOverall + Math.random()*50);
  });

  // Semi Finals (winners from quarters)
  finalsRounds[1].games.forEach((game, idx) => {
    const qWinner1 = finalsRounds[0].games[idx*2].scoreA > finalsRounds[0].games[idx*2].scoreB ? finalsRounds[0].games[idx*2].teamA : finalsRounds[0].games[idx*2].teamB;
    const qWinner2 = finalsRounds[0].games[idx*2+1].scoreA > finalsRounds[0].games[idx*2+1].scoreB ? finalsRounds[0].games[idx*2+1].teamA : finalsRounds[0].games[idx*2+1].teamB;
    game.teamA = qWinner1;
    game.teamB = qWinner2;
    game.scoreA = Math.floor(Math.random()*120);
    game.scoreB = Math.floor(Math.random()*120);
  });

  // Preliminary Finals (simulate winners)
  finalsRounds[2].games.forEach((game, idx) => {
    const semiWinner1 = finalsRounds[1].games[idx].scoreA > finalsRounds[1].games[idx].scoreB ? finalsRounds[1].games[idx].teamA : finalsRounds[1].games[idx].teamB;
    const semiWinner2 = finalsRounds[1].games[idx].scoreB > finalsRounds[1].games[idx].scoreA ? finalsRounds[1].games[idx].teamB : finalsRounds[1].games[idx].teamA;
    game.teamA = semiWinner1;
    game.teamB = semiWinner2;
    game.scoreA = Math.floor(Math.random()*130);
    game.scoreB = Math.floor(Math.random()*130);
  });

  // Grand Final
  const prelimWinner1 = finalsRounds[2].games[0].scoreA > finalsRounds[2].games[0].scoreB ? finalsRounds[2].games[0].teamA : finalsRounds[2].games[0].teamB;
  const prelimWinner2 = finalsRounds[2].games[1].scoreA > finalsRounds[2].games[1].scoreB ? finalsRounds[2].games[1].teamA : finalsRounds[2].games[1].teamB;
  finalsRounds[3].games[0].teamA = prelimWinner1;
  finalsRounds[3].games[0].teamB = prelimWinner2;
  finalsRounds[3].games[0].scoreA = Math.floor(Math.random()*140);
  finalsRounds[3].games[0].scoreB = Math.floor(Math.random()*140);
}

// Render the finals bracket
function renderFinalsTab() {
  simulateFinals();
  const container = document.getElementById("finalsBracket");
  container.innerHTML = `<h3>Finals Bracket</h3>`;

  let html = "";
  finalsRounds.forEach(round => {
    html += `<h4>${round.name}</h4><table border="1" style="margin-bottom:20px;">
      <tr><th>Team A</th><th>Score</th><th>Team B</th><th>Score</th></tr>`;
    round.games.forEach(game => {
      html += `<tr>
        <td>${game.teamA}</td>
        <td>${game.scoreA}</td>
        <td>${game.teamB}</td>
        <td>${game.scoreB}</td>
      </tr>`;
    });
    html += `</table>`;
  });

  container.innerHTML = html;

  // Optional: Add final statistics placeholder
  const statsContainer = document.getElementById("finalsStats");
  statsContainer.innerHTML = `<p>Finals stats will be shown here.</p>`;
}
