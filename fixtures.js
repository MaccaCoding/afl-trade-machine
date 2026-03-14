// fixtures.js

// Example: full fixture schedule for simplicity (expandable to all 24 rounds)
const totalRounds = 24;
let currentRound = 1;

// Function to generate dummy fixtures
function generateFixtures() {
  const allRounds = [];
  for (let r = 1; r <= totalRounds; r++) {
    let games = [];
    // Number of games per round varies
    let gamesCount = 9;
    if (r === 1) gamesCount = 5;
    else if ([2,3].includes(r)) gamesCount = 7;
    else if (r === 4) gamesCount = 8;
    else if ([12,14,15,16].includes(r)) gamesCount = 7;
    else if (r === 13) gamesCount = 8;

    // Randomly select teams for demonstration (you can expand with real scheduling)
    const shuffledTeams = [...aflTeams].sort(() => 0.5 - Math.random());
    for (let i = 0; i < gamesCount; i++) {
      const teamA = shuffledTeams[i*2 % shuffledTeams.length];
      const teamB = shuffledTeams[(i*2+1) % shuffledTeams.length];
      games.push({ teamA, teamB, scoreA: null, scoreB: null });
    }

    allRounds.push({ round: r, games });
  }
  return allRounds;
}

const allFixtures = generateFixtures();

// Render fixtures for a round
function renderRound(roundNumber) {
  const container = document.getElementById("fixturesContent");
  const roundData = allFixtures.find(r => r.round === roundNumber);
  if (!roundData) return;

  let html = `<h3>Round ${roundNumber}</h3><table>
    <tr><th>Team A</th><th>Score</th><th>Team B</th><th>Score</th></tr>`;

  roundData.games.forEach(game => {
    const highlight = (game.teamA === selectedTeam || game.teamB === selectedTeam) ? "highlight" : "";
    html += `<tr class="${highlight}">
      <td>${game.teamA}</td>
      <td>${game.scoreA !== null ? game.scoreA : "-"}</td>
      <td>${game.teamB}</td>
      <td>${game.scoreB !== null ? game.scoreB : "-"}</td>
    </tr>`;
  });

  html += `</table>`;
  container.innerHTML = html;
  document.getElementById("roundDisplay").textContent = `Round ${roundNumber}`;
}

// Navigation buttons
document.getElementById("prevRound").addEventListener("click", () => {
  if (currentRound > 1) {
    currentRound--;
    renderRound(currentRound);
  }
});

document.getElementById("nextRound").addEventListener("click", () => {
  if (currentRound < totalRounds) {
    currentRound++;
    renderRound(currentRound);
  }
});

// Initialize first round
renderRound(currentRound);
