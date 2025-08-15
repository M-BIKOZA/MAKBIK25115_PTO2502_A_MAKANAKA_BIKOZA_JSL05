// tasks.js

import { openEditModal } from "./modal.js";
import { sortTasksByPriority } from "./priority.js"; // Import the sort function
import { fetchTasksFromAPI } from "./api.js"; // Import the API function

// Private tasks array
let tasks = [];

/**
 * Loads tasks from local storage.
 * Parses the stored JSON string into an array.
 */
function loadTasksFromLocalStorage() {
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    tasks = JSON.parse(storedTasks); // Parse the stored JSON string into an array
  } else {
    tasks = []; // Initialize as an empty array if no tasks are stored
  }
}

/**
 * Fetches tasks from the API and updates the tasks array.
 * Combines API tasks with local tasks, avoiding duplicates.
 */
async function loadTasks() {
  const apiTasks = await fetchTasksFromAPI(); // Fetch tasks from the API

  // Combine API tasks with local tasks, avoiding duplicates
  apiTasks.forEach((apiTask) => {
    if (!tasks.some((task) => task.id === apiTask.id)) {
      tasks.push(apiTask); // Only add if the task is not already in the local tasks
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks)); // Store in local storage
  renderTasks(); // Render tasks after fetching
}

// Return a copy of tasks array
/**
 * Returns a copy of the tasks array.
 * @returns {Array} A copy of the tasks array.
 */
export function getTasks() {
  return tasks.slice();
}

// Add new task
/**
 * Adds a new task to the tasks array.
 * Updates local storage.
 * @param {Object} newTask - The new task to add.
 */
export function addTask(newTask) {
  tasks.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(tasks)); // Update local storage
}

// Update existing task
/**
 * Updates an existing task in the tasks array.
 * Updates local storage.
 * @param {Object} updatedTask - The task to update.
 */
export function updateTask(updatedTask) {
  const taskIndex = tasks.findIndex((task) => task.id === updatedTask.id);
  if (taskIndex !== -1) {
    tasks[taskIndex] = updatedTask;
    localStorage.setItem("tasks", JSON.stringify(tasks)); // Update local storage
  }
}

// Delete a task by id
export function deleteTask(taskId) {
  tasks = tasks.filter((task) => task.id !== taskId);
  localStorage.setItem("tasks", JSON.stringify(tasks)); // Update local storage
}

// Renders tasks in the respective columns based on their status
export function renderTasks() {
  const taskLists = {
    todo: document.querySelector('.cards[data-status="todo"] .task-list'),
    doing: document.querySelector('.cards[data-status="doing"] .task-list'),
    done: document.querySelector('.cards[data-status="done"] .task-list'),
  };

  // Clear existing tasks
  Object.values(taskLists).forEach((list) => (list.innerHTML = ""));

  // Sort tasks by priority using the new module
  const sortedTasks = sortTasksByPriority(tasks);

  // Count tasks in each category
  const taskCounts = {
    todo: 0,
    doing: 0,
    done: 0,
  };

  // Render tasks and count them
  sortedTasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = "task-card";

    // Add task title
    const taskTitle = document.createElement("span");
    taskTitle.textContent = task.title;
    li.appendChild(taskTitle);

    // Add priority circle to the right
    const priorityCircle = document.createElement("span");
    priorityCircle.className = `priority-circle ${task.priority}`;
    priorityCircle.style.marginLeft = "auto"; // Push to the right
    li.appendChild(priorityCircle);

    li.dataset.id = task.id; // Store task ID in the dataset
    li.addEventListener("click", () => openEditModal(task)); // Ensure this line is correct
    taskLists[task.status].appendChild(li);

    // Increment the count for the corresponding status
    taskCounts[task.status]++;
  });

  // Update the task count in the headings
  document.querySelector(
    '.cards[data-status="todo"] h4'
  ).textContent = `TODO (${taskCounts.todo})`;
  document.querySelector(
    '.cards[data-status="doing"] h4'
  ).textContent = `DOING (${taskCounts.doing})`;
  document.querySelector(
    '.cards[data-status="done"] h4'
  ).textContent = `DONE (${taskCounts.done})`;
}

// Call loadTasksFromLocalStorage when the module is loaded
loadTasksFromLocalStorage();
// Call loadTasks to fetch tasks from the API
loadTasks();