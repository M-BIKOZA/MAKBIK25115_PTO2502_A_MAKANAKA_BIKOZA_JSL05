/**
 * Initial set of tasks.
 * @type {Array<Object>}
 */
const initialTasks = [
  {
    id: 1,
    title: "Launch Epic Career 🚀",
    description: "Create a killer Resume",
    status: "todo",
  },
  {
    id: 2,
    title: "Master JavaScript 💛",
    description: "Get comfortable with the fundamentals",
    status: "doing",
  },
  {
    id: 3,
    title: "Keep on Going 🏆",
    description: "You're almost there",
    status: "doing",
  },
  {
    id: 4,
    title: "Learn Data Structures and Algorithms 📚",
    description:
      "Study fundamental data structures and algorithms to solve coding problems efficiently",
    status: "todo",
  },
  {
    id: 5,
    title: "Contribute to Open Source Projects 🌐",
    description:
      "Gain practical experience and collaborate with others in the software development community",
    status: "done",
  },
  {
    id: 6,
    title: "Build Portfolio Projects 🛠️",
    description:
      "Create a portfolio showcasing your skills and projects to potential employers",
    status: "done",
  },
];

/**
 * Array of tasks, loaded from local storage or initialized with default tasks.
 * @type {Array<Object>}
 */
let tasks = JSON.parse(localStorage.getItem("tasks")) || initialTasks;

/**
 * Renders tasks in the respective columns based on their status.
 */
function renderTasks() {
  const taskLists = {
    todo: document.querySelector('.cards[data-status="todo"] .task-list'),
    doing: document.querySelector('.cards[data-status="doing"] .task-list'),
    done: document.querySelector('.cards[data-status="done"] .task-list'),
  };

  // Clear existing tasks
  Object.values(taskLists).forEach((list) => (list.innerHTML = ""));

  // Count tasks in each category
  const taskCounts = {
    todo: 0,
    doing: 0,
    done: 0,
  };

  // Render tasks and count them
  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = "task-card";
    li.textContent = task.title;
    li.dataset.id = task.id; // Store task ID in the dataset
    li.addEventListener("click", () => openEditModal(task));
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

/**
 * Opens the edit modal for a specific task.
 * @param {Object} task - The task object to be edited.
 */
function openEditModal(task) {
  // Populate the modal fields with the task data
  document.getElementById("editTitle").value = task.title;
  document.getElementById("editDescription").value = task.description;
  document.getElementById("editStatus").value = task.status; // Set the current status
  document.getElementById("editTaskModal").style.display = "block";

  // Store the task ID in a global variable for later use
  window.currentEditingTaskId = task.id;

  // Set up the delete button to delete the task
  document.getElementById("deleteTask").onclick = () => deleteTask(task.id);
}

/**
 * Saves the edited task details.
 */
function saveEdit() {
  const taskId = window.currentEditingTaskId; // Use the stored task ID

  // Debugging: Check if the elements are accessible
  const title = document.getElementById("editTitle");
  const description = document.getElementById("editDescription");
  const status = document.getElementById("editStatus");

  console.log("Title Element:", title);
  console.log("Description Element:", description);
  console.log("Status Element:", status);

  // Check if any of the elements are null
  if (!title || !description || !status) {
    console.error("One or more elements are not found in the DOM.");
    return; // Exit the function if elements are not found
  }

  const updatedTask = {
    id: taskId,
    title: title.value,
    description: description.value,
    status: status.value, // Get the selected status
  };

  tasks = tasks.map((task) => (task.id === taskId ? updatedTask : task)); // Update the task
  localStorage.setItem("tasks", JSON.stringify(tasks)); // Update local storage
  document.getElementById("editTaskModal").style.display = "none"; // Close the modal
  renderTasks(); // Re-render the tasks
}

/**
 * Deletes a task by its ID.
 * @param {number} taskId - The ID of the task to be deleted.
 */
function deleteTask(taskId) {
  tasks = tasks.filter((task) => task.id !== taskId); // Remove the task from the array
  localStorage.setItem("tasks", JSON.stringify(tasks)); // Update local storage
  document.getElementById("editTaskModal").style.display = "none"; // Close the modal
  renderTasks(); // Re-render the tasks
}

/**
 * Opens the modal to add a new task.
 */
function openAddTaskModal() {
  document.getElementById("newTitle").value = "";
  document.getElementById("newDescription").value = "";
  document.getElementById("newStatus").value = "todo";
  document.getElementById("addTaskModal").style.display = "block";
}

/**
 * Saves a new task to the task list.
 */
document.getElementById("saveNewTask").onclick = function () {
  const newTask = {
    id: tasks.length ? Math.max(tasks.map((t) => t.id)) + 1 : 1,
    title: document.getElementById("newTitle").value,
    description: document.getElementById("newDescription").value,
    status: document.getElementById("newStatus").value,
  };

  tasks.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  document.getElementById("addTaskModal").style.display = "none";
  renderTasks();
};

// Close modals
document.getElementById("closeEditModal").onclick = function () {
  document.getElementById("editTaskModal").style.display = "none";
};

document.getElementById("closeAddModal").onclick = function () {
  document.getElementById("addTaskModal").style.display = "none";
};

// Add event listener for saving changes in the edit modal
document.getElementById("saveEdit").onclick = saveEdit;

// Initial render
renderTasks();

// Add event listener to the button to open the add task modal
document
  .getElementById("addTaskButton")
  .addEventListener("click", openAddTaskModal);

// Add event listener to the mobile button to open the add task modal
document
  .getElementById("mobileAddTaskButton")
  .addEventListener("click", openAddTaskModal);