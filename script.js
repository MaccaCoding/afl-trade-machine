```javascript
/* ================================
   AFL CAREER MODE SIMULATION ENGINE
================================ */


/* ================================
   PLAYER RATINGS + OVERALL
================================ */

function calculateOverall(player){

let stats = [
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

let sum = stats.reduce((a,b)=>a+b,0);
let avg = sum / stats.length;

let overall = (stats.length - 2) * avg;

return Math.round(overall);

}


/* ================================
   PLAYER VALUE FORMULA
================================ */

function calculatePlayerValue(player){

let value =
5000 * player.overall *
(45 - player.age) /
(0.001 * player.salary);

return Math.round(value);

}


/* ================================
   DRAFT PICK VALUE
================================ */

function calculatePickValue(realLifeValue){
return realLifeValue * 2;
}


/* ================================
   PLAYER OBJECT TEMPLATE
================================ */

function createPlayer(data){

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

stats:{
goals:0,
disposals:0,
marks:0,
tackles:0
}

};

player.overall = calculateOverall(player);
player.value = calculatePlayerValue(player);

return player;

}


/* ================================
   TEAM OBJECT
================================ */

function createTeam(name){

return{

name:name,

players:[],

wins:0,
losses:0,
draws:0,

pointsFor:0,
pointsAgainst:0

};

}


/* ================================
   TRADE MACHINE
================================ */

function evaluateTrade(teamAPlayers, teamBPlayers){

if(Math.abs(teamAPlayers.length - teamBPlayers.length) > 3){
alert("Trade rejected: more than 3 extra players involved");
return false;
}

let valueA = 0;
let valueB = 0;

teamAPlayers.forEach(p=>{
valueA += (p.value - 2000);
});

teamBPlayers.forEach(p=>{
valueB += (p.value - 2000);
});

let diff = Math.abs(valueA - valueB);

if(diff < 5000){
return "Trade Accepted";
}
else{
return "Trade Rejected";
}

}


/* ================================
   LINEUP SWAP SYSTEM
================================ */

function swapPlayers(playerA, playerB){

let temp = playerA.positionSlot;

playerA.positionSlot = playerB.positionSlot;
playerB.positionSlot = temp;

}


/* ================================
   MATCH SIMULATION
================================ */

function simulateMatch(teamA, teamB){

let attackA = teamA.players.reduce((sum,p)=>sum+p.kick+p.handball,0);
let defenceA = teamA.players.reduce((sum,p)=>sum+p.mark+p.tackle,0);

let attackB = teamB.players.reduce((sum,p)=>sum+p.kick+p.handball,0);
let defenceB = teamB.players.reduce((sum,p)=>sum+p.mark+p.tackle,0);


let goalsA = 0;
let goalsB = 0;

for(let i=0;i<60;i++){

let chance = Math.random();

if(chance < attackA/(attackA+defenceB)){
goalsA++;
}

chance = Math.random();

if(chance < attackB/(attackB+defenceA)){
goalsB++;
}

}


teamA.pointsFor += goalsA*6;
teamA.pointsAgainst += goalsB*6;

teamB.pointsFor += goalsB*6;
teamB.pointsAgainst += goalsA*6;


if(goalsA > goalsB){

teamA.wins++;
teamB.losses++;

}
else if(goalsB > goalsA){

teamB.wins++;
teamA.losses++;

}
else{

teamA.draws++;
teamB.draws++;

}


return{
teamA:goalsA,
teamB:goalsB
};

}


/* ================================
   LADDER SORTING
================================ */

function sortLadder(teams){

teams.sort((a,b)=>{

let pointsA = a.wins*4 + a.draws*2;
let pointsB = b.wins*4 + b.draws*2;

if(pointsB !== pointsA){
return pointsB - pointsA;
}

let percentA = a.pointsFor / a.pointsAgainst;
let percentB = b.pointsFor / b.pointsAgainst;

return percentB - percentA;

});

}


/* ================================
   PLAYER MATCH STATS
================================ */

function generatePlayerStats(player){

player.stats.disposals += Math.floor(Math.random()*25);
player.stats.marks += Math.floor(Math.random()*10);
player.stats.tackles += Math.floor(Math.random()*8);
player.stats.goals += Math.floor(Math.random()*4);

}


/* ================================
   CONTRACT SYSTEM
================================ */

function contractString(player){

return player.contractYears + "x" + player.salary;

}


function advanceSeason(players){

players.forEach(p=>{

p.contractYears--;

if(p.contractYears <= 0){
p.freeAgent = true;
}

});

}


/* ================================
   FREE AGENCY
================================ */

function suggestContract(player){

let base = player.overall * 10000;

if(player.age < 24){
base *= 1.2;
}

if(player.age > 30){
base *= 0.8;
}

return Math.round(base);

}


/* ================================
   COACH OBJECT
================================ */

function createCoach(name){

return{

name:name,

offence: Math.floor(Math.random()*100),
defence: Math.floor(Math.random()*100),

mindset:["Aggressive","Defensive","Balanced"]
[Math.floor(Math.random()*3)]

};

}


/* ================================
   DRAFT SCOUTING
================================ */

function scoutProspect(prospect, scoutLevel){

let revealChance = scoutLevel / 100;

if(Math.random() < revealChance){
prospect.scouted = true;
}

}


/* ================================
   FINALS BRACKET
================================ */

function generateFinals(teams){

sortLadder(teams);

let top8 = teams.slice(0,8);

return{

QF1:[top8[0],top8[3]],
QF2:[top8[1],top8[2]],

EF1:[top8[4],top8[7]],
EF2:[top8[5],top8[6]]

};

}

```
