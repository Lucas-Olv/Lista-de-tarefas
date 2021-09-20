
//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.todo-filter');
const selectUsername = document.querySelector('.todo-username');

writeUsername();

//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('change', todoFilter);

//Functions

function writeUsername() {
    let checkTodoListName;
    let askUsername;

    if (localStorage.getItem('checkTodoListName') === null) {
        askUsername = prompt('Seja bem vindo! Por favor digite seu nome: ')
        selectUsername.innerHTML = `Lista de tarefas de ${askUsername}`;
        localStorage.setItem('checkTodoListName', askUsername);
    } else {
        checkTodoListName = localStorage.getItem('checkTodoListName');
        alert(`Bem vindo de volta, ${checkTodoListName}`);
        selectUsername.innerHTML = `Lista de tarefas de ${checkTodoListName}`;
    }

}

function addTodo() {

    event.preventDefault();
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo'); 

    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="bi-check2"></i>';
    completedButton.classList.add('completed-button');
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="bi-trash"></i>';
    trashButton.classList.add('trash-button');
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);

    saveLocalTodos(todoInput.value);
    
    todoInput.value = '';
}

function deleteCheck(e) {
    const item = e.target;
    //delete todo
    if (item.classList[0] === 'trash-button') {
        const todo = item.parentElement;
        todo.classList.add('removeAnim')
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function() {
            todo.remove();
        })
    }

    //check todo
    if (item.classList[0] === 'completed-button') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function todoFilter(e) {

    const todos = todoList.childNodes;
    todos.forEach((todo)=> {
        switch(e.target.value) {
            case "all":
                todo.style.display = "flex"
                break;

            case "completed":
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex'; 
                }else {
                    todo.style.display = 'none';
                }
                break;

            case "uncompleted":
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'none';
                } else {
                    todo.style.display = 'flex';
                }
                break;
        }
    });
}

function saveLocalTodos(todo) {
    let localTodos;

    if (localStorage.getItem('localTodos') === null) {
        localTodos = [];
    } else {
        localTodos = JSON.parse(localStorage.getItem('localTodos'));
    }

    localTodos.push(todo);
    localStorage.setItem('localTodos', JSON.stringify(localTodos));
}

function getTodos() {

    if (localStorage.getItem('localTodos' === null)) {
        localTodos = [];
    } else {
        localTodos = JSON.parse(localStorage.getItem('localTodos'));
    }

    localTodos.forEach(function(todo){
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo'); 
    
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
    
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="bi-check2"></i>';
        completedButton.classList.add('completed-button');
        todoDiv.appendChild(completedButton);
    
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="bi-trash"></i>';
        trashButton.classList.add('trash-button');
        todoDiv.appendChild(trashButton);
    
        todoList.appendChild(todoDiv);
    });

}

function removeLocalTodos(todo) {
    
    let localTodos;

    if (localStorage.getItem('localTodos' === null)) {
        localTodos = [];
    } else {
        localTodos = JSON.parse(localStorage.getItem('localTodos'));
    }
    const todoIndex = todo.children[0].innerText;
    localTodos.splice(localTodos.indexOf(todoIndex), 1);
    localStorage.setItem('localTodos', JSON.stringify(localTodos))

}






