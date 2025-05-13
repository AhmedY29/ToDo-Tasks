// Buttons

let addBtn = document.getElementById("add-todo");
let deleteBtn = document.getElementById("delete-btn");
let checkBtn = document.getElementById("check-todo");
let cancelBtn = document.getElementById("cancel-btn");
let closeDialog = document.getElementById("close-dialog");
let addDialogBtn = document.getElementById("add-btn");
let editBtn = document.getElementById("edit-btn");
let deleteTasks = document.getElementById("delete-tasks");
let cancelTasksBtnDialog = document.getElementById("cancel-tasks-btn");
let deleteTasksBtnDialog = document.getElementById("delete-tasks-btn");

// Elements
let todosContent = document.getElementById("todos-content");
let todosItem = document.getElementById("todo-item");
let addDialog = document.getElementById("add-todo-dialog");
let deleteDialog = document.getElementById("delete-todo-dialog");
let deleteTasksDialog = document.getElementById("delete-tasks-dialog");
let deleteMsg = document.getElementById("delete-msg");
let errorAddMsg = document.getElementById("error-add-msg");
let errorEditMsg = document.getElementById("error-edit-msg");
let tasksCount = document.getElementById("tasks-count");

let editDialog = document.getElementById("edit-todo-dialog");
let closeEditDialog = document.getElementById("close-edit-dialog");
// Inputs
let inputAdd = document.getElementById("todo-title");
let inputEdit = document.getElementById("edit-todo-title");

let todos = [
  {
    id: 1,
    title: "Do Home Work 1",
    check: false,
  },
  {
    id: 2,
    title: "Do Home Work 1",
    check: false,
  },
  {
    id: 3,
    title: "Do Home Work 1",
    check: false,
  },
  {
    id: 4,
    title: "Do Home Work 1",
    check: false,
  },
];

// Local Storage
function storeTodos() {
  let todosString = JSON.stringify(todos);
  localStorage.setItem("todos", todosString);
}

function getStoreTodos() {
  let todosObj = JSON.parse(localStorage.getItem("todos"));
  todos = todosObj ?? [];
}

getStoreTodos();

function getTodos() {
  todosContent.innerHTML = "";
  deleteTasks.style.display = todos.length <= 0 ? "none" : "flex";

  tasksCount.innerText = `Total Tasks: ${todos.length} | Uncompleted tasks: ${
    todos.filter((e) => e.check == false).length
  }`;
  todos.forEach((item, index) => {
    todosContent.innerHTML += `
              <div id="todo-item" class="todo-item ${
                item.check ? "todo-item-done" : ""
              }">
              <div class="btns">
                  <button id="check-todo" onclick="handleCheckTodo(${index})" class="btn btn-check ${
      item.check ? "btn-check-true" : ""
    }">
                    <span class="material-symbols-outlined"> check </span>
                  </button>
                  <button id="check-todo" onclick="handelEditTodo(${index})" class="btn btn-edit">
                   <span class="material-symbols-outlined">
edit
</span>
                  </button>
                  </div>

                  <h4>${item.title}</h4>
                  <button id="delete-todo" onclick="handleOpenDelete(${index})" class="btn btn-delete">
                    <span class="material-symbols-outlined">
                      delete
                    </span>
                  </button>
                </div>
          `;
  });
}

getTodos();

deleteTasks.addEventListener("click", () => {
  deleteTasksDialog.open = true;
});

cancelTasksBtnDialog.addEventListener("click", () => {
  deleteTasksDialog.open = false;
});

deleteTasksBtnDialog.addEventListener("click", () => {
  todos = [];
  storeTodos();
  getTodos();
  deleteTasksDialog.open = false;
});

addBtn.addEventListener("click", () => {
  console.log("i'm listen");
  addDialog.open = true;
});

closeDialog.addEventListener("click", () => {
  addDialog.open = false;
  errorAddMsg.innerText = "";
  editDialog.open = false;
});

closeEditDialog.addEventListener("click", () => {
  addDialog.open = false;
  errorEditMsg.innerText = "";
  editDialog.open = false;
});

let indexDialog;

function handleOpenDelete(index) {
  deleteDialog.open = true;
  indexDialog = index;
  deleteMsg.innerText = `Do You Want to Delete "${todos[index].title}" From To Do List are you Sure?`;
}
function handelEditTodo(index) {
  editDialog.open = true;
  indexDialog = index;
  inputEdit.value = todos[index].title;
}

deleteBtn.addEventListener("click", () => {
  todos.splice(indexDialog, 1);
  deleteDialog.open = false;
  storeTodos();
  getTodos();
});

editBtn.addEventListener("click", () => {
  if (inputEdit.value.trim() == "") {
    errorEditMsg.innerText = "Enter Task Title";
    return;
  }
  todos[indexDialog].title = inputEdit.value;
  editDialog.open = false;
  storeTodos();
  getTodos();
});
cancelBtn.addEventListener("click", () => {
  deleteDialog.open = false;
});

function handleDeleteItem(index) {
  deleteDialog.open = false;
}

const handleCheckTodo = (index) => {
  console.log(index);
  todos[index].check = !todos[index].check;
  storeTodos();
  getTodos();
  console.log(todos);
};

addDialogBtn.addEventListener("click", () => {
  if (inputAdd.value.trim() == "") {
    errorAddMsg.innerText = "ُEnter Task Title";
    return;
  }
  let id = todos.length;

  let newTask = {
    id,
    title: inputAdd.value.trim(),
    check: false,
  };
  todos.push(newTask);
  storeTodos();
  getTodos();
  inputAdd.value = "";
  errorEditMsg.innerText = "";

  addDialog.open = false;
});
