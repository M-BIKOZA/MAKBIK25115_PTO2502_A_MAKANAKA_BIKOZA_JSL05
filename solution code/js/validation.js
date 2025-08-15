// validation.js

/**
 * Validates the task form inputs.
 * @param {string} title - The title of the task.
 * @param {string} description - The description of the task.
 * @param {Object} An object containing validation errors.
 */
export function validateTaskForm(title, description) {
  const errors = {};

  if (!title || title.trim() === "") {
    errors.title = "Title is required.";
  } else if (title.length < 50) {
    errors.title = "Title must be at least 50 characters long.";
  }

  if (!description || description.trim() === "") {
    errors.description = "Description is required.";
  } else if (description.length < 200) {
    errors.description = "Description must be at least 200 characters long.";
  }

  return errors;
}