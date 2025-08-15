// modal.js

import{
    renderTasks,
    updateTask,
    addTask,
    deleteTask as deleteTaskFromTasks,
    getTasks,
} from './task.js';
import {getPriorityValue} from "./priority.js";// Import the function
import {validateTaskForm} from "./validation.js";

let taskToDelete = null;

/**
 * Opens the edit modal for a specific task.
 * Populates the modal fields with the task details.
 * @param {Object} task - The task object containing the details to edit.
 */
function openEditModal(task) {
    // Populate the modal fields with the task details
    document.getElementById('editTitle').value = task.title;
    document.getElementById('editDescription').value = task.description;
    document.getElementById('editStatus').value = task.status; // Set current status
    document.getElementById('editPriority').value = task.priority; // Set the current priority
    document.getElementById('editTaskModal').style.display = 'block';

    // Show the task ID in a global variable for later use
    window.currentEditingTaskId = task.id;

    // Set up the delete button to delete the task
    document.getElementById('deleteTaskButton').onclick = function() {
        deleteTask(window.currentEditingTaskId);
    }

    // Shows a notification message
    function showNotification(message) {
        const notificationModal = document.getElementById('notificationModal');
        const notificationMessage = document.getElementById('notificationMessage');

        notificationMessage.textContent = message;
        notificationModal.style.display = 'block';

        setTimeout(() => {
            notification.style.display = 'none';
        }, 2000); // Hide after 2seconds
    }

    /**
     * Saves a new task to the task list.
     * Validates the task form inputs.
     */
    function saveNewTask() {
        const title = document.getElementById('newTitle').value;
        const description = document.getElementById('newDescription').value;

        const errors = validateTaskForm(title, description);

        if (Object.keys(errors).length > 0) {
           document.getElementById("newTitleError").textContent = errors.title || '';
           document.getElementById("newDescriptionError").textContent = 
           errors.description || '';
           return
                }

                const newTaskId = getTasks().length
                ? Math.max(...getTasks().map(task => task.id)) + 1
                : 1;
                const newTask = {
                    id: newTaskId,
                    title,
                    description,
                    status: document.getElementById("newStatus").value,
                    priority: getPriorityValue("addPriority"), // Get the selected priority
                };

                //Use the addTask function from tasks.js
                addTask(newTask);
                document.getElementById("addTaskModal").style.display = "none";
                renderTasks();
                showNotification("Task added successfully!");
            }
            
            /**
             * Saves the edited task details.
             */
            function saveEdit() {
                const title = document.getElementById('editTitle').value;
                const description = document.getElementById('editDescription').value;

                const errors = validateTaskForm(title, description);

                if (Object.keys(errors).length > 0) {
                    document.getElementById("editTitleError").textContent = errors.title || '';
                    document.getElementById("editDescriptionError").textContent = 
                    errors.description || '';
                    return;
                }

                const taskID = window.currentEditingTaskId; // Use the stored task ID

                const updateTask = {
                    id: taskID,
                    title,
                    description,
                    status: document.getElementById("editStatus").value, //Get selected status
                    priority: getPriorityValue("editPriority"), //Get selected priority
                };

                // Update the task using the new function
                updateTaskInList(updateTask);
                document.getElementById("editTaskModal").style.display = "none"; // Close the modal
                renderTasks(); //Re-render the tasks
                }

                // Delete a task by its ID
                function deleteTask(taskID){
                    // USe the deleteTask function from tasks.js
                    deleteTaskFromTasks(taskID);
                    document.getElementById("deleteTaskModal").style.display = "none"; // Close the modal
                    renderTasks(); // Re-render the tasks to reflect the deletion
                    showNotification("Task Removed Successfully!");
                }

                function showConfirmationModal() {
                    taskToDelete = taskID;
                    const confirmationModal = document.getElementById("confirmationModal");
                    confirmationModal.style.display = "block";
                }

                function hideConfirmationModal() {
                    const confirmationModal = document.getElementById("confirmationModal");
                    confirmationModal.style.display = "none";
                    taskToDelete = null;
                }

                function confirmDelete() {
                    if (taskToDelete !== null) {
                        deleteTask(taskToDelete);
                        renderTasks();
                        showNotification("Task Removed Successfully!");
                    }
                    document.getElementById("editTaskModal").style.display = "none"; // Close the edit modal
                    hideConfirmationModal();
                }
            
            function setUpConfirmationalModal() {
                document.getElementById(confirmDelete).onclick = confirmDelete
                document.getElementById("cancelDelete").onclick = hideConfirmationModal;
            }

            // Call setupConfirmationModal when the page loads
            setUpConfirmationalModal();

            // Opens the modal to add new task
            function openAddTaskModal() {
                document.getElementById("newTitle").value = "";
                document.getElementById("newDescription").value = "";
                document.getElementById("newStatus").value = "todo";
                document.getElementById("addPriority").value = "medium"; // Default priority
                document.getElementById("addTaskModal").style.display = "block"; 
            }

            // Close modals 
            function closeEditModal() {
                document.getElementById("editTaskModal").style.display = "none";
            }

            function closeAddModal() {
                document.getElementById("addTaskModal").style.display = "none";
            }

            // Event listeners for saving tasks
            document.getElementById("saveEdit").onclick = saveEdit;
            document.getElementById("saveNew").onclick = saveNewTask;

            // Event listeners for closing modals
            document.getElementById("closeEditModal").onclick = closeEditModal;
            document.getElementById("closeAddModal").onclick = closeAddModal;

            // Event listener to open the add task modal
            document
            .getElementById("addTaskButton")
            .addEventListener("click", openAddTaskModal);
            document
            .getElementById("mobileAddTaskButton")
            .addEventListener("click", openAddTaskModal);

                }
        
        // Export functions at the top level of the module
        export {
            openEditModal,
            saveEdit,
            deleteTask, // Keep this for the delete button in the edit modal
            openAddTaskModal,
            saveNewTask,
            closeEditModal,
            closeAddModal,
        };
