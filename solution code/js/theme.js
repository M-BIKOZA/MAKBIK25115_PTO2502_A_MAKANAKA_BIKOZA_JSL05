// theme.js

/**
 * Initializes the theme based on user preferences.
 * Adds event listeners for theme toggling.
 */
export function initializeTheme() {
  const themeToggle = document.getElementById("themeToggle");

  // Check for saved user preference in local storage
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    themeToggle.checked = true; // Set the toggle to checked
  }

  // Add event listener to toggle dark mode
  themeToggle.addEventListener("change", () => {
    if (themeToggle.checked) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark"); // Save preference
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light"); // Save preference
    }
  });
}
