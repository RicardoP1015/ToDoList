import { replaceSpacesWithHyphens, handleOpeningProject, reformatDate, deleteProject, updateProject, deleteTodo, clearForm, editTodo } from "./appController"


function openForm(e) {
    const buttonId = e.target.id
    if (buttonId === 'new-todo-btn') {
        const todoForm = document.getElementById('todo-popup')
        todoForm.classList.add('open-form')
    } else if (buttonId === 'new-project-btn') {
        const projectForm = document.getElementById('project-popup')
        projectForm.classList.add('open-form')
    }
}

function closeForm(e) {
    const buttonId = e.target.id
    console.log(buttonId);
    if (buttonId === 'close-todo-btn') {
        const todoForm = document.getElementById('todo-popup')
        todoForm.classList.remove('open-form')
        clearForm(`todo-form`)
    } else if (buttonId === 'close-project-btn') {
        const projectForm = document.getElementById('project-popup')
        projectForm.classList.remove('open-form')
        clearForm(`project-form`)
    }
}

function createProjectDom(title, description) {
    const projectContainer = document.getElementById('project-container');
    const projectWrapper = document.createElement('li');
    const projectName = document.createElement('span');
    const projectDescriptionWrapper = document.createElement('div');
    const projectDescription = document.createElement('span');
    const projectArea = document.createElement('div');
    const projectSelect = document.getElementById('projects');
    const projectOption = document.createElement('option');
    const projectEditBtn = document.createElement('button');
    const projectDeleteBtn = document.createElement('button');
    const btnWrapper = document.createElement('div');
    const todoArea = document.getElementById('todo-area');
    const homeButton = document.getElementById('Main-project');

    projectWrapper.classList.add('project-item', 'tooltip');
    projectName.textContent = title;
    projectName.classList.add('project-button', 'highlighted');
    homeButton.classList.remove('highlighted');

    projectName.id = `${replaceSpacesWithHyphens(title)}-project`;
    projectName.addEventListener('click', handleOpeningProject);

    projectOption.value = replaceSpacesWithHyphens(title);
    projectOption.textContent = title;

    projectDescriptionWrapper.classList.add('tooltiptext');
    projectDescription.textContent = description;
    projectDescription.id = `${replaceSpacesWithHyphens(title)}-description`;

    projectArea.classList.add('project-area');
    projectArea.id = `${replaceSpacesWithHyphens(title)}-area`;

    projectEditBtn.classList.add('project-btn');
    projectEditBtn.id = `${replaceSpacesWithHyphens(title)}-edit-btn`;
    projectEditBtn.textContent = 'Edit';
    projectEditBtn.addEventListener('click', updateProject);

    projectDeleteBtn.classList.add('project-btn');
    projectDeleteBtn.id = `${replaceSpacesWithHyphens(title)}-delete-btn`;
    projectDeleteBtn.textContent = 'Delete';
    projectDeleteBtn.addEventListener('click', deleteProject);

    btnWrapper.classList.add('btn-wrapper');
    btnWrapper.appendChild(projectEditBtn);
    btnWrapper.appendChild(projectDeleteBtn);
    projectDescriptionWrapper.appendChild(projectDescription);
    projectDescriptionWrapper.appendChild(btnWrapper);
    projectWrapper.appendChild(projectName);
    projectWrapper.appendChild(projectDescriptionWrapper);
    projectContainer.appendChild(projectWrapper);
    todoArea.appendChild(projectArea);
    projectSelect.appendChild(projectOption);
}

function createTodoCard(title, date, priority, description, project) {
    const cardHolder = document.getElementById(project);
    const todoCard = document.createElement('div');
    todoCard.id = replaceSpacesWithHyphens(title);
    todoCard.classList.add('todo-card');

    const todoTitle = document.createElement('h2');
    todoTitle.textContent = title;
    todoTitle.classList.add('todo-title');

    const todoDueDate = document.createElement('h3');
    todoDueDate.textContent = date;
    todoDueDate.classList.add('todo-date');

    const todoPriority = document.createElement('h3');
    todoPriority.textContent = `${priority}:Priority`;
    todoPriority.classList.add('todo-priority');

    const todoDescription = document.createElement('p');
    todoDescription.textContent = description;
    todoDescription.classList.add('todo-description');

    const btnWrapper = document.createElement('div');
    btnWrapper.classList.add('todo-btn-wrapper');

    const editBtn = document.createElement('button');
    editBtn.id = `${replaceSpacesWithHyphens(title)}-edit`;
    editBtn.classList.add('todo-btn');
    editBtn.textContent = 'Edit Todo';
    editBtn.addEventListener('click', editTodo);

    const deleteBtn = document.createElement('button');
    deleteBtn.id = `${replaceSpacesWithHyphens(title)}-delete`;
    deleteBtn.classList.add('todo-btn');
    deleteBtn.textContent = 'Delete Todo';
    deleteBtn.addEventListener('click', deleteTodo);

    todoCard.appendChild(todoTitle);
    todoCard.appendChild(todoDueDate);
    todoCard.appendChild(todoPriority);
    todoCard.appendChild(todoDescription);
    todoCard.appendChild(btnWrapper);
    btnWrapper.appendChild(editBtn);
    btnWrapper.appendChild(deleteBtn);

    if (cardHolder) {
        cardHolder.appendChild(todoCard);
    }
    
}

