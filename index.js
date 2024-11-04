// Select DOM elements
const submitButton = document.getElementById("submitButton");
const searchButton = document.getElementById("searchButton");
const taskList = document.getElementById("taskList");
const itemOnDisplay = document.getElementById("itemOnDisplay");
const descriptionDisplay = document.getElementById("description");

// Create an array to store tasks
let tasks = [];

// Event listener for adding a task
submitButton.addEventListener("click", () => {
    const titleInput = document.querySelector(".submit .inputField").value.trim();
    const descriptionInput = document.querySelector(".descriptionField").value.trim();

    // Check if both title and description are provided
    if (titleInput && descriptionInput) {
        addTask(titleInput, descriptionInput);

        // Clear input fields after adding the task
        document.querySelector(".submit .inputField").value = "";
        document.querySelector(".descriptionField").value = "";
    } else {
        alert("Please enter both a title and a description for the task.");
    }
});

// Function to add a task
function addTask(title, description) {
    // Create a task object and store it in the tasks array
    const task = { title, description, completed: false };
    tasks.push(task);

    // Create a list item for the new task
    const taskItem = createTaskItem(task);

    // Append the task to the task list
    taskList.appendChild(taskItem);
}

// Function to create a task list item
function createTaskItem(task) {
    const taskItem = document.createElement("li");
    taskItem.innerHTML = `<strong>${task.title}:</strong> ${task.description}`;

    // Add click event to toggle completion and display details
    taskItem.addEventListener("click", () => {
        toggleTaskCompletion(task); // Toggle completed state
        renderTasks(); // Re-render the task list to reflect changes
    });

    // Apply completed class if task is marked completed            we are checking if the task is completed even though we are creating the task because once the user reloads the page we will save all current tasks (including their comppletion status) and create them again on the newly reloaded page 
    if (task.completed) {
        taskItem.classList.add("completed");
    }

    return taskItem;                                                                              
}

// Function to toggle task completion
function toggleTaskCompletion(task) {
    task.completed = !task.completed; // Toggle completed state
}

// Function to display task details
function displayTaskDetails(task) {
    itemOnDisplay.textContent = task.title; // Set title in the display area
    descriptionDisplay.textContent = task.description; // Set description in the display area
}

// Event listener for searching tasks
searchButton.addEventListener("click", () => {
    const searchTerm = document.querySelector(".search .inputField").value.toLowerCase();
    renderTasks(searchTerm); // Render tasks based on search term
});

// Function to render tasks based on search term
function renderTasks(searchTerm = "") {
    // Clear the task list
    taskList.innerHTML = "";

    // Loop through tasks and append them based on search term
    tasks.forEach(task => {
        

        // Check if the task matches the search term
        const taskText = `${task.title}: ${task.description}`.toLowerCase();
        if (taskText.includes(searchTerm)) {
            const taskItem = createTaskItem(task);
            taskList.appendChild(taskItem);
        }
    });

    
}
