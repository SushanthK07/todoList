let userInputContainer = document.getElementById("userInputContainer");
let userNameInputElement = document.getElementById("userNameInput");
let welcomeMessageElement = document.getElementById("welcomeMessage");

function submitUserName() {
    let userName = userNameInputElement.value;
    if (userName === "") {
        alert("Enter the name");
        return;
    }
    localStorage.setItem("userName", userName);
    displayWelcomeMessage(userName);
}

let storedUserName = localStorage.getItem("userName");
if (storedUserName !== null) {
    displayWelcomeMessage(storedUserName);
}

function displayWelcomeMessage(userName) {
    let message = "Welcome " + userName + ", to the Todos List";
    welcomeMessageElement.textContent = message;
    userNameInputElement.value = "";
    userInputContainer.classList.add("d-none");
}

let todoItemsContainer = document.getElementById("todoItemsContainer");
let addButtonElement = document.getElementById("addTodoButton");
addButtonElement.onclick = function() {
    onAddTodo();
};

// let todoList = [
//     {text: "Learn HTML", uniqueNo: 1},
//     {text: "Learn CSS", uniqueNo: 2},
//     {text: "Learn JavaScript", uniqueNo: 3}
// ];

let saveTodoButton = document.getElementById("saveTodoButton");
saveTodoButton.onclick = function() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
};

function getTodoListFromLocalStorage() {
    let stringifiedTodoList = localStorage.getItem("todoList");
    let parsedTodoList = JSON.parse(stringifiedTodoList);

    if (parsedTodoList === null) {
        return [];
    } else {
        return parsedTodoList;
    }
}

let todoList = getTodoListFromLocalStorage();
let todosCount = todoList.length;

function onAddTodo() {
    let userInputElement = document.getElementById("todoUserInput");
    let userInputValue = userInputElement.value;
    if (userInputValue === "") {
        alert("Enter the valid text");
        return;
    }
    todosCount = todosCount + 1;
    let newTodoObject = {
        text: userInputValue,
        uniqueNo: todosCount,
        isChecked: false
    };
    todoList.push(newTodoObject);
    createAndAppendTodo(newTodoObject);
    userInputElement.value = "";
}

function onTodoStatusChanged(checkboxId, labelId, todoId) {
    let checkboxElement = document.getElementById(checkboxId);
    let labelElement = document.getElementById(labelId);

    labelElement.classList.toggle("checked");
    // if (checkboxElement.checked === true) labelElement.classList.add("checked");
    // else labelElement.classList.remove("checked");

    todoItemIndex = todoList.findIndex(function(eachTodo) {
        let eachTodoId = "todo" + eachTodo.uniqueNo;
        if (eachTodoId === todoId) return true;
        else return false;
    });
    // console.log(todoItemIndex);
    let todoObject = todoList[todoItemIndex];
    if (todoObject.isChecked === true) {
        todoObject.isChecked = false;
    } else {
        todoObject.isChecked = true;
    }
    console.log(todoObject.isChecked);
}

function onDeleteTodo(todoId) {
    let todoElement = document.getElementById(todoId);
    todoItemsContainer.removeChild(todoElement);

    let deletedTodoItemIndex = todoList.findIndex(function(eachTodoItem) {
        let eachTodoItemId = "todo" + eachTodoItem.uniqueNo;
        if (todoId === eachTodoItemId) return true;
        else return false;
    });
    // console.log(deletedTodoItemIndex);
    todoList.splice(deletedTodoItemIndex, 1);
}

function createAndAppendTodo(todo) {
    let checkboxId = "checkbox" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;
    let todoId = "todo" + todo.uniqueNo;

    let todoElement = document.createElement('li');
    todoElement.id = todoId;
    todoElement.classList.add('todo-item-Container', 'd-flex', 'flex-row');
    todoItemsContainer.appendChild(todoElement);

    let inputElement = document.createElement("input");
    inputElement.type = 'checkbox';
    inputElement.id = checkboxId;
    inputElement.checked = todo.isChecked;
    inputElement.classList.add('checkbox-input');

    inputElement.onclick = function() {
        onTodoStatusChanged(checkboxId, labelId, todoId);
    };

    todoElement.appendChild(inputElement);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add('label-container', 'd-flex', 'flex-row');
    todoElement.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.id = labelId;
    labelElement.setAttribute("for", checkboxId);
    labelElement.classList.add('checkbox-label');
    labelElement.textContent = todo.text;
    if (todo.isChecked === true) {
        labelElement.classList.add("checked");
    }
    labelContainer.appendChild(labelElement);

    let deleteIconContainer = document.createElement("div");
    deleteIconContainer.classList.add('delete-icon-container', 'd-flex', 'flex-row');
    labelContainer.appendChild(deleteIconContainer);

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
    deleteIcon.onclick = function() {
        onDeleteTodo(todoId);
    };
    deleteIconContainer.appendChild(deleteIcon);
}

for (let todo of todoList) {
    createAndAppendTodo(todo);
}