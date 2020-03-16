let allTodos 
// = [
    // {title: 'Go to car dealership' , dueDate: ' 03/15/2020' , description: 'Get navigation redone' , isComplete: false},
    // {title: 'Go grocery shopping', dueDate: ' 03/10/2020', description: 'Buy food to survive', isComplete: true},
    // {title: 'Meet with coworkers', dueDate: ' 03/04/2020', description:'Go to hang with coworkers at the brewery', isComplete: true},
    // {title: 'Watch movies with gf', dueDate: ' 03/19/2020', description:'Watch movies with your gf or else', isComplete: false},
    // {title:'Complete software engineering hw', dueDate: ' 02/15/2020', description:'Complete this project and continue working towards your dream', isComplete: false},
    // {title:'Schedule office hours', dueDate: ' 02/06/2020', description:'Get help from Preston so you can become a great engineer', isComplete: false}
//   ];

let pendingTodos, completedTodos, expiredTodos, userTodos;

function isCurrent(todo){
    const todoDueDate= new Date(todo.dueDate);
    const now= new Date();

    return now < todoDueDate;
  }

function storeData(){
    localStorage.setItem('allTodosKey',
    JSON.stringify(allTodos));
}

function retrieveData(){
    const fromLocal = localStorage.getItem('allTodosKey'); 
    allTodos = fromLocal ? JSON.parse(fromLocal) : fetchDefaultTodos();
    
}
function fetchDefaultTodos(){

    let defaultUserTodos = [ 
    
        {title: 'Welcome to ToDo App!' , dueDate: ' 04/20/2020' , description: 'You can use our app to make a list of things to do' , isComplete: false},
        {title: 'Start by clicking the + button!', dueDate: ' 03/20/2020', description: 'This will allow you to create a new todo', isComplete: false},
        {title: 'Fill out the form!', dueDate: ' 03/18/2020', description:'Fill with info on todo event', isComplete: true},
        {title: 'Click create', dueDate: ' 03/13/2020', description:'Your new todo object is ready!', isComplete: false} 
    ];

    return defaultUserTodos;
        
};


function splitTodos(){

    pendingTodos= allTodos.filter(function(todo){ 
            return !todo.isComplete  & isCurrent(todo);
        });

    completedTodos = allTodos.filter(function(todo){
            return todo.isComplete 
    });

    expiredTodos = allTodos.filter(function(todo){
            return !todo.isComplete & !isCurrent(todo)
    })
};

 
function createElementFromTodo(todo) {
    // const tasks = $('<div class = "todo">').html(`<h3><span class="title">

    // ${todo.title}</span><span class="due-date">
    // ${todo.dueDate}</span></h3><pre>
    // ${todo.description}</pre><footer class="actions"> <button class="action complete">Complete</button>
    // <button class="action delete">Delete</button>
    // </footer>`); 

    // tasks.data("todo", todo);

    return $(`<div class = "todo"<h3><span class="title">
        ${todo.title}</span><span class="due-date">
        ${todo.dueDate}</span></h3><pre>
        ${todo.description}</pre><footer class="actions"> <button class="action complete">Complete</button>
        <button class="action delete">Delete</button>
        </footer></div>`).data("todo", todo);

    // return tasks;
};


    
$('main').on('click', '.action.complete', function(){

    const parentTodo = $(this).closest('.todo'); 
    const todoData = parentTodo.data('todo');

    todoData.isComplete = true;
    
    storeData();
    splitTodos();
    renderTodos();

});
    


  
function renderTodos(){
    $('main .content').empty();
    
    
    pendingTodos.forEach(function(todo){
        $('.pending-todos').append(createElementFromTodo(todo))
    }); 

    completedTodos.forEach(function(todo){
        $('.completed-todos').append (createElementFromTodo(todo))
    });

    expiredTodos.forEach(function(todo){
        $('.expired-todos').append(createElementFromTodo(todo))
    });

        // allTodos.forEach(function (todo) {
        //  if(todo.isComplete === true) {
        //      return $('.completed-todos').append(taskElement)
        //  } 
         
        //  else if (todo.isComplete === false) {
        //      return $('.pending-todos').append(taskElement)
        //  }
    };  







 $('.left-drawer').click(function() {
     
    const isDrawer = $(this).hasClass('left-drawer');

     if (isDrawer === true) {
        $('#app').toggleClass('drawer-open')
     }

 });

$('.add-todo').click(function(){
    $('.modal').addClass('open')
        
});

$('.create-todo').click(function(event){
    event.preventDefault();
    
    const newTodo = createTodoFromForm(); 
    
    allTodos.unshift(newTodo);
    $('.todo-form').trigger('reset')
    $('.modal').removeClass('open')

    console.log(newTodo)
    console.log(allTodos)
    storeData();
    splitTodos();
    renderTodos();
});

$('.cancel-create-todo').click(function(){
    $('.modal').removeClass('open')
});

function createTodoFromForm() {
    
    let newTitle = $('#todo-title').val();
    let newDueDate = $('#todo-due-date').val();
    let newDescription = $('#todo-description').val();

    const newCreatedTodo = {
        title:newTitle,
        dueDate:newDueDate,
        description:newDescription,
        isComplete:false
     };
     $('.todo-form').empty();
    return newCreatedTodo;

};   



function storeSplitRender(){
storeData();
splitTodos();
renderTodos();
}

$('main').on('click', '.action.delete', function(){
    allTodos.shift();
   
   
    storeSplitRender();
});

$('.remove-completed').click(function() {
    allTodos = allTodos.filter(function(todo){
        return !todo.isComplete
    });
    storeSplitRender();
})
 

$('.remove-expired').click(function() {
    allTodos = allTodos.filter(function(todo){
        return isCurrent(todo)
    });
    storeSplitRender();
})
 

retrieveData();
splitTodos();
storeData();
renderTodos();
