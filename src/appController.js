import { createProject } from "./project";
import { createTodo } from "./todo";
import { createProjectDom, createTodoCard, openProjectArea, openProjectsTodos, deleteProjectDoms, updateProjectDom, deleteTodoDom, updateTodoDom } from "./domController";
const mainProject = createProject('Main', 'Default all project come here by default')

let projects = [
    mainProject
]

let todo = []

function reformatDate(dateStr) {
    let parts = dateStr.split('-')
    return `${parts[1]}-${parts[2]}-${parts[0]}`
}

function replaceSpacesWithHyphens(str) {
    return str.replace(/\s+/g, '-');
}

function getFormInfo(formId) {
    const form = document.getElementById(formId);
    const formData = {};
    for (const element of form.elements) {
        if (element.name) {
            formData[element.name] = element.value;
        }
    }
    console.log(formData);
    return formData;
}


function clearForm(formId) {
    const currentForm = document.getElementById(formId);
    console.log(currentForm);
    if (currentForm) {
        currentForm.reset();
    } else {
        console.error('Form not found with ID:', formId);
    }
}

function handleOpeningProject(e) {
    const buttonId = e.target.id.replace(/-project$/, '');
    console.log(replaceSpacesWithHyphens(buttonId));
    const foundProject = projects.find(project => project['title'] === replaceSpacesWithHyphens(buttonId))
    console.log(foundProject);
    if (foundProject) {
        openProjectArea(foundProject.title)
        openProjectsTodos(foundProject.todos)
    }
}

function handleProjectForm() {
    const projectFormInfo = getFormInfo('project-form')
    const newProject = createProject(replaceSpacesWithHyphens(projectFormInfo['project-title']), projectFormInfo['project-description'])
    const projectPopup = document.getElementById('project-popup')
    projectPopup.classList.remove('open-form')
    createProjectDom(projectFormInfo['project-title'], projectFormInfo['project-description'])
    projects.push(newProject)
    clearForm('project-form')
}

function handleTodoForm() {
    const todoFormInfo = getFormInfo('todo-form')
    const newTodo = createTodo(replaceSpacesWithHyphens(todoFormInfo['todo-title']), replaceSpacesWithHyphens(todoFormInfo.projects), todoFormInfo['todo-due-date'], todoFormInfo['todo-priority'], todoFormInfo['todo-description'])
    console.log(newTodo);
    const todoPopup = document.getElementById('todo-popup')
    todoPopup.classList.remove('open-form')
    todo.push(newTodo)
    let currentProject = projects.find(project => project.title === todoFormInfo.projects);
    currentProject.addTodo(newTodo)
    createTodoCard(todoFormInfo['todo-title'], reformatDate(todoFormInfo['todo-due-date']), todoFormInfo['todo-priority'], todoFormInfo['todo-description'], `${todoFormInfo.projects}-area`)
    clearForm('todo-form')
}

function deleteProject(e) {
    const projectId = e.target.id.replace(/-delete-btn$/, '')

    projects = projects.filter(project => project.title !== replaceSpacesWithHyphens(projectId))

    deleteProjectDoms(projectId)
}

function deleteTodo(e) {
    const todoId = e.target.id.replace(/-delete$/, '') 

    const currentTodo = todo.find(t => replaceSpacesWithHyphens(t.title) === todoId)
    console.log(currentTodo)

    const projectHoldingTodo = projects.find(p => replaceSpacesWithHyphens(p.title) === currentTodo.project)
    console.log(projectHoldingTodo)

    deleteTodoDom(currentTodo.title)

    projectHoldingTodo.removeTodo(currentTodo.title)
    console.log(projectHoldingTodo)

}

function updateProject(e) {
    const projectId = e.target.id.replace(/-edit-btn$/, '')
    const currentProject = projects.find(p => replaceSpacesWithHyphens(p.title) === projectId)
    console.log(currentProject);

    const projectFormPopup = document.getElementById('project-popup')
    if (currentProject) {
        
        document.getElementById('project-title').value = currentProject.title.replace(/-/g, ' ')
        document.getElementById('project-description').value = currentProject.description
        projectFormPopup.classList.add('open-form')

        const saveBtn = document.getElementById('add-project-btn')

        saveBtn.removeEventListener('click', handleProjectForm)
        saveBtn.onclick = function () {

            const updatedTitle = document.getElementById('project-title').value
            const updatedDescription = document.getElementById('project-description').value

            currentProject.title = replaceSpacesWithHyphens(updatedTitle)
            currentProject.description = updatedDescription

            updateProjectDom(projectId, updatedTitle, updatedDescription)

            const foundProject = projects.find(project => project['title'] === replaceSpacesWithHyphens(updatedTitle))
            foundProject.todos.forEach(todo => {
                todo.project = `${replaceSpacesWithHyphens(updatedTitle)}`
            })
            openProjectsTodos(foundProject.todos)

            clearForm(`project-form`)

            projectFormPopup.classList.remove('open-form')
            saveBtn.addEventListener('click', handleProjectForm)
            saveBtn.onclick = null
        }
    }
}

function editTodo(e) {
    const todoId = e.target.id.replace(/-edit$/, '')

    const currentTodo = todo.find(t => replaceSpacesWithHyphens(t.title) === todoId)
    
    const projectHoldingTodo = projects.find(p => replaceSpacesWithHyphens(p.title) === currentTodo.project)

    const todoToEdit = projectHoldingTodo.todos.find(t => t.title === currentTodo.title)
    console.log(todoToEdit);

    const todoFormPopup = document.getElementById('todo-popup')

    if  (todoToEdit) {

        document.getElementById('todo-title').value = todoToEdit.title.replace(/-/g, ' ')
        document.getElementById('todo-description').value = todoToEdit.description
        document.getElementById('todo-due-date').value = todoToEdit.date
        document.getElementById('todo-priority').value = todoToEdit.priority
        document.getElementById('projects').value = todoToEdit.project
        todoFormPopup.classList.add('open-form')

        const saveBtn = document.getElementById('add-todo-btn')

        saveBtn.removeEventListener('click', handleTodoForm)
        saveBtn.onclick = function() {
            const updatedTitle = document.getElementById('todo-title').value
            const updatedDescription = document.getElementById('todo-description').value
            const updatedDueDate = document.getElementById('todo-due-date').value
            const updatedPriority = document.getElementById('todo-priority').value
            const updatedProject = document.getElementById('projects').value

            todoToEdit.title = replaceSpacesWithHyphens(updatedTitle)
            todoToEdit.description = updatedDescription
            todoToEdit.date = updatedDueDate
            todoToEdit.priority = updatedPriority
            todoToEdit.project = updatedProject

            console.log(todoToEdit)

            updateTodoDom(todoId, updatedTitle, updatedDescription, updatedDueDate, updatedPriority, updatedProject)

            clearForm(`todo-form`)

            todoFormPopup.classList.remove('open-form')
            saveBtn.addEventListener('click', handleTodoForm)
            saveBtn.onclick = null

        }

    }

}



export { handleProjectForm, handleTodoForm, replaceSpacesWithHyphens, projects, todo, handleOpeningProject, reformatDate, deleteProject, updateProject, deleteTodo, clearForm, editTodo }