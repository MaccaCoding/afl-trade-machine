document.addEventListener("DOMContentLoaded", () => {

  // ----- Player Data -----
  const players = [
    {
      id: 1, name: "Nick Daicos", team: "Collingwood", position: "MID", age: 19, salary: 900000,
      stats: { kick: 95, handball: 90, mark: 88, tackle: 92, speed: 90, stamina: 91, footyIQ: 94, clutch: 92, strength: 88, discipline: 89, rucking: 50 },
      potential: { min: 90, max: 98 }, progression: 0.5, regression: 0.3
    },
    {
      id: 2, name: "Patrick Cripps", team: "Carlton", position: "MID", age: 25, salary: 850000,
      stats: { kick: 92, handball: 88, mark: 85, tackle: 90, speed: 88, stamina: 89, footyIQ: 93, clutch: 90, strength: 87, discipline: 88, rucking: 55 },
      potential: { min: 90, max: 95 }, progression: 0.4, regression: 0.4
    },
    {
      id: 3, name: "Zach Merrett", team: "Essendon", position: "MID", age: 26, salary: 800000,
      stats: { kick: 90, handball: 85, mark: 82, tackle: 88, speed: 87, stamina: 88, footyIQ: 91, clutch: 88, strength: 86, discipline: 87, rucking: 50 },
      potential: { min: 88, max: 93 }, progression: 0.3, regression: 0.5
    },
    {
      id: 4, name: "Jack Riewoldt", team: "Richmond", position: "FF", age: 30, salary: 780000,
      stats: { kick: 88, handball: 80, mark: 90, tackle: 80, speed: 82, stamina: 85, footyIQ: 89, clutch: 90, strength: 85, discipline: 86, rucking: 40 },
      potential: { min: 85, max: 90 }, progression: 0.2, regression: 0.6
    },
    {
      id: 5, name: "Patrick Dangerfield", team: "Geelong", position: "MID", age: 31, salary: 920000,
      stats: { kick: 94, handball: 91, mark: 86, tackle: 93, speed: 90, stamina: 92, footyIQ: 95, clutch: 92, strength: 88, discipline: 90, rucking: 50 },
      potential: { min: 92, max: 96 }, progression: 0.2, regression: 0.5
    },
    {
      id: 6, name: "Dayne Zorko", team: "Brisbane Lions", position: "MID", age: 30, salary: 810000,
      stats: { kick: 89, handball: 85, mark: 84, tackle: 88, speed: 87, stamina: 88, footyIQ: 90, clutch: 89, strength: 86, discipline: 87, rucking: 50 },
      potential: { min: 88, max: 92 }, progression: 0.3, regression: 0.5
    },
    {
      id: 7, name: "Nic Naitanui", team: "West Coast Eagles", position: "RUC", age: 28, salary: 870000,
      stats: { kick: 92, handball: 87, mark: 90, tackle: 85, speed: 85, stamina: 88, footyIQ: 90, clutch: 90, strength: 93, discipline: 85, rucking: 98 },
      potential: { min: 90, max: 95 }, progression: 0.3, regression: 0.5
    },
    {
      id: 8, name: "Lance Franklin", team: "Sydney Swans", position: "FF", age: 33, salary: 950000,
      stats: { kick: 95, handball: 85, mark: 92, tackle: 80, speed: 85, stamina: 87, footyIQ: 90, clutch: 95, strength: 88, discipline: 86, rucking: 40 },
      potential: { min: 93, max: 97 }, progression: 0.2, regression: 0.6
    },
    {
      id: 9, name: "Tom Mitchell", team: "Hawthorn", position: "MID", age: 28, salary: 880000,
      stats: { kick: 92, handball: 88, mark: 85, tackle: 90, speed: 88, stamina: 89, footyIQ: 91, clutch: 90, strength: 87, discipline: 88, rucking: 50 },
      potential: { min: 90, max: 94 }, progression: 0.3, regression: 0.4
    },
    {
      id: 10, name: "Taylor Walker", team: "Adelaide Crows", position: "FF", age: 31, salary: 860000,
      stats: { kick: 90, handball: 82, mark: 88, tackle: 82, speed: 83, stamina: 85, footyIQ: 88, clutch: 89, strength: 86, discipline: 85, rucking: 40 },
      potential: { min: 87, max: 92 }, progression: 0.2, regression: 0.5
    },
    {
      id: 11, name: "Jack Steele", team: "St Kilda", position: "MID", age: 24, salary: 800000,
      stats: { kick: 89, handball: 84, mark: 85, tackle: 88, speed: 87, stamina: 88, footyIQ: 90, clutch: 88, strength: 86, discipline: 87, rucking: 50 },
      potential: { min: 88, max: 93 }, progression: 0.4, regression: 0.3
    },
    {
      id: 12, name: "Travis Boak", team: "Port Adelaide", position: "MID", age: 32, salary: 830000,
      stats: { kick: 90, handball: 85, mark: 84, tackle: 88, speed: 86, stamina: 87, footyIQ: 89, clutch: 88, strength: 87, discipline: 86, rucking: 50 },
      potential: { min: 88, max: 92 }, progression: 0.2, regression: 0.5
    },
    {
      id: 13, name: "Christian Petracca", team: "Melbourne", position: "MID", age: 25, salary: 910000,
      stats: { kick: 93, handball: 90, mark: 87, tackle: 92, speed: 90, stamina: 91, footyIQ: 94, clutch: 92, strength: 88, discipline: 89, rucking: 50 },
      potential: { min: 91, max: 96 }, progression: 0.4, regression: 0.3
    },
    {
      id: 14, name: "Matt Rowell", team: "Gold Coast Suns", position: "MID", age: 20, salary: 770000,
      stats: { kick: 88, handball: 85, mark: 83, tackle: 87, speed: 87, stamina: 88, footyIQ: 90, clutch: 88, strength: 85, discipline: 87, rucking: 50 },
      potential: { min: 87, max: 94 }, progression: 0.5, regression: 0.2
    },
    {
      id: 15, name: "Marcus Bontempelli", team: "Western Bulldogs", position: "MID", age: 25, salary: 920000,
      stats: { kick: 94, handball: 91, mark: 86, tackle: 92, speed: 90, stamina: 91, footyIQ: 94, clutch: 92, strength: 88, discipline: 90, rucking: 50 },
      potential: { min: 92, max: 97 }, progression: 0.4, regression: 0.3
    },
    {
      id: 16, name: "Nat Fyfe", team: "Fremantle", position: "MID", age: 28, salary: 940000,
      stats: { kick: 95, handball: 92, mark: 87, tackle: 93, speed: 90, stamina: 91, footyIQ: 95, clutch: 93, strength: 88, discipline: 89, rucking: 50 },
      potential: { min: 93, max: 97 }, progression: 0.3, regression: 0.4
    },
    {
      id: 17, name: "Ben Cunnington", team: "North Melbourne", position: "MID", age: 29, salary: 830000,
      stats: { kick: 90, handball: 86, mark: 85, tackle: 88, speed: 87, stamina: 88, footyIQ: 90, clutch: 88, strength: 86, discipline: 87, rucking: 50 },
      potential: { min: 88, max: 92 }, progression: 0.3, regression: 0.4
    },
    {
      id: 18, name: "Stephen Coniglio", team: "GWS Giants", position: "MID", age: 26, salary: 890000,
      stats: { kick: 92, handball: 88, mark: 85, tackle: 90, speed: 88, stamina: 89, footyIQ: 92, clutch: 90, strength: 87, discipline: 88, rucking: 50 },
      potential: { min: 90, max: 95 }, progression: 0.3, regression: 0.4
    }
  ];

  // ----- Functions -----

  // Calculate overall based on stats
  function calculateOverall(player) {
    const statValues = Object.values(player.stats);
    const avg = statValues.reduce((a,b)=>a+b,0) / statValues.length;
    const overall = (statValues.length - 2) * avg;
    return Math.round(overall);
  }

  // Calculate trade value
  function calculateTradeValue(player) {
    const overall = calculateOverall(player);
    return Math.round(5000 * overall * (45 - player.age) / (0.001 * player.salary));
  }

  // ----- Generate Home Page -----
  const homePage = document.getElementById("homePage");
  const teamList = document.createElement("ul");
  players.forEach(player => {
    const li = document.createElement("li");
    li.textContent = `${player.team} - ${player.name} (${player.position}) - $${player.salary.toLocaleString()} - Overall: ${calculateOverall(player)} - Potential: ${player.potential.min}-${player.potential.max}`;
    teamList.appendChild(li);
  });
  homePage.appendChild(teamList);

  // ----- Generate Team Lineup Page -----
  const lineupPage = document.getElementById("teamLineupPage");
  const lineupDiv = document.createElement("div");
  lineupDiv.classList.add("lineup");
  players.forEach(player => {
    const playerDiv = document.createElement("div");
    playerDiv.textContent = `${player.name} (${player.position}) - $${player.salary.toLocaleString()} - Overall: ${calculateOverall(player)} - Potential: ${player.potential.min}-${player.potential.max}`;
    lineupDiv.appendChild(playerDiv);
  });
  lineupPage.appendChild(lineupDiv);

  // ----- Generate Player Stats Page -----
  const statsPage = document.getElementById("playerStatsPage");
  players.forEach(player => {
    const div = document.createElement("div");
    div.textContent = `${player.name} (${player.team}) - Overall: ${calculateOverall(player)}, Trade Value: ${calculateTradeValue(player)}, Stats: ${JSON.stringify(player.stats)}`;
    statsPage.appendChild(div);
  });

  // ----- Sidebar Navigation -----
  const sections = document.querySelectorAll("main section");
  const buttons = document.querySelectorAll("#sidebar button");

  function hideAllPages() {
    sections.forEach(section => section.style.display = "none");
  }

  function showPage(pageId) {
    hideAllPages();
    const page = document.getElementById(pageId);
    if(page) page.style.display = "block";
  }

  showPage("homePage"); // Show Home by default

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const pageId = button.getAttribute("data-page");
      showPage(pageId);
    });
  });

});
