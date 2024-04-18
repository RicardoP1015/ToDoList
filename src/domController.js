import { replaceSpacesWithHyphens, handleOpeningProject, reformatDate } from "./appController"


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
    if (buttonId === 'close-todo-btn') {
        const todoForm = document.getElementById('todo-popup')
        todoForm.classList.remove('open-form')
    } else if (buttonId === 'close-project-btn') {
        const projectForm = document.getElementById('project-popup')
        projectForm.classList.remove('open-form')
    }
}

function createProjectDom(title) {
    const projectName = document.createElement('li')
    const projectArea = document.createElement('div')
    const projectSelect = document.getElementById('projects')
    const projectOption = document.createElement('option')

    projectOption.value = replaceSpacesWithHyphens(title)
    projectOption.textContent = title

    const projectWrapper = document.getElementById('project-container')
    const todoArea = document.getElementById('todo-area')
    todoArea.innerHTML = ''

    projectName.textContent = title
    projectName.classList.add('project-item')
    projectName.id = `${replaceSpacesWithHyphens(title)}-project`
    projectName.addEventListener('click', handleOpeningProject)

    projectArea.classList.add(`project-area`)
    projectArea.id = `${replaceSpacesWithHyphens(title)}-area`

    projectWrapper.appendChild(projectName)
    todoArea.appendChild(projectArea)
    projectSelect.appendChild(projectOption)
}

function createTodoCard(title, date, priority, description, project) {
    const cardHolder = document.getElementById(project)
    const todoCard = document.createElement('div')
    todoCard.id = replaceSpacesWithHyphens(title)
    todoCard.classList.add('todo-card')

    const todoTitle = document.createElement('h2')
    todoTitle.textContent = title
    todoTitle.classList.add('todo-title')

    const todoDueDate = document.createElement('h3')
    todoDueDate.textContent = date
    todoDueDate.classList.add('todo-date')

    const todoPriority = document.createElement('h3')
    todoPriority.textContent = `${priority}:Priority`
    todoPriority.classList.add('todo-priority')

    const todoDescription = document.createElement('p')
    todoDescription.textContent = description
    todoDescription.classList.add('todo-description')

    const btnWrapper = document.createElement('div')
    btnWrapper.classList.add('todo-btn-wrapper')

    const editBtn = document.createElement('button')
    editBtn.id = `${replaceSpacesWithHyphens(title)}-edit`
    editBtn.classList.add('todo-btn')
    editBtn.textContent = 'Edit Todo'

    const deleteBtn = document.createElement('button')
    deleteBtn.id = `${replaceSpacesWithHyphens(title)}-delete`
    deleteBtn.classList.add('todo-btn')
    deleteBtn.textContent = 'Delete Todo'

    todoCard.appendChild(todoTitle)
    todoCard.appendChild(todoDueDate)
    todoCard.appendChild(todoPriority)
    todoCard.appendChild(todoDescription)
    todoCard.appendChild(btnWrapper)
    btnWrapper.appendChild(editBtn)
    btnWrapper.appendChild(deleteBtn)

    if (cardHolder) {
        cardHolder.appendChild(todoCard)
    } else {
        return
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

export { openForm, closeForm, createProjectDom, createTodoCard, openProjectArea, openProjectsTodos }