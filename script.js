document.addEventListener("DOMContentLoaded", () => {

  // ----- Player Data -----
  const players = [
    { id: 1, name: "Nick Daicos", team: "Collingwood", position: "MID", age: 19, salary: 900000,
      stats: { kick:95, handball:90, mark:88, tackle:92, speed:90, stamina:91, footyIQ:94, clutch:92, strength:88, discipline:89, rucking:50 },
      potential: { min:90, max:98 }, progression:0.5, regression:0.3
    },
    { id: 2, name: "Patrick Cripps", team: "Carlton", position: "MID", age: 25, salary: 850000,
      stats: { kick:92, handball:88, mark:85, tackle:90, speed:88, stamina:89, footyIQ:93, clutch:90, strength:87, discipline:88, rucking:55 },
      potential: { min:90, max:95 }, progression:0.4, regression:0.4
    },
    { id: 3, name: "Zach Merrett", team: "Essendon", position: "MID", age: 26, salary:800000,
      stats: { kick:90, handball:85, mark:82, tackle:88, speed:87, stamina:88, footyIQ:91, clutch:88, strength:86, discipline:87, rucking:50 },
      potential: { min:88, max:93 }, progression:0.3, regression:0.5
    },
    { id: 4, name: "Jack Riewoldt", team: "Richmond", position: "FF", age:30, salary:780000,
      stats: { kick:88, handball:80, mark:90, tackle:80, speed:82, stamina:85, footyIQ:89, clutch:90, strength:85, discipline:86, rucking:40 },
      potential: { min:85, max:90 }, progression:0.2, regression:0.6
    },
    { id: 5, name: "Patrick Dangerfield", team: "Geelong", position: "MID", age:31, salary:920000,
      stats: { kick:94, handball:91, mark:86, tackle:93, speed:90, stamina:92, footyIQ:95, clutch:92, strength:88, discipline:90, rucking:50 },
      potential: { min:92, max:96 }, progression:0.2, regression:0.5
    },
    { id: 6, name: "Dayne Zorko", team: "Brisbane Lions", position: "MID", age:30, salary:810000,
      stats: { kick:89, handball:85, mark:84, tackle:88, speed:87, stamina:88, footyIQ:90, clutch:89, strength:86, discipline:87, rucking:50 },
      potential: { min:88, max:92 }, progression:0.3, regression:0.5
    },
    { id: 7, name: "Nic Naitanui", team: "West Coast Eagles", position: "RUC", age:28, salary:870000,
      stats: { kick:92, handball:87, mark:90, tackle:85, speed:85, stamina:88, footyIQ:90, clutch:90, strength:93, discipline:85, rucking:98 },
      potential: { min:90, max:95 }, progression:0.3, regression:0.5
    },
    { id: 8, name: "Lance Franklin", team: "Sydney Swans", position: "FF", age:33, salary:950000,
      stats: { kick:95, handball:85, mark:92, tackle:80, speed:85, stamina:87, footyIQ:90, clutch:95, strength:88, discipline:86, rucking:40 },
      potential: { min:93, max:97 }, progression:0.2, regression:0.6
    },
    { id: 9, name: "Tom Mitchell", team: "Hawthorn", position: "MID", age:28, salary:880000,
      stats: { kick:92, handball:88, mark:85, tackle:90, speed:88, stamina:89, footyIQ:91, clutch:90, strength:87, discipline:88, rucking:50 },
      potential: { min:90, max:94 }, progression:0.3, regression:0.4
    },
    { id:10, name: "Taylor Walker", team: "Adelaide Crows", position: "FF", age:31, salary:860000,
      stats: { kick:90, handball:82, mark:88, tackle:82, speed:83, stamina:85, footyIQ:88, clutch:89, strength:86, discipline:85, rucking:40 },
      potential: { min:87, max:92 }, progression:0.2, regression:0.5
    },
    { id:11, name: "Jack Steele", team: "St Kilda", position: "MID", age:24, salary:800000,
      stats: { kick:89, handball:84, mark:85, tackle:88, speed:87, stamina:88, footyIQ:90, clutch:88, strength:86, discipline:87, rucking:50 },
      potential: { min:88, max:93 }, progression:0.4, regression:0.3
    },
    { id:12, name: "Travis Boak", team: "Port Adelaide", position: "MID", age:32, salary:830000,
      stats: { kick:90, handball:85, mark:84, tackle:88, speed:86, stamina:87, footyIQ:89, clutch:88, strength:87, discipline:86, rucking:50 },
      potential: { min:88, max:92 }, progression:0.2, regression:0.5
    },
    { id:13, name: "Christian Petracca", team: "Melbourne", position: "MID", age:25, salary:910000,
      stats: { kick:93, handball:90, mark:87, tackle:92, speed:90, stamina:91, footyIQ:94, clutch:92, strength:88, discipline:89, rucking:50 },
      potential: { min:91, max:96 }, progression:0.4, regression:0.3
    },
    { id:14, name: "Matt Rowell", team: "Gold Coast Suns", position: "MID", age:20, salary:770000,
      stats: { kick:88, handball:85, mark:83, tackle:87, speed:87, stamina:88, footyIQ:90, clutch:88, strength:85, discipline:87, rucking:50 },
      potential: { min:87, max:94 }, progression:0.5, regression:0.2
    },
    { id:15, name: "Marcus Bontempelli", team: "Western Bulldogs", position: "MID", age:25, salary:920000,
      stats: { kick:94, handball:91, mark:86, tackle:92, speed:90, stamina:91, footyIQ:94, clutch:92, strength:88, discipline:90, rucking:50 },
      potential: { min:92, max:97 }, progression:0.4, regression:0.3
    },
    { id:16, name: "Nat Fyfe", team: "Fremantle", position: "MID", age:28, salary:940000,
      stats: { kick:95, handball:92, mark:87, tackle:93, speed:90, stamina:91, footyIQ:95, clutch:93, strength:88, discipline:89, rucking:50 },
      potential: { min:93, max:97 }, progression:0.3, regression:0.4
    },
    { id:17, name: "Ben Cunnington", team: "North Melbourne", position: "MID", age:29, salary:830000,
      stats: { kick:90, handball:86, mark:85, tackle:88, speed:87, stamina:88, footyIQ:90, clutch:88, strength:86, discipline:87, rucking:50 },
      potential: { min:88, max:92 }, progression:0.3, regression:0.4
    },
    { id:18, name: "Stephen Coniglio", team: "GWS Giants", position: "MID", age:26, salary:890000,
      stats: { kick:92, handball:88, mark:85, tackle:90, speed:88, stamina:89, footyIQ:92, clutch:90, strength:87, discipline:88, rucking:50 },
      potential: { min:90, max:95 }, progression:0.3, regression:0.4
    }
  ];

  // ----- Helper Functions -----

  // Overall
  function calculateOverall(player) {
    const stats = Object.values(player.stats);
    const avg = stats.reduce((a,b)=>a+b,0)/stats.length;
    return Math.round((stats.length-2)*avg);
  }

  // Trade Value
  function calculateTradeValue(player) {
    const overall = calculateOverall(player);
    return Math.round(5000 * overall * (45-player.age)/(0.001*player.salary));
  }

  // ----- Render Functions -----

  function renderHome() {
    const container = document.getElementById("homeTeams");
    container.innerHTML = "";
    players.forEach(p=>{
      const div = document.createElement("div");
      div.textContent = `${p.team} - ${p.name} (${p.position}) - $${p.salary.toLocaleString()} - Overall: ${calculateOverall(p)} - Potential: ${p.potential.min}-${p.potential.max}`;
      container.appendChild(div);
    });
  }

  function renderLineup() {
    const container = document.getElementById("lineupContent");
    container.innerHTML = "";
    players.forEach(p=>{
      const div = document.createElement("div");
      div.textContent = `${p.name} (${p.position}) - $${p.salary.toLocaleString()} - Overall: ${calculateOverall(p)} - Potential: ${p.potential.min}-${p.potential.max}`;
      container.appendChild(div);
    });
  }

  function renderPlayerStats() {
    const container = document.getElementById("playerStatsContent");
    container.innerHTML = "";
    players.forEach(p=>{
      const div = document.createElement("div");
      div.textContent = `${p.name} (${p.team}) - Overall: ${calculateOverall(p)}, Trade Value: ${calculateTradeValue(p)}, Stats: ${JSON.stringify(p.stats)}`;
      container.appendChild(div);
    });
  }

  function renderTradePage() {
    const container = document.getElementById("tradeContent");
    container.innerHTML = "<p>Trade machine coming soon...</p>";
  }

  function renderDraftPage() {
    const container = document.getElementById("draftContent");
    container.innerHTML = "<p>Draft prospects will appear here...</p>";
  }

  function renderCoachingPage() {
    const container = document.getElementById("coachingContent");
    container.innerHTML = "<p>Coaches, assistants, doctors, list managers, and free agents...</p>";
  }

  function renderFreeAgencyPage() {
    const container = document.getElementById("freeAgencyContent");
    container.innerHTML = "<p>Free agency signings and resigns...</p>";
  }

  function renderTacticsPage() {
    const container = document.getElementById("tacticsContent");
    container.innerHTML = "<p>Set team tactics: speed, style, ball movement, spare, captain, tagger...</p>";
  }

  function renderFixturePage() {
    const container = document.getElementById("fixtureContent");
    container.innerHTML = "<p>Fixtures and results appear here.</p>";
  }

  function renderTeamStatsPage() {
    const container = document.getElementById("teamStatsContent");
    container.innerHTML = "<p>Team stats ladder, points for/against, sorting...</p>";
  }

  function renderAwardsPage() {
    const container = document.getElementById("awardsContent");
    container.innerHTML = "<p>Brownlow and other awards...</p>";
  }

  function renderFinalsPage() {
    const container = document.getElementById("finalsContent");
    container.innerHTML = "<p>Finals brackets, fixtures, and results...</p>";
  }

  // ----- Sidebar Navigation -----
  const sections = document.querySelectorAll("main section");
  const buttons = document.querySelectorAll("#sidebar button");

  function hideAllSections() {
    sections.forEach(s => s.style.display="none");
  }

  function showSection(id) {
    hideAllSections();
    const section = document.getElementById(id);
    if(section) section.style.display="block";

    // Render dynamic content for the section
    switch(id){
      case "homePage": renderHome(); break;
      case "teamLineupPage": renderLineup(); break;
      case "playerStatsPage": renderPlayerStats(); break;
      case "tradePage": renderTradePage(); break;
      case "draftPage": renderDraftPage(); break;
      case "coachingPage": renderCoachingPage(); break;
      case "freeAgencyPage": renderFreeAgencyPage(); break;
      case "teamTacticsPage": renderTacticsPage(); break;
      case "fixturePage": renderFixturePage(); break;
      case "teamStatsPage": renderTeamStatsPage(); break;
      case "awardsPage": renderAwardsPage(); break;
      case "finalsPage": renderFinalsPage(); break;
    }
  }

  buttons.forEach(btn=>{
    btn.addEventListener("click", ()=>{
      showSection(btn.getAttribute("data-page"));
    });
  });

  // Show Home by default
  showSection("homePage");

  function renderHome() {
  const container = document.getElementById("homeTeams");
  container.innerHTML = "";

  // Group players by team
  const teams = {};
  players.forEach(p => {
    if (!teams[p.team]) teams[p.team] = [];
    teams[p.team].push(p);
  });

  for (const teamName in teams) {
    const teamBox = document.createElement("div");
    teamBox.style.backgroundColor = "#333";
    teamBox.style.padding = "15px";
    teamBox.style.borderRadius = "8px";
    teamBox.style.marginBottom = "15px";

    // Team header
    const teamHeader = document.createElement("h3");
    teamHeader.textContent = `${teamName} - Next match: TBD - Ladder: TBD`;
    teamHeader.style.marginBottom = "10px";
    teamBox.appendChild(teamHeader);

    // Players table
    const table = document.createElement("table");
    table.style.width = "100%";
    table.style.borderCollapse = "collapse";

    const headerRow = document.createElement("tr");
    ["Player", "Pos", "Age", "Salary", "Overall", "Potential"].forEach(title => {
      const th = document.createElement("th");
      th.textContent = title;
      th.style.borderBottom = "1px solid #555";
      th.style.padding = "5px";
      th.style.textAlign = "left";
      table.appendChild(th);
    });
    table.appendChild(headerRow);

    teams[teamName].forEach(p => {
      const row = document.createElement("tr");
      const overall = calculateOverall(p);
      const cells = [
        p.name,
        p.position,
        p.age,
        `$${p.salary.toLocaleString()}`,
        overall,
        `${p.potential.min}-${p.potential.max}`
      ];
      cells.forEach(c => {
        const td = document.createElement("td");
        td.textContent = c;
        td.style.padding = "5px";
        td.style.borderBottom = "1px solid #555";
        row.appendChild(td);
      });
      table.appendChild(row);
    });

    teamBox.appendChild(table);
    container.appendChild(teamBox);
  }
}
});
