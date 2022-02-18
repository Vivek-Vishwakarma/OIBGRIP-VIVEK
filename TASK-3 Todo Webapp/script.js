document.addEventListener("DOMContentLoaded", getTodos);
const form = document.querySelector(".inputDiv");
const results = document.querySelector(".results");
const input = document.querySelector(".input");
const filterOption = document.querySelector(".filter-todo");

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
let todos = JSON.parse(localStorage.getItem("todos"))
console.log(todos)

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const dateCurrent = new Date();
  if(!input.value){
    alert("Please enter some todo")
    return
  }
  const taskDiv = document.createElement("div");
  taskDiv.classList.add("taskDiv");

  const inputScreen = document.createElement("div");
  inputScreen.classList.add("inputScreen");

  taskDiv.appendChild(inputScreen);

  const screen = document.createElement("input");
  screen.classList.add("screen");
  screen.type = "text";
  screen.value = capitalizeFirstLetter(input.value);
  screen.setAttribute("readonly", "readonly");
  inputScreen.appendChild(screen);

  const date = document.createElement("p");
  date.classList.add("date");
  date.innerHTML = dateCurrent.toLocaleString();
  inputScreen.appendChild(date);

  const buttons = document.createElement("div");
  buttons.classList.add("buttons");
  taskDiv.appendChild(buttons);

  const done = document.createElement("button");
  done.classList.add("done");
  done.innerHTML = "Done";

  const edit = document.createElement("button");
  edit.classList.add("edit");
  edit.innerHTML = "Edit";

  const del = document.createElement("button");
  del.classList.add("delete");
  del.innerHTML = "Delete";

  buttons.appendChild(done);
  buttons.appendChild(edit);
  buttons.appendChild(del);

  results.appendChild(taskDiv);
  saveLocalTodos(screen.value, dateCurrent.toLocaleString());

  edit.addEventListener("click", (e) => {
    if (edit.innerText == "Edit") {
      edit.innerText = "Save";
      screen.removeAttribute("readonly");
      screen.focus();
    } else {
      edit.innerText = "Edit";
      screen.setAttribute("readonly", "readonly");
    }
  });
  del.addEventListener("click", (e) => {
    const todo = e.target.parentElement
    console.log(todo)
    removeLocalTodos(todo);
    results.removeChild(taskDiv);
  });
  done.addEventListener("click", () => {
    if (done.innerText == "Done") {
      done.innerText = "Undone";
      done.style.backgroundColor = "red";
      taskDiv.classList.add("checked");
    } else {
      done.innerText = "Done";
      done.style.backgroundColor = "green";
      taskDiv.classList.remove("checked");
    }
  });
  input.value = ""
});

function saveLocalTodos(todo, time) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push({
    value: todo,
    time: time,
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

filterOption.addEventListener("click", filterTodo);
function filterTodo(e) {
  const todos = document.querySelectorAll(".taskDiv");
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "block";
        break;
      case "completed":
        if (todo.classList.contains("checked")) {
          todo.style.display = "block";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("checked")) {
          todo.style.display = "block";
        } else {
          todo.style.display = "none";
        }
    }
  });
}

function removeLocalTodos(event) {
  let todos = Array.from(JSON.parse(localStorage.getItem("todos")));
  todos.forEach(task => {
    if (task.task === event.parentNode.children[1].value) {
      // delete task
      todos.splice(todos.indexOf(task), 1);
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    //Create todo div
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("taskDiv");

    const inputScreen = document.createElement("div");
    inputScreen.classList.add("inputScreen");

    taskDiv.appendChild(inputScreen);

    const screen = document.createElement("input");
    screen.classList.add("screen");
    screen.type = "text";
    screen.value = todo.value;
    screen.setAttribute("readonly", "readonly");
    inputScreen.appendChild(screen);

    const date = document.createElement("p");
    date.classList.add("date");
    date.innerHTML = todo.time;
    inputScreen.appendChild(date);

    const buttons = document.createElement("div");
    buttons.classList.add("buttons");
    taskDiv.appendChild(buttons);

    const done = document.createElement("button");
    done.classList.add("done");
    done.innerHTML = "Done";

    const edit = document.createElement("button");
    edit.classList.add("edit");
    edit.innerHTML = "Edit";

    const del = document.createElement("button");
    del.classList.add("delete");
    del.innerHTML = "Delete";

    buttons.appendChild(done);
    buttons.appendChild(edit);
    buttons.appendChild(del);

    results.appendChild(taskDiv);
    edit.addEventListener("click", (e) => {
      if (edit.innerText == "Edit") {
        edit.innerText = "Save";
        screen.removeAttribute("readonly");
        screen.focus();
      } else {
        edit.innerText = "Edit";
        screen.setAttribute("readonly", "readonly");
      }
    });
    del.addEventListener("click", (e) => {
      results.removeChild(taskDiv);
    });
    done.addEventListener("click", () => {
      if (done.innerText == "Done") {
        done.innerText = "Undone";
        done.style.backgroundColor = "red";
        taskDiv.classList.add("checked");
      } else {
        done.innerText = "Done";
        done.style.backgroundColor = "green";
        taskDiv.classList.remove("checked");
      }
    });
  });
}
