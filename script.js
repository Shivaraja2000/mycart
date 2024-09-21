let currentEditIndex = null;

// Load tasks from Local Storage when the page loads
document.addEventListener('DOMContentLoaded', loadTasks);

document.getElementById('addTaskBtn').addEventListener('click', addTask);

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    const taskList = document.getElementById('taskList');

    if (currentEditIndex !== null) {
        // Update existing task
        const listItem = taskList.children[currentEditIndex];
        listItem.firstChild.textContent = taskText;
        updateLocalStorage();
        currentEditIndex = null;
        taskInput.value = '';
        document.getElementById('addTaskBtn').textContent = 'Add Task';
    } else {
        // Create new task
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create edit icon
        const editIcon = document.createElement('i');
        editIcon.className = 'fas fa-edit edit-icon';
        editIcon.onclick = function() {
            currentEditIndex = Array.from(taskList.children).indexOf(li);
            taskInput.value = taskText;
            document.getElementById('addTaskBtn').textContent = 'Update Task';
        };

        // Create remove icon
        const removeIcon = document.createElement('i');
        removeIcon.className = 'fas fa-trash remove-icon';
        removeIcon.onclick = function() {
            li.classList.add('fade-out');
            setTimeout(() => {
                taskList.removeChild(li);
                updateLocalStorage(); // Update local storage after removal
            }, 300);
        };

        // Append icons to the list item
        li.appendChild(editIcon);
        li.appendChild(removeIcon);
        taskList.appendChild(li);
    }

    // Clear input
    taskInput.value = '';
    updateLocalStorage(); // Update local storage after adding
}

function updateLocalStorage() {
    const taskList = document.getElementById('taskList');
    const tasks = [];

    for (let i = 0; i < taskList.children.length; i++) {
        tasks.push(taskList.children[i].firstChild.textContent);
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('taskList');

    tasks.forEach(taskText => {
        const li = document.createElement('li');
        li.textContent = taskText;

        const editIcon = document.createElement('i');
        editIcon.className = 'fas fa-edit edit-icon';
        editIcon.onclick = function() {
            currentEditIndex = Array.from(taskList.children).indexOf(li);
            document.getElementById('taskInput').value = taskText;
            document.getElementById('addTaskBtn').textContent = 'Update Task';
        };

        const removeIcon = document.createElement('i');
        removeIcon.className = 'fas fa-trash remove-icon';
        removeIcon.onclick = function() {
            li.classList.add('fade-out');
            setTimeout(() => {
                taskList.removeChild(li);
                updateLocalStorage();
            }, 300);
        };

        li.appendChild(editIcon);
        li.appendChild(removeIcon);
        taskList.appendChild(li);
    });
}
