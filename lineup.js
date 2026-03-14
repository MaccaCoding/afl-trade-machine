// ================== Team Lineup Tab ==================

// Controlled team (same as home tab)
let selectedTeam = "Collingwood";

// Populate team dropdown
function populateTeamDropdown() {
  const select = document.getElementById("teamSelect");
  select.innerHTML = "";
  aflTeams.forEach(team=>{
    const option = document.createElement("option");
    option.value = team;
    option.text = team;
    if(team === selectedTeam) option.selected = true;
    select.appendChild(option);
  });

  // Update selected team view when changed
  select.addEventListener("change", ()=>{
    renderTeamLineup(select.value);
  });
}

// Render lineup for a given team
function renderTeamLineup(team) {
  const container = document.getElementById("lineupSelectedTeam");
  container.innerHTML = `<h3>${team} Lineup</h3>`;

  // Separate starters, bench, and reserves
  const teamPlayers = players.filter(p=>p.team === team);
  const starters = teamPlayers.slice(0,18);
  const bench = teamPlayers.slice(18,23);
  const reserves = teamPlayers.slice(23);

  let html = `<h4>Starters</h4><table>
    <tr><th>Name</th><th>Position</th><th>Age</th><th>Overall</th></tr>`;
  starters.forEach(p=>{
    html += `<tr class="${p.injured?'injured':''} ${team!==selectedTeam?'readonly':''}" data-id="${p.id}">
      <td>${p.name}</td>
      <td>${p.position}</td>
      <td>${p.age}</td>
      <td>${p.overall}</td>
    </tr>`;
  });
  html += `</table>`;

  html += `<h4>Bench</h4><table>
    <tr><th>Name</th><th>Position</th><th>Age</th><th>Overall</th></tr>`;
  bench.forEach(p=>{
    html += `<tr class="${p.injured?'injured':''} ${team!==selectedTeam?'readonly':''}" data-id="${p.id}">
      <td>${p.name}</td>
      <td>${p.position}</td>
      <td>${p.age}</td>
      <td>${p.overall}</td>
    </tr>`;
  });
  html += `</table>`;

  html += `<h4>Reserves (Injured/Suspended)</h4><table>
    <tr><th>Name</th><th>Position</th><th>Age</th><th>Overall</th></tr>`;
  reserves.forEach(p=>{
    html += `<tr class="injured readonly" data-id="${p.id}">
      <td>${p.name}</td>
      <td>${p.position}</td>
      <td>${p.age}</td>
      <td>${p.overall}</td>
    </tr>`;
  });
  html += `</table>`;

  container.innerHTML = html;

  // Enable swapping positions only for selectedTeam
  if(team === selectedTeam){
    enablePositionSwap();
  }
}

// ================ Position Swap Logic ==================
let firstSelected = null;
function enablePositionSwap(){
  const rows = document.querySelectorAll("#lineupSelectedTeam tr:not(.readonly):not(:first-child)");
  rows.forEach(row=>{
    row.addEventListener("click", ()=>{
      if(!firstSelected){
        firstSelected = row;
        row.style.backgroundColor = "#ffc"; // highlight first selected
      } else {
        // Swap the players in the array
        const id1 = firstSelected.dataset.id;
        const id2 = row.dataset.id;
        const idx1 = players.findIndex(p=>p.id===id1);
        const idx2 = players.findIndex(p=>p.id===id2);
        const temp = players[idx1];
        players[idx1] = players[idx2];
        players[idx2] = temp;

        firstSelected.style.backgroundColor = ""; // remove highlight
        firstSelected = null;

        // Re-render the lineup
        renderTeamLineup(selectedTeam);
      }
    });
  });
}

// ================ Initialize Team Lineup Tab ==================
populateTeamDropdown();
renderTeamLineup(selectedTeam);
