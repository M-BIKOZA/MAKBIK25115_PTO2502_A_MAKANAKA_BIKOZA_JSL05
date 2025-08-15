// sidebar.js

// Add logic to toggle sidebar visibility
const hideSidebarButton = document.getElementById('hideSidebar');
const unhideSidebarButton = document.getElementById('showSidebar');
const sidebar = document.querySelector(".side-bar"); 

// Add logic to dynamically toggle the sidebar-hidden class on the body
const body = document.body;

/**
 * Event handler to hide the sidebar
 * Update the display and adds the sidebar-hidden class to the body
 */
hideSidebarButton.addEventListener('click', () => {
    sidebar.style.display = 'none';
    unhideSidebarButton.style.display = 'block';
    body.classList.add('sidebar-hidden');
});

/**
 * Event handler to unhide the sidebar.
 * Update the display and removes the sidebar-hidden class from the body.
 */
unhideSidebarButton.addEventListener('click', () => {
    sidebar.style.display = 'block';
    unhideSidebarButton.style.display = 'none';
    body.classList.remove('sidebar-hidden');
});

// Add logic to show the mobile sidebar modal when the main-header image is clicked
const mobileSidebarModal = document.getElementById('mobileSidebarModal');
const mainHeaderImage = document.querySelector('.main-header img');

/**
 * Event handler to show the mobile sidebar modal.
 */
mainHeaderImage.addEventListener('click', () => {
    mobileSidebarModal.style.display = 'block';
});

// add logic for mobile sidebar functionality
const closeMobileSidebarButton = document.getElementById('closeMobileSidebar');
const mobileThemeToggle = document.getElementById('mobileThemeToggle');

// Close mobile sidebar modal
/**
 * Event handler to close the mobile sidebar modal.
 */
closeMobileSidebarButton.addEventListener('click', () => {
    mobileSidebarModal.style.display = 'none';
});

// Toggle light and dark mode
/**
 * Event handler to toggle light and dark mode.
 */
mobileThemeToggle.addEventListener('change', (event) => {
    if (event.target.checked) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
});

/**
 * Exports the sidebar toggle functionality.
 */
export {hideSidebarButton, unhideSidebarButton, sidebar};
