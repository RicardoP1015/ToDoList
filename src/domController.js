import { replaceSpacesWithHyphens, handleOpeningProject, reformatDate, deleteProject, updateProject } from "./appController"


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

function createProjectDom(title, description) {

    const projectContainer = document.getElementById('project-container')
    const projectWrapper = document.createElement('li')
    const projectName = document.createElement('span')
    const projectDescriptionWrapper = document.createElement('div')
    const projectDescription = document.createElement('span')
    const projectArea = document.createElement('div')
    const projectSelect = document.getElementById('projects')
    const projectOption = document.createElement('option')
    const projectEditBtn = document.createElement('button')
    const projectDeleteBtn = document.createElement('button')
    const btnWrapper = document.createElement('div')
    const todoArea = document.getElementById('todo-area')

    projectWrapper.classList.add('project-item')
    projectWrapper.classList.add('tooltip')

    projectName.textContent = title
    projectName.id = `${replaceSpacesWithHyphens(title)}-project`
    projectName.addEventListener('click', handleOpeningProject)

    projectOption.value = replaceSpacesWithHyphens(title)
    projectOption.textContent = title

    todoArea.innerHTML = ''

    projectDescriptionWrapper.classList.add('tooltiptext')

    projectDescription.textContent = description
    projectDescription.id = `${replaceSpacesWithHyphens(title)}-description`

    projectArea.classList.add(`project-area`)
    projectArea.id = `${replaceSpacesWithHyphens(title)}-area`

    projectEditBtn.classList.add('project-btn')
    projectEditBtn.id = `${replaceSpacesWithHyphens(title)}-edit-btn`
    projectEditBtn.textContent = 'Edit'
    projectEditBtn.addEventListener('click', updateProject)

    projectDeleteBtn.classList.add('project-btn')
    projectDeleteBtn.id = `${replaceSpacesWithHyphens(title)}-delete-btn`
    projectDeleteBtn.textContent = 'Delete'
    projectDeleteBtn.addEventListener('click', deleteProject)

    btnWrapper.classList.add('btn-wrapper')

    btnWrapper.appendChild(projectEditBtn)
    btnWrapper.appendChild(projectDeleteBtn)
    projectDescriptionWrapper.appendChild(projectDescription)
    projectDescriptionWrapper.appendChild(btnWrapper)
    projectWrapper.appendChild(projectName)
    projectWrapper.appendChild(projectDescriptionWrapper)
    projectContainer.appendChild(projectWrapper)
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

function deleteProjectDoms(project) {
    const projectListItem = document.getElementById(`${replaceSpacesWithHyphens(project)}-project`);
    if (projectListItem) {
        projectListItem.remove();
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


export { openForm, closeForm, createProjectDom, createTodoCard, openProjectArea, openProjectsTodos, deleteProjectDoms, updateProjectDom }