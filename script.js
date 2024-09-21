let currentEditIndex = null;

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
            }, 300);
        };

        // Append icons to the list item
        li.appendChild(editIcon);
        li.appendChild(removeIcon);
        taskList.appendChild(li);
    }

    // Clear input
    taskInput.value = '';
}
