import { createProject } from "./project";
import { createTodo } from "./todo";
import { createProjectDom, createTodoCard, openProjectArea, openProjectsTodos, deleteProjectDoms, updateProjectDom } from "./domController";
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
    document.getElementById(formId).reset();
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
    const newTodo = createTodo(replaceSpacesWithHyphens(todoFormInfo['todo-title']), todoFormInfo.projects, todoFormInfo['todo-due-date'], todoFormInfo['todo-priority'], todoFormInfo['todo-description'])
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
            console.log(updatedTitle);
            const updatedDescription = document.getElementById('project-description').value
            currentProject.title = replaceSpacesWithHyphens(updatedTitle)
            currentProject.description = updatedDescription
            console.log(currentProject)

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



export { handleProjectForm, handleTodoForm, replaceSpacesWithHyphens, projects, todo, handleOpeningProject, reformatDate, deleteProject, updateProject }