var app = {
    todoContainer: null,
    listContainer: null,
    tasks: [
      {
        title: "Faire une todo-list en JS",
        done: true
      }, {
        title: "Faire une todo-list en React",
        done: false
      }, {
        title: "Coder facebook",
        done: false
      }
    ],
  
    init: function () {
      // On cible le conteneur principal qu'une seule fois pour le réutiliser partout
      app.todoContainer = document.querySelector('#todo');
      // On nettoie tout pour tout recréer
      app.todoContainer.innerHTML = '';

      app.createForm();
      app.createCount();
      app.createList();
    },
  
    createForm: function () {
      const form = document.createElement('form');
      form.classList.add('addTaskForm');
      form.addEventListener('submit', app.handleAddTaskForm);

      const inputText = document.createElement('input');
      inputText.classList.add('addTaskForm__input');
      inputText.placeholder = 'Ajouter une tâche';
      form.appendChild(inputText);
      // On ajoute le formulaire à notre container principal
      app.todoContainer.appendChild(form);
    },
  
    handleAddTaskForm: function (event) {
      event.preventDefault();
      const form = event.target;
      const input = form.querySelector('input');
      const taskTitle = input.value;

      if (taskTitle.trim() === '') {
        alert('Attention le titre est vide');
        return false;
      }

      app.tasks.push({ title: taskTitle , done: false});

      app.init();
    },
  
    createCount: function () {

      const counter = document.createElement('h2');
      counter.classList.add('taskCounter');

      const tasksInProgress = app.tasks.filter((task) => !task.done);
      counter.textContent = `${tasksInProgress.length} tâche${tasksInProgress.length > 1 ? 's' : ''} en cours`

      app.todoContainer.appendChild(counter);
    },
  
    createList: function () {
      app.listContainer = document.createElement('ul');
      app.listContainer.classList.add('taskList');

      app.todoContainer.appendChild(app.listContainer);
  
      app.tasks.forEach(app.generateTask);
    },
  
    
    generateTask: function (task) {
      const taskEl = document.createElement('li');
      taskEl.classList.add('task');

      if (task.done) {
        taskEl.classList.add('task--checked')
      }

      const label = document.createElement('label');
      label.classList.add('task__label');
      label.textContent = task.title;
  
      const checkbox = document.createElement('input');
      checkbox.classList.add('task__checkbox');
      checkbox.type = 'checkbox';
      checkbox.checked = task.done;
      checkbox.addEventListener('change', () => {
        task.done = checkbox.checked;
        app.init();
      });

      label.prepend(checkbox);
  
      taskEl.appendChild(label);
  
      app.listContainer.appendChild(taskEl);
    },
  };
  
  
  // Chargement du DOM
  document.addEventListener('DOMContentLoaded', app.init);