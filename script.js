// Adding the DOMContentLoaded event to document object
document.addEventListener("DOMContentLoaded", function () {
  // selecting elements
  const addButton = document.getElementById("add-task-btn");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  //   loadTask function to get task from localStorage when page reloads
  const loadTask = function () {
    // if tasks exist in the localStorage, store it in the storedTasks variable
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");

    // loop over storedTasks and call addTask function and pass in taskText at each iteration and set save = false
    storedTasks.forEach((taskText) => addTask(taskText, false));
  };

  //   call loadTask function
  loadTask();

  //   addTask function
  const addTask = function (taskText, save = true) {
    // if save = true
    if (save) {
      // get tasks and convert it to object by using the JSON.parse method else set it up to empty object
      const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");

      // push taskText to storedTask array
      storedTasks.push(taskText);

      // store the storedTasks in the localStorage
      localStorage.setItem("tasks", JSON.stringify(storedTasks));
    }

    // get input value and remove whitespaces using the trim method
    const taskText = taskInput.value.trim();

    // taskText === ""
    if (taskText === "") alert("Kindly add a task for today.");

    // taskText holds value
    if (taskText) {
      // 1. create an li element
      const li = document.createElement("li");

      //   2.  set it's textContent = taskText
      li.textContent = taskText;

      //   create new button
      const removeButton = document.createElement("button");

      //   set textContent = Remove
      removeButton.textContent = "Remove";

      //   set className = remove-btn
      removeButton.classList.add("remove-btn");

      //   add onclick event to the removeButton
      removeButton.addEventListener("click", function () {
        // remove li element from taskList
        taskList.removeChild(li);
      });

      //   append removeButton  = li
      li.appendChild(removeButton);

      //   append li  = taskList
      taskList.appendChild(li);

      //   clear input values
      taskInput.value = "";
    }
  };

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
