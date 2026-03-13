```javascript id="y7x5r1"
// =====================================
// AFL CAREER MODE JAVASCRIPT
// =====================================
// 1️⃣ PAGE NAVIGATION: show only selected page
document.addEventListener("DOMContentLoaded", function () {

const sections = document.querySelectorAll("main section");
const buttons = document.querySelectorAll("#sidebar button");

function hideAllPages() {
sections.forEach(section => section.style.display = "none");
}

function showPage(pageId) {
hideAllPages();
const page = document.getElementById(pageId);
if (page) page.style.display = "block";
}

// Default page
showPage("homePage");

// Sidebar button clicks
buttons.forEach(button => {
button.addEventListener("click", function () {
const pageId = button.getAttribute("data-page");
showPage(pageId);
});
});

});


// =====================================
// 2️⃣ PLAYER OVERALL CALCULATION
// overall = (number of categories - 2) * average
// categories: kick, handball, mark, tackle, speed, stamina, footyIQ, clutch, strength, discipline, rucking
// =====================================
function calculateOverall(player) {
const stats = [
player.kick,
player.handball,
player.mark,
player.tackle,
player.speed,
player.stamina,
player.footyIQ,
player.clutch,
player.strength,
player.discipline,
player.rucking
];

const avg = stats.reduce((a, b) => a + b, 0) / stats.length;
const overall = (stats.length - 2) * avg;
return Math.round(overall);
}


// =====================================
// 3️⃣ PLAYER VALUE FORMULA
// value = 5000 * overall * (45 - age) / (0.001 * salary)
// =====================================
function calculatePlayerValue(player) {
return Math.round(5000 * player.overall * (45 - player.age) / (0.001 * player.salary));
}


// =====================================
// 4️⃣ DRAFT PICK VALUE
// double the real life value
// =====================================
function calculatePickValue(realValue) {
return realValue * 2;
}


// =====================================
// 5️⃣ PLAYER OBJECT CREATION
// =====================================
function createPlayer(data) {
let player = {
name: data.name,
team: data.team,
position: data.position,
age: data.age,
kick: data.kick,
handball: data.handball,
mark: data.mark,
tackle: data.tackle,
speed: data.speed,
stamina: data.stamina,
footyIQ: data.footyIQ,
clutch: data.clutch,
strength: data.strength,
discipline: data.discipline,
rucking: data.rucking,
salary: data.salary,
contractYears: data.contractYears,
injured: false,
suspended: false,
stats: {
goals: 0,
disposals: 0,
marks: 0,
tackles: 0
}
};
player.overall = calculateOverall(player);
player.value = calculatePlayerValue(player);
return player;
}


// =====================================
// 6️⃣ TEAM OBJECT CREATION
// =====================================
function createTeam(name) {
return {
name: name,
players: [],
wins: 0,
losses: 0,
draws: 0,
pointsFor: 0,
pointsAgainst: 0
};
}


// =====================================
// 7️⃣ TRADE MACHINE LOGIC
// subtract 2000 from player value, max 3 extra players difference
// =====================================
function evaluateTrade(teamAPlayers, teamBPlayers) {
if (Math.abs(teamAPlayers.length - teamBPlayers.length) > 3) {
alert("Trade rejected: more than 3 extra players involved");
return false;
}

let valueA = teamAPlayers.reduce((sum, p) => sum + (p.value - 2000), 0);
let valueB = teamBPlayers.reduce((sum, p) => sum + (p.value - 2000), 0);

if (Math.abs(valueA - valueB) < 5000) {
return "Trade Accepted";
} else {
return "Trade Rejected";
}
}


// =====================================
// 8️⃣ LINEUP SWAP SYSTEM
// =====================================
function swapPlayers(playerA, playerB) {
let temp = playerA.positionSlot;
playerA.positionSlot = playerB.positionSlot;
playerB.positionSlot = temp;
}


// =====================================
// 9️⃣ MATCH SIMULATION
// =====================================
function simulateMatch(teamA, teamB) {
let attackA = teamA.players.reduce((sum, p) => sum + p.kick + p.handball, 0);
let defenceA = teamA.players.reduce((sum, p) => sum + p.mark + p.tackle, 0);
let attackB = teamB.players.reduce((sum, p) => sum + p.kick + p.handball, 0);
let defenceB = teamB.players.reduce((sum, p) => sum + p.mark + p.tackle, 0);

let goalsA = 0, goalsB = 0;

for (let i = 0; i < 60; i++) {
let chance = Math.random();
if (chance < attackA / (attackA + defenceB)) goalsA++;
chance = Math.random();
if (chance < attackB / (attackB + defenceA)) goalsB++;
}

teamA.pointsFor += goalsA * 6;
teamA.pointsAgainst += goalsB * 6;
teamB.pointsFor += goalsB * 6;
teamB.pointsAgainst += goalsA * 6;

if (goalsA > goalsB) { teamA.wins++; teamB.losses++; }
else if (goalsB > goalsA) { teamB.wins++; teamA.losses++; }
else { teamA.draws++; teamB.draws++; }

return { teamA: goalsA, teamB: goalsB };
}


// =====================================
// 10️⃣ LADDER SORTING
// =====================================
function sortLadder(teams) {
teams.sort((a, b) => {
let pointsA = a.wins * 4 + a.draws * 2;
let pointsB = b.wins * 4 + b.draws * 2;
if (pointsB !== pointsA) return pointsB - pointsA;
let percentA = a.pointsFor / a.pointsAgainst;
let percentB = b.pointsFor / b.pointsAgainst;
return percentB - percentA;
});
}


// =====================================
// 11️⃣ PLAYER MATCH STATS GENERATOR
// =====================================
function generatePlayerStats(player) {
player.stats.disposals += Math.floor(Math.random() * 25);
player.stats.marks += Math.floor(Math.random() * 10);
player.stats.tackles += Math.floor(Math.random() * 8);
player.stats.goals += Math.floor(Math.random() * 4);
}


// =====================================
// 12️⃣ CONTRACT SYSTEM
// =====================================
function contractString(player) {
return player.contractYears + "x" + player.salary;
}

function advanceSeason(players) {
players.forEach(p => {
p.contractYears--;
if (p.contractYears <= 0) p.freeAgent = true;
});
}

function suggestContract(player) {
let base = player.overall * 10000;
if (player.age < 24) base *= 1.2;
if (player.age > 30) base *= 0.8;
return Math.round(base);
}


// =====================================
// 13️⃣ COACH CREATION
// =====================================
function createCoach(name) {
return {
name: name,
offence: Math.floor(Math.random() * 100),
defence: Math.floor(Math.random() * 100),
mindset: ["Aggressive", "Defensive", "Balanced"][Math.floor(Math.random() * 3)]
};
}


// =====================================
// 14️⃣ DRAFT SCOUTING
// =====================================
function scoutProspect(prospect, scoutLevel) {
let revealChance = scoutLevel / 100;
if (Math.random() < revealChance) prospect.scouted = true;
}


// =====================================
// 15️⃣ FINALS BRACKET GENERATION
// =====================================
function generateFinals(teams) {
sortLadder(teams);
let top8 = teams.slice(0, 8);
return {
QF1: [top8[0], top8[3]],
QF2: [top8[1], top8[2]],
EF1: [top8[4], top8[7]],
EF2: [top8[5], top8[6]]
};
}
```
