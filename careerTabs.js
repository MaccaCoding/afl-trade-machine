// ================== Career Mode Tabs ==================

// Example staff data
const coaches = [
  { name: "John Smith", role: "Head Coach", offence: 95, defence: 90, mindset: "Balanced" },
  { name: "Assistant 1", role: "Assistant", offence: 80, defence: 75, mindset: "Aggressive" },
  { name: "Assistant 2", role: "Assistant", offence: 85, defence: 80, mindset: "Defensive" }
];

const scouts = Array.from({length:5}, (_,i)=>({ name:`Scout ${i+1}`, level:Math.floor(Math.random()*100)}));
const medicalTeam = Array.from({length:10}, (_,i)=>({ name:`Doctor ${i+1}`, rating:Math.floor(Math.random()*100)}));
const freeAgentCoaches = [
  { name:"Young Coach", offence:70, defence:65, potential:90 }
];

// Render Coaching Tab
function renderCoachingTab(){
  document.getElementById("headCoach").innerHTML = `<h4>Head Coach</h4>${coaches[0].name} - Offence: ${coaches[0].offence} Defence: ${coaches[0].defence} Mindset: ${coaches[0].mindset}`;
  document.getElementById("assistantCoaches").innerHTML = `<h4>Assistant Coaches</h4>${coaches.slice(1).map(c=>`${c.name} O:${c.offence} D:${c.defence} M:${c.mindset}`).join("<br>")}`;
  document.getElementById("scouts").innerHTML = `<h4>Scouts</h4>${scouts.map(s=>`${s.name} Level:${s.level}`).join("<br>")}`;
  document.getElementById("medicalTeam").innerHTML = `<h4>Medical Team</h4>${medicalTeam.map(d=>`${d.name} Rating:${d.rating}`).join("<br>")}`;
  document.getElementById("freeAgentCoaches").innerHTML = `<h4>Free Agent Coaches</h4>${freeAgentCoaches.map(f=>`${f.name} O:${f.offence} D:${f.defence} Potential:${f.potential}`).join("<br>")}`;
}

// Drafting Tab
function renderDraftTab(){
  document.getElementById("draftHints").innerHTML = "<p>Focus on midfielders or tall forwards.</p>";
  let html = "<table><tr><th>Rank</th><th>Name</th><th>Position</th><th>Overall</th></tr>";
  draftProspects.forEach((p,i)=>{
    html+=`<tr><td>${i+1}</td><td>${p.name}</td><td>${p.position}</td><td>${p.overall}</td></tr>`;
  });
  html+="</table>";
  document.getElementById("draftTable").innerHTML = html;
}

// Free Agency Tab
function renderFreeAgencyTab(){
  document.getElementById("freeAgencyHints").innerHTML = "<p>Target young defenders.</p>";
  let html = "<table><tr><th>Name</th><th>Team</th><th>Salary</th></tr>";
  freeAgents.forEach(p=>{
    html += `<tr><td>${p.name}</td><td>${p.team}</td><td>${p.salary}</td></tr>`;
  });
  html += "</table>";
  document.getElementById("freeAgencyTable").innerHTML = html;
}

// Trade Tab
function renderTradeTab(){
  document.getElementById("tradeYourTeam").innerHTML = "<p>Your Team Players (editable)</p>";
  document.getElementById("tradeOtherTeams").innerHTML = "<p>Other Teams (AI controlled)</p>";
}

// Team Stats Tab
function renderTeamStatsTab(){
  let html = "<table><tr><th>Team</th><th>Points</th><th>%</th></tr>";
  ladder.forEach(t=>{
    html += `<tr><td>${t.team}</td><td>${t.points}</td><td>${t.percentage}</td></tr>`;
  });
  html += "</table>";
  document.getElementById("teamStatsTable").innerHTML = html;
}

// Player Stats Tab
function renderPlayerStatsTab(){
  let html = "<table><tr><th>Name</th><th>Team</th><th>Overall</th></tr>";
  players.forEach(p=>{
    html += `<tr><td>${p.name}</td><td>${p.team}</td><td>${p.overall}</td></tr>`;
  });
  html += "</table>";
  document.getElementById("playerStatsTable").innerHTML = html;
}

// Awards Tab
function renderAwardsTab(){
  document.getElementById("awardsTable").innerHTML = "<p>Brownlow, Coleman, Rising Star etc.</p>";
}

// Finals Tab
function renderFinalsTab(){
  document.getElementById("finalsBracket").innerHTML = "<p>Finals Bracket</p>";
  document.getElementById("finalsStats").innerHTML = "<p>Stats Leaders</p>";
}

// Initialize all tabs
function renderCareerTabs(){
  renderCoachingTab();
  renderDraftTab();
  renderFreeAgencyTab();
  renderTradeTab();
  renderTeamStatsTab();
  renderPlayerStatsTab();
  renderAwardsTab();
  renderFinalsTab();
}

// Call this function when Career Mode is active
renderCareerTabs();
