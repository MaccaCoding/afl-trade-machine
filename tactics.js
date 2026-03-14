// ================== Team Tactics Tab ==================
let tacticsPage = 1; // current page

const selectedTeam = "Collingwood"; // controlled team

// Utility: get all players of selected team
function getTeamPlayers(){
  return players.filter(p => p.team === selectedTeam);
}

// Populate leadership and special roles dropdowns
function populateRoleDropdowns(){
  const teamPlayers = getTeamPlayers();

  const dropdowns = ["captainSelect","leadership1","leadership2","leadership3",
                     "kickoutSelect","backupRuck1","backupRuck2",
                     "backupForward","backupDefensive","taggerSelect","tagTargetSelect"];

  dropdowns.forEach(id=>{
    const select = document.getElementById(id);
    if(!select) return;
    select.innerHTML = "";
    if(id === "tagTargetSelect"){
      select.innerHTML += `<option value="highest" selected>Highest Overall</option>`;
      teamPlayers.forEach(p=>{
        select.innerHTML += `<option value="${p.name}">${p.name}</option>`;
      });
    } else {
      if(id==="taggerSelect"){
        select.innerHTML += `<option value="none" selected>None</option>`;
      }
      teamPlayers.forEach(p=>{
        select.innerHTML += `<option value="${p.name}">${p.name}</option>`;
      });
    }
  });
}

// Show current tactics page
function showTacticsPage(){
  document.getElementById("tacticsPage1").style.display = tacticsPage===1 ? "block":"none";
  document.getElementById("tacticsPage2").style.display = tacticsPage===2 ? "block":"none";
}

// Button listeners
document.getElementById("tacticsPrev").addEventListener("click", ()=>{
  if(tacticsPage>1) tacticsPage--;
  showTacticsPage();
});

document.getElementById("tacticsNext").addEventListener("click", ()=>{
  if(tacticsPage<2) tacticsPage++;
  showTacticsPage();
});

// Initialize
populateRoleDropdowns();
showTacticsPage();
