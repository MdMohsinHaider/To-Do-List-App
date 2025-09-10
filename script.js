// DOM Elements
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

// Load tasks from localStorage or initialize empty array
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Render tasks on UI
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');

        // Task text span
        const span = document.createElement('span');
        span.textContent = task;
        span.className = 'task-text';

        // Edit on clicking text
        span.addEventListener('click', () => {
            const newTask = prompt('Edit task:', task);
            if (newTask !== null && newTask.trim() !== '') {
                tasks[index] = newTask.trim();
                saveTasks();
                renderTasks();
            }
        });

        li.appendChild(span);

        // Edit button
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.className = 'edit-btn';
        editBtn.addEventListener('click', () => {
            const newTask = prompt('Edit task:', task);
            if (newTask !== null && newTask.trim() !== '') {
                tasks[index] = newTask.trim();
                saveTasks();
                renderTasks();
            }
        });
        li.appendChild(editBtn);

        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';
        deleteBtn.addEventListener('click', () => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });
}

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Add new task event
taskForm.addEventListener('submit', e => {
    e.preventDefault();
    const newTask = taskInput.value.trim();
    if (newTask) {
        tasks.push(newTask);
        saveTasks();
        renderTasks();
        taskInput.value = '';
    }
});

// Initial render
renderTasks();
