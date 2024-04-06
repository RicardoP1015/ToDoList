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

export { openForm, closeForm }