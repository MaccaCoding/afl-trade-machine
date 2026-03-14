// ================== Lineup.js ==================

// Controlled team
let firstClick = null;

// Render the lineup for the selected team
function renderLineup() {
    const container = document.getElementById("selectedTeamLineup");
    const teamPlayers = players.filter(p => p.team === selectedTeam);

    let html = `<h3>${selectedTeam} Lineup</h3>
        <table>
        <tr><th>Position</th><th>Name</th><th>Age</th><th>Overall</th><th>Salary</th><th>Contract</th></tr>`;

    teamPlayers.forEach(p => {
        const cls = p.injured ? "injured" : "";
        html += `<tr class="${cls}" data-player="${p.name}" data-position="${p.position}">
                    <td>${p.position}</td>
                    <td>${p.name}</td>
                    <td>${p.age}</td>
                    <td>${p.overall}</td>
                    <td>$${p.salary.toLocaleString()}</td>
                    <td>${p.contractYears} yrs</td>
                 </tr>`;
    });

    html += "</table>";
    container.innerHTML = html;

    // Populate dropdown for viewing other teams
    const otherSelect = document.getElementById("otherTeamSelect");
    otherSelect.innerHTML = "";
    aflTeams.forEach(team => {
        const opt = document.createElement("option");
        opt.value = team;
        opt.textContent = team;
        otherSelect.appendChild(opt);
    });
    otherSelect.value = selectedTeam;

    renderTeamRatings();
}

// Swap positions on click
document.getElementById("selectedTeamLineup").addEventListener("click", (e) => {
    const tr = e.target.closest("tr");
    if (!tr || tr.classList.contains("injured")) return;

    if (!firstClick) {
        firstClick = tr;
        tr.style.background = "#555"; // highlight selected
    } else {
        const name1 = firstClick.dataset.player;
        const name2 = tr.dataset.player;
        const p1 = players.find(p => p.name === name1);
        const p2 = players.find(p => p.name === name2);

        // Swap positions
        [p1.position, p2.position] = [p2.position, p1.position];

        firstClick.style.background = "";
        firstClick = null;

        renderLineup();
    }
});

// Render team ratings (offence, defence, overall)
function renderTeamRatings() {
    const container = document.getElementById("teamRatings");
    const teamPlayers = players.filter(p => p.team === selectedTeam);
    const offence = Math.round(teamPlayers.reduce((sum, p) => sum + p.offence, 0) / teamPlayers.length);
    const defence = Math.round(teamPlayers.reduce((sum, p) => sum + p.defence, 0) / teamPlayers.length);
    const overall = Math.round(teamPlayers.reduce((sum, p) => sum + p.overall, 0) / teamPlayers.length);
    container.innerHTML = `<p>Offence: ${offence}/100</p>
                           <p>Defence: ${defence}/100</p>
                           <p>Overall: ${overall}/100</p>`;
}

// View other teams (read-only, AI-controlled)
document.getElementById("otherTeamSelect").addEventListener("change", (e) => {
    const team = e.target.value;
    const container = document.getElementById("selectedTeamLineup");
    const teamPlayers = players.filter(p => p.team === team);

    let html = `<h3>${team} Lineup (AI Controlled)</h3>
                <table>
                <tr><th>Position</th><th>Name</th><th>Age</th><th>Overall</th></tr>`;

    teamPlayers.forEach(p => {
        const cls = p.injured ? "injured" : "";
        html += `<tr class="${cls}">
                    <td>${p.position}</td>
                    <td>${p.name}</td>
                    <td>${p.age}</td>
                    <td>${p.overall}</td>
                 </tr>`;
    });

    html += "</table>";
    container.innerHTML = html;

    renderTeamRatings();
});

// Initial render
renderLineup();
