// Selectors
const todoInput=document.querySelector('.todo-input');
const todoDate=document.querySelector('.todo-date');
const todoButton=document.querySelector('.todo-button');
const todoList=document.querySelector('.todo-list');
const filterOption=document.querySelector(".filter-todo");
//Event Listeners
document.addEventListener("DOMContentLoaded",getTodos);
todoButton.addEventListener("click",addTodo);
todoList.addEventListener("click",deleteCheck);
filterOption.addEventListener("click",filterTodo);

//Functions
function addTodo(event){
    //prevent from submitting
    event.preventDefault();

    //  Todo Div
    const todoDiv=document.createElement('div');
    todoDiv.classList.add("todo");
    //LI
    const Li=document.createElement('li');
    const task=document.createElement('h1');
    task.textContent=todoInput.value;
    Li.appendChild(task);
    const date=document.createElement('h1');
    date.textContent=todoDate.value;
   Li.appendChild(date);
    Li.classList.add('todo-item');
todoDiv.appendChild(Li);
//ADd Todo to localStorage
 const addtodo={
     task:`${todoInput.value}`,
     date:`${todoDate.value}`
 }
saveLocalTodos(addtodo);
// Check mark Button
const completedButton=document.createElement('button');
completedButton.innerHTML='<i class="fas fa-check"</i>';
completedButton.classList.add('complete-btn');
todoDiv.appendChild(completedButton);
// Check trash Button
const trashButton=document.createElement('button');
trashButton.innerHTML='<i class="fas fa-trash"</i>';
trashButton.classList.add('trash-btn');
todoDiv.appendChild(trashButton);

//append to list
todoList.appendChild(todoDiv);

// clear input value;
todoInput.value="";
todoDate.value="";
}


function deleteCheck(e){
const item=e.target;
if(item.classList.contains('trash-btn') ){
    const todo=item.parentElement;

    //ani ani
    todo.classList.add('fall');
    removeLocalTodos(todo);
    todo.addEventListener("transitionend",function(){
todo.remove();
    });
   
}
if(item.classList.contains("complete-btn")){
    console.log("radhe radhe");
    const todo=item.parentElement;
    todo.classList.toggle('completed');
}
}

function filterTodo(e) {
    const todos=todoList.childNodes;
    todos.forEach(function (todo) {
        switch (e.target.value){
            case "all":
                todo.style.display="flex";
                break;
             
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display="flex";
                }else{
                    todo.style.display="none";
                }     
                break;
            case "uncompleted":
                if(todo.classList.contains("completed")){
                    todo.style.display="none";
                }else{
                    todo.style.display="flex";
                } 
                break;
        }
    });
}


function saveLocalTodos(todo){
    // check  already stored things
    let todos;
    if(localStorage.getItem("todos")===null){
        todos=[];
    }else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if(localStorage.getItem("todos")===null){
        todos=[];
    }else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo){
    //  Todo Div
    const todoDiv=document.createElement('div');
    todoDiv.classList.add("todo");
    //LI
    const Li=document.createElement('li');
    const task=document.createElement('h1');
    task.textContent=todo.task;
    Li.appendChild(task);
    const date=document.createElement('h1');
    date.textContent=todo.date;
   Li.appendChild(date);
    Li.classList.add('todo-item');
todoDiv.appendChild(Li);

// Check mark Button
const completedButton=document.createElement('button');
completedButton.innerHTML='<i class="fas fa-check"</i>';
completedButton.classList.add('complete-btn');
todoDiv.appendChild(completedButton);
// Check trash Button
const trashButton=document.createElement('button');
trashButton.innerHTML='<i class="fas fa-trash"</i>';
trashButton.classList.add('trash-btn');
todoDiv.appendChild(trashButton);

//append to list
todoList.appendChild(todoDiv);
    });
}


function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem("todos")===null){
        todos=[];
    }else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }
    let tasks=todo.children[0].children[0].textContent;
  
   var todoIndex;
   console.log(todos[0].task===tasks);
 for(var i=0;i<todos.length;i++){
todos[i].task===tasks;
todoIndex=i;

 }
 
if(todoIndex>=0){
    todos.splice(todoIndex,1);
}
localStorage.setItem("todos",JSON.stringify(todos));
}
