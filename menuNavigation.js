// ================== Side Menu Navigation ==================

// Grab all menu buttons and tabs
const menuButtons = document.querySelectorAll(".menuBtn");
const tabs = document.querySelectorAll("#mainContent section");

// Function to hide all tabs
function hideAllTabs() {
  tabs.forEach(tab => {
    tab.style.display = "none";
  });
}

// Function to show a specific tab
function showTab(tabId){
  hideAllTabs();
  const tab = document.getElementById(tabId);
  if(tab) tab.style.display = "block";
}

// Initialize: hide all except Home
hideAllTabs();
showTab("homeTab");

// Add click listeners to menu buttons
menuButtons.forEach(btn=>{
  btn.addEventListener("click", ()=>{
    const tabId = btn.dataset.tab;
    showTab(tabId);
  });
});
