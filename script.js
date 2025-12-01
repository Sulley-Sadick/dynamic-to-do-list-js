// Adding the DOMContentLoaded event to document object
document.addEventListener("DOMContentLoaded", function () {
  // selecting elements
  const addButton = document.getElementById("add-task-btn");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

  //   loadTasks function to get task from localStorage when page loads
  const loadTasks = function (task) {
    // create li element
    const li = document.createElement("li");

    // set the data attributes of li = task
    li.dataset.task = task;

    // create a span element
    const span = document.createElement("span");

    // set the textContent of span = task
    span.textContent = task;

    // create removeButtton
    const removeButton = document.createElement("button");

    // set it textContent to remove
    removeButton.textContent = "Remove";

    // add the class of remove-btn
    removeButton.classList.add("remove-btn");

    // append both span and removeButton to li element
    li.append(span, removeButton);

    // append li to taskList
    taskList.appendChild(li);
  };

  //   loop over tasks and call loadTasks at each iteration
  tasks.forEach(loadTasks);

  //   addTask function
  function addTask() {
    // take value from taskInput.value and store it in taskText variable
    const taskText = taskInput.value.trim();

    // taskText === ""
    if (taskText === "") return alert("Kindly add a task for today.");

    // taskText holds value
    if (taskText) {
      //  create an li element
      const li = document.createElement("li");

      //   set it's textContent = taskText
      li.textContent = taskText;

      //   push taskText to tasks
      tasks.push(taskText);

      // store tasks in the localStorage and give it key of tasks
      localStorage.setItem("tasks", JSON.stringify(tasks));

      //   call loadTask function and pass in taskText as an argument
      loadTasks(taskText);

      //   clear input values
      taskInput.value = "";
    }
  }

  //   Add click event to taskList
  taskList.addEventListener("click", function (e) {
    // e.target.classList does not contain remove-btn
    if (!e.target.classList.contains("remove-btn")) return;

    // e.target.classList.contains remove-btn store it in li variable
    const li = e.target.closest("li");

    // store element that has the task as a value to dataset attributes
    const task = li?.dataset.task;

    // li element does not have the dataset attributes of task, return
    if (!task) return;

    // take element that is not the same as task and assign it tasks variable
    tasks = tasks.filter((t) => t !== task);

    //  store task in localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // remove li element
    li.remove();
  });

  // add click event to addButton  and pass in addTask function as a callback function
  addButton.addEventListener("click", addTask);

  //   listen for keypress event on the window object
  taskInput.addEventListener("keypress", function (event) {
    // event.key === enter
    // event.key === "Enter" ? addTask() : ""; // alternative approach using ternary operator

    // event.key === enter
    if (event.key === "Enter")
      // call addTask function
      addTask();
  });
});
