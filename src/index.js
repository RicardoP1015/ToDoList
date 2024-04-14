import './css/styles.css'
import { openForm, closeForm } from './domController'
import { handleProjectForm, handleTodoForm, projects, todo } from './appController'

const openFormsBtn = document.querySelectorAll('.navbar-btn')
const closeFormBtn = document.querySelectorAll('.form-btn')
const addNewProjectBtn = document.getElementById('add-project-btn')
const addNewTodoBtn = document.getElementById('add-todo-btn')

openFormsBtn.forEach(btn => {
    btn.addEventListener('click', openForm)
})

closeFormBtn.forEach(btn => {
    btn.addEventListener('click', closeForm)
})

addNewProjectBtn.addEventListener('click', handleProjectForm)
addNewTodoBtn.addEventListener('click', handleTodoForm)