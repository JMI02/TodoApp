let nextTaskId = 1;

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskList = document.getElementById("taskList");
  const taskText = taskInput.value.trim();

  if (taskText !== "") {
    const li = document.createElement("li");
    li.textContent = taskText;
    const taskId = nextTaskId++;
    li.setAttribute("data-task-id", taskId);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Удалить";
    deleteButton.className = "delete-button";

    li.appendChild(deleteButton);
    taskList.appendChild(li);

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ id: taskId, text: taskText, completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));

    taskInput.value = "";
    taskInput.focus();
    addToggleTaskEvent(li);
    addDeleteTaskEvent(deleteButton);
  }
}

function deleteTask(taskId) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const updatedTasks = tasks.filter((task) => task.id !== taskId);
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}

function addToggleTaskEvent(li) {
  li.addEventListener("click", function () {
    li.classList.toggle("completed");
    const taskId = parseInt(li.getAttribute("data-task-id"));
    updateTaskStatus(taskId, li.classList.contains("completed"));
  });
}

function addDeleteTaskEvent(deleteButton) {
  deleteButton.addEventListener("click", function () {
    const li = deleteButton.parentElement;
    const taskId = parseInt(li.getAttribute("data-task-id"));
    deleteTask(taskId);
    li.remove();
  });
}

function addTaskOnEnter(event) {
  if (event.key === "Enter") {
    addTask();
  }
}

function updateTaskStatus(taskId, completed) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const task = tasks.find((t) => t.id === taskId);
  if (task) {
    task.completed = completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}

function loadTasks() {
  const taskList = document.getElementById("taskList");
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.textContent = task.text;
    if (task.completed) {
      li.classList.add("completed");
    }
    li.setAttribute("data-task-id", task.id);
    taskList.appendChild(li);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Удалить";
    deleteButton.className = "delete-button";
    li.appendChild(deleteButton);

    addToggleTaskEvent(li);
    addDeleteTaskEvent(deleteButton, task.id);
  });

  const maxId = Math.max(...tasks.map((task) => task.id));
  if (tasks.length !== 0) nextTaskId = maxId + 1;
  document.getElementById("taskInput").focus();
}

loadTasks();
