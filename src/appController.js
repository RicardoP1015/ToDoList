import { createProject } from "./project";
import { createTodo } from "./todo";
import { createProjectDom, createTodoCard, openProjectArea, openProjectsTodos } from "./domController";
const mainProject = createProject('Main', 'Default all project come here bt default')

let projects = [
    mainProject
]

let todo =[]

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
    const foundProject = projects.find(project => project['title'] === buttonId);
    console.log(foundProject);
    openProjectArea(foundProject.title)
    openProjectsTodos(foundProject.todos)
}

function handleProjectForm() {
    const projectFormInfo = getFormInfo('project-form')
    const newProject = createProject(replaceSpacesWithHyphens(projectFormInfo['project-title']), projectFormInfo['project-description'])
    const projectPopup = document.getElementById('project-popup')
    projectPopup.classList.remove('open-form')
    createProjectDom(projectFormInfo['project-title'])
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

function loadProject(title) {

}


export { handleProjectForm, handleTodoForm, replaceSpacesWithHyphens, projects, todo, handleOpeningProject, reformatDate }