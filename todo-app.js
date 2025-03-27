( function() {
  // Функция названия Туду
  function createAppTitile (title){
    let appTitle = document.createElement('h2')
    appTitle.innerHTML = title
    return appTitle
  }
  // Функция создания формы Туду
  function createTodoItemForm(){
    let form = document.createElement('form'),
        input = document.createElement('input'),
        buttomWrapper = document.createElement('div'),
        button = document.createElement('button')
    
    form.classList.add('input-group', 'mb-3')
    input.classList.add('form-control')
    input.placeholder = 'Введите название нового дела'
    buttomWrapper.classList.add('input-group-append')
    button.classList.add('btn', 'btn-primary') 
    button.innerHTML = 'Добавить дело'   

    buttomWrapper.append(button)
    form.append(input)
    form.append(buttomWrapper)
    
    
    button.disabled = true
    
    return {
      form,
      input,
      button
    }
  }

  // Функция создания списка с задачами
  function createTodoList(){
    let list = document.createElement('ul')
    list.classList.add('list-group')
    return list
  }

  // Функция создания самих задач
  function createTodoItem (name){
    let item = document.createElement('li'),
    buttonGroup = document.createElement('div'),
    doneButton = document.createElement('button'),
    deleteButton = document.createElement('button')
    
    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center')
    item.textContent = name
    
    buttonGroup.classList.add('btn-group', 'btn-group-sm')
    doneButton.classList.add('btn', 'btn-success')
    doneButton.textContent = 'Готово!'
    deleteButton.classList.add('btn', 'btn-danger')
    deleteButton.textContent = 'Удалить!'
    
    item.append(buttonGroup)
    buttonGroup.append(doneButton)
    buttonGroup.append(deleteButton)
    
    return {
      item,
      doneButton,
      deleteButton
    }
  }

  function createTodoApp (container, title = 'Список дел', tasks = [] ){ 

      let todoAppTitle = createAppTitile(title),
          todoItemForm = createTodoItemForm(),
          todoList = createTodoList()
      
      container.append(todoAppTitle)
      container.append(todoItemForm.form)
      container.append(todoList)

     tasks.forEach(task => {
      let todoItem = createTodoItem(task)
      todoList.append(todoItem.item)

      todoItem.doneButton.addEventListener('click', () => {
        todoItem.item.classList.toggle('list-group-item-success')
      })
      todoItem.deleteButton.addEventListener('click', () => {
        if(confirm('Вы уверены?')){
            todoItem.item.remove()          
          }
      })
     })
     
      todoItemForm.form.addEventListener('input', () => {
        if(!todoItemForm.input.value){
          todoItemForm.button.disabled = true
        } else {
          todoItemForm.button.disabled = false
        }
 
      })
      todoItemForm.form.addEventListener('submit', function(e){
        e.preventDefault()

        // Если ничего не ввели в начальной форме то не создаем элемент 
        if(!todoItemForm.input.value){
          return
        }
        // Переменная с названием задачи 
        let todoItem = createTodoItem(todoItemForm.input.value)
        // Обработчик события на клик по кнопке Готово
        todoItem.doneButton.addEventListener('click', function(){
          todoItem.item.classList.toggle('list-group-item-success')
        })
        // Обработчик события на кнопку удалить
        todoItem.deleteButton.addEventListener('click', function(){
          if(confirm('Вы уверены?')){
            todoItem.item.remove()          
          }
        })
        // Создаем и добавляем задачу в список дел 
        todoList.append(todoItem.item)
        // Обнуляем поле после отправки задачи 
        todoItemForm.input.value = ''        
      })  
  }

  window.createTodoApp = createTodoApp;
})()