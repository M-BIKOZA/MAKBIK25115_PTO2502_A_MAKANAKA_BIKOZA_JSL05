import { initializeTheme } from "./js/theme.js";
import {
    hideSidebarButton,
    unhideSidebarButton,
    sidebar,
} from "./js/sidebar.js";
import {
    saveEdit,
    saveNewTask,
    openAddTaskModal,
    closeEditTaskModal,
    closeAddModal,
} from "./js/modal.js";
import { renderTasks } from "./js/tasks.js";

/**
 * Initialize the theme based on user preferences.
 */
initializeTheme();

/**
 * Event handler for saving edits.
 * Calls the saveEdit function directly.
 */
document.getElementById("saveEdit").onclick = function() {
    saveEdit();
};

/**
 * Event handler for saving new tasks.
 * calls the saveNewTask function directly.
 */
document.getElementById("saveNewTask").onclick = function() {
    saveNewTask();
};

/**
 * Event handler to close the edit modal.
 */
document.getElementById("closeEditModal").onclick = closeEditModal;

/** 
 * Event handler to close the add task modal.
 */
document.getElementById("closeAddModal").onclick = closeAddModal;

/**
 * Event handler to open the add task modal.
 */
document
.getElementById("addTaskButton")
.addEventListener("click", openAddTaskModal);
document
.getElementById("mobileAddTaskButton")
.addEventListener("click", openAddTaskModal);

/**
 * Renders the tasks on the page.
 */
renderTasks();
