(function() {
  // Функция названия Туду
  function createAppTitle(title) {
    let appTitle = document.createElement('h2');
    appTitle.innerHTML = title;
    return appTitle;
  }

  // Функция создания формы Туду
  function createTodoItemForm() {
    let form = document.createElement('form'),
        input = document.createElement('input'),
        buttonWrapper = document.createElement('div'),
        button = document.createElement('button');

    form.classList.add('input-group', 'mb-3');
    input.classList.add('form-control');
    input.placeholder = 'Введите название нового дела';
    buttonWrapper.classList.add('input-group-append');
    button.classList.add('btn', 'btn-primary');
    button.innerHTML = 'Добавить дело';
    button.disabled = true;

    buttonWrapper.append(button);
    form.append(input);
    form.append(buttonWrapper);

    return {
      form,
      input,
      button
    };
  }

  // Функция создания списка с задачами
  function createTodoList() {
    let list = document.createElement('ul');
    list.classList.add('list-group');
    return list;
  }

  // Функция создания самих задач
  function createTodoItem(name, done = false) {
    let item = document.createElement('li'),
        buttonGroup = document.createElement('div'),
        doneButton = document.createElement('button'),
        deleteButton = document.createElement('button');

    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    item.textContent = name;

    if (done) {
      item.classList.add('list-group-item-success');
    }

    buttonGroup.classList.add('btn-group', 'btn-group-sm');
    doneButton.classList.add('btn', 'btn-success');
    doneButton.textContent = 'Готово!';
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.textContent = 'Удалить!';

    item.append(buttonGroup);
    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);

    return {
      item,
      doneButton,
      deleteButton
    };
  }

  // Функция для обновления данных в localStorage
  function updateLocalStorage(todoList) {
    const tasks = [];
    todoList.querySelectorAll('li').forEach(item => {
      tasks.push({
        name: item.textContent.replace('Готово!Удалить!', '').trim(),
        done: item.classList.contains('list-group-item-success')
      });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // Основная функция создания приложения
  function createTodoApp(container, title = 'Список дел', tasks = []) {
    let todoAppTitle = createAppTitle(title),
        todoItemForm = createTodoItemForm(),
        todoList = createTodoList();

    container.append(todoAppTitle);
    container.append(todoItemForm.form);
    container.append(todoList);

    // Получаем данные из localStorage
    let savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function addTask(name, done = false) {
      let todoItem = createTodoItem(name, done);
      todoList.append(todoItem.item);

      todoItem.doneButton.addEventListener('click', () => {
        todoItem.item.classList.toggle('list-group-item-success');
        updateLocalStorage(todoList);
      });
      todoItem.deleteButton.addEventListener('click', () => {
        if (confirm('Вы уверены?')) {
          todoItem.item.remove();
          updateLocalStorage(todoList);
        }
      });
    }

    // Добавляем сохраненные задачи
    [...savedTasks, ...tasks].forEach(task => addTask(task.name || task, task.done));

    // Блокировка кнопки при отсутствии текста
    todoItemForm.form.addEventListener('input', () => {
      todoItemForm.button.disabled = !todoItemForm.input.value;
    });

    // Добавление задачи при отправке формы
    todoItemForm.form.addEventListener('submit', function(e) {
      e.preventDefault();
      if (!todoItemForm.input.value) {
        return;
      }
      addTask(todoItemForm.input.value.trim());
      updateLocalStorage(todoList);
      todoItemForm.input.value = '';
    });
  }

  window.createTodoApp = createTodoApp;
})();