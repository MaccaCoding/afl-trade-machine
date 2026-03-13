document.addEventListener("DOMContentLoaded", () => {

  // Select all sections in the main content
  const sections = document.querySelectorAll("main section");

  // Select all buttons in the sidebar
  const buttons = document.querySelectorAll("#sidebar button");

  // Function to hide all sections
  function hideAllPages() {
    sections.forEach(section => {
      section.style.display = "none";
    });
  }

  // Function to show a specific section by ID
  function showPage(pageId) {
    hideAllPages();
    const page = document.getElementById(pageId);
    if (page) {
      page.style.display = "block";
    }
  }

  // Show Home page by default
  showPage("homePage");

  // Add click event to all sidebar buttons
  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const pageId = button.getAttribute("data-page");
      showPage(pageId);
    });
  });

});
