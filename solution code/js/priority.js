// priority.js

// Define the priority order
const priorityOrder = {high: 1, medium:2, low:3}

// Function to get the priority value from a dropdown
/**
 * Gets the priority value from a dropdown.
 * @param {string} dropdownId - The ID of the dropdown element.
 * @returns {string} The selected priority value.
 */
export function getPriorityValue(dropdownId) {
    return document.getElementById(dropdownId).value;
}

// Function to sort tasks based on priority
/**
 * Sorts tasks based on priority.
 * @param {Array} tasks - The array of tasks to sort.
 * @returns {Array} The sorted array of tasks.
 */
export function sortTasksByPriority(tasks) {
    return tasks.sort((a, b) => {
        if (a.status === b.status) {
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        }
        return a.status.localeCompare(b.status);
    });
}

