let form = document.querySelector(".form");
let input = document.querySelector(".Taskinput");
let addTask = document.querySelector(".add");
let tasks = document.querySelector(".tasks");
//Tasks Array
let tasksArray = [];
// window.localStorage.clear();
getFromLS();

if (window.localStorage.getItem("task")) {
  tasksArray = JSON.parse(window.localStorage.getItem("task"));
}

addTask.onclick = function () {
  if (input.value !== "") {
    addTaskToArray(input.value);
    addToLS(tasksArray);
    input.value = "";
  } else {
    alert("Please Enter A Valid Task");
  }
};

function addTaskToArray(taskText) {
  const task = {
    id: Date.now(),
    content: taskText,
    completed: false,
  };
  tasksArray.push(task);
  addToPage(tasksArray);
}

function addToPage(tasksArray) {
  tasks.innerHTML = "";

  tasksArray.forEach((task) => {
    let div = document.createElement("div");
    div.className = "task";
    div.setAttribute("id", task.id);
    div.appendChild(document.createTextNode(task.content));
    let span = document.createElement("span");
    span.className = "delete";
    span.appendChild(document.createTextNode("Delete"));
    div.appendChild(span);
    tasks.append(div);
  });
}

function addToLS(tasksArray) {
  window.localStorage.setItem("task", JSON.stringify(tasksArray));
}

function getFromLS() {
  let data = window.localStorage.getItem("task");
  if (data) {
    let tasks = JSON.parse(data);
    addToPage(tasks);
  }
}

tasks.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
    removeFromLS(e.target.parentElement.getAttribute("id"));
  }
});

function removeFromLS(taskID) {
  // for (let i = 0; i < tasksArray.length; i++) {
  //   console.log(`${tasksArray[i].id} === ${taskID}`);
  // }
  tasksArray = tasksArray.filter((task) => task.id != taskID);
  addToLS(tasksArray);
}
