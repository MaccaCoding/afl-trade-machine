// menuNavigation.js
const menuButtons = document.querySelectorAll(".menuBtn");
const sections = document.querySelectorAll("main section");

// Function to show only the selected tab
function showSection(tabId) {
  sections.forEach(sec => {
    if (sec.id === tabId) {
      sec.style.display = "block";
    } else {
      sec.style.display = "none";
    }
  });

  // Optional: highlight active button
  menuButtons.forEach(btn => {
    btn.classList.toggle("active", btn.dataset.tab === tabId);
  });

  // If Home tab is selected, render it
  if (tabId === "homeTab") {
    if (typeof renderHome === "function") renderHome();
  }
}

// Initialize: show Home tab by default
showSection("homeTab");

// Add click listeners
menuButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    showSection(btn.dataset.tab);
  });
});
