// ================== AFL Teams & Players ==================
const aflTeams = [
  "Adelaide", "Brisbane", "Carlton", "Collingwood", "Essendon", "Fremantle",
  "Geelong", "Gold Coast", "GWS", "Hawthorn", "Melbourne", "North Melbourne",
  "Port Adelaide", "Richmond", "St Kilda", "Sydney", "West Coast", "Western Bulldogs"
];

// Positions by line for easy generation
const positions = ["FB","HB","MID","HF","FF","FL"]; // Full back, Half back, Midfield, Half forward, Full forward, Followers

// Function to generate a player
function createPlayer(team, idx){
  const age = Math.floor(Math.random()*17)+18; // 18–34
  const contractYears = age <= 22 ? 5 : age <= 25 ? 4 : age <= 28 ? 3 : age <= 31 ? 2 : 1;
  const salary = 500000 + Math.floor(Math.random()*500000); // Placeholder
  const stats = {
    kick: Math.floor(Math.random()*40)+60,
    handball: Math.floor(Math.random()*40)+60,
    mark: Math.floor(Math.random()*40)+60,
    tackle: Math.floor(Math.random()*40)+60,
    speed: Math.floor(Math.random()*40)+60,
    stamina: Math.floor(Math.random()*40)+60,
    footyIQ: Math.floor(Math.random()*40)+60,
    clutch: Math.floor(Math.random()*40)+60,
    strength: Math.floor(Math.random()*40)+60,
    discipline: Math.floor(Math.random()*40)+60,
    rucking: Math.floor(Math.random()*40)+60
  };
  const overall = Math.round((Object.keys(stats).length-2) * Object.values(stats).reduce((a,b)=>a+b,0)/Object.keys(stats).length);
  const potential = {
    min: overall - Math.floor(Math.random()*5),
    max: overall + Math.floor(Math.random()*5)
  };
  const progression = Math.random()*2; // growth per season
  const regression = Math.random()*1.5; // decline per season

  return {
    id: `${team}-${idx}`,
    name: `${team} Player ${idx+1}`,
    team,
    position: positions[idx%positions.length],
    age,
    salary,
    contractYears,
    stats,
    overall,
    potential,
    progression,
    regression
  };
}

// Generate all players
const players = [];
aflTeams.forEach(team=>{
  for(let i=0;i<40;i++){ // 40 players per team
    players.push(createPlayer(team,i));
  }
});

// ================== Helper Functions ==================
function calculateOverall(player){
  const stats = player.stats;
  const sum = Object.values(stats).reduce((a,b)=>a+b,0);
  const categories = Object.keys(stats).length;
  return Math.round((categories-2)*(sum/categories));
}

function calculateTradeValue(player){
  // Using your formula: 5000x95x(45-age)/(0.001xsalary)
  return Math.round(5000*95*(45-player.age)/(0.001*player.salary));
}

// Example usage:
// console.log(players);
// console.log(calculateOverall(players[0]));
// console.log(calculateTradeValue(players[0]));