function openProjectArea(title) {
    const todoArea = document.getElementById('todo-area')
    todoArea.innerHTML = ''

    const projectArea = document.createElement('div')
    projectArea.id = `${title}-area`
    projectArea.classList.add('project-area')

    todoArea.appendChild(projectArea)

}

function openProjectsTodos(todos) {
    todos.forEach(todo => {
        createTodoCard(todo.title, reformatDate(todo.date), todo.priority, todo.description, `${todo.project}-area`)
        console.log(todo.project);
    })
}

function deleteProjectDoms(project) {
    const projectListItem = document.getElementById(`${replaceSpacesWithHyphens(project)}-project`)
    if (projectListItem) {
        projectListItem.remove()
    }

    const projectArea = document.getElementById(`${replaceSpacesWithHyphens(project)}-area`)
    if (projectArea) {
        projectArea.remove()
    }

    const projectOption = document.querySelector(`option[value="${replaceSpacesWithHyphens(project)}"]`)
    if (projectOption) {
        projectOption.remove()
    }
}

function deleteTodoDom(todo) {
    const todoItem = document.getElementById(replaceSpacesWithHyphens(todo))
    if(todoItem) {
        todoItem.remove()
    }
}

function updateProjectDom(projectId, title, description) {
    const projectForm = document.getElementById('project-popup')
    const projectTitleElement = document.querySelector(`#${replaceSpacesWithHyphens(projectId)}-project`)
    const projectOptionElement = document.querySelector(`option[value="${replaceSpacesWithHyphens(projectId)}"]`)
    const projectDescriptionElement = document.querySelector(`#${replaceSpacesWithHyphens(projectId)}-description`)
    const projectEditBtn = document.querySelector(`#${replaceSpacesWithHyphens(projectId)}-edit-btn`)
    const projectDeleteBtn = document.querySelector(`#${replaceSpacesWithHyphens(projectId)}-delete-btn`)
    const todoArea = document.querySelector(`#todo-area`)
    const newTodoArea = document.createElement('div')

    newTodoArea.id = `${replaceSpacesWithHyphens(title)}-area`
    newTodoArea.classList.add('project-area')

    if (projectTitleElement) projectTitleElement.textContent = title
    if (projectTitleElement) projectTitleElement.id = `${replaceSpacesWithHyphens(title)}-project`
    if (projectTitleElement) projectTitleElement.addEventListener('click', handleOpeningProject)
    if (projectTitleElement) projectTitleElement.addEventListener('click', highlighProjectDom)



    if (projectDescriptionElement) projectDescriptionElement.textContent = description
    if (projectDescriptionElement) projectDescriptionElement.id = `${replaceSpacesWithHyphens(title)}-description`

    if (projectOptionElement) projectOptionElement.textContent = title
    if (projectOptionElement) projectOptionElement.value = replaceSpacesWithHyphens(title)

    if (projectEditBtn) projectEditBtn.id = `${replaceSpacesWithHyphens(title)}-edit-btn`
    if (projectDeleteBtn) projectDeleteBtn.id = `${replaceSpacesWithHyphens(title)}-delete-btn`

    projectForm.classList.remove('open-form')

    todoArea.innerHTML = ''
    todoArea.appendChild(newTodoArea)

}

function updateTodoDom( previousTitle ,title, description, dueDate, priority, project) {
    const previousTodo = document.getElementById(previousTitle)
    if (previousTodo) previousTodo.remove()

    createTodoCard(title, reformatDate(dueDate), priority, description, `${project}-area`)
}

function highlighProjectDom() {
    const buttons = document.querySelectorAll('.project-button')

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            buttons.forEach(btn => btn.classList.remove('highlighted'))

            this.classList.add('highlighted');
        })
    })
}


export { openForm, closeForm, createProjectDom, createTodoCard, openProjectArea, openProjectsTodos, deleteProjectDoms, updateProjectDom, deleteTodoDom, updateTodoDom, highlighProjectDom }