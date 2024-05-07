'use strict';
function createProject(title, description, ...todos) {
    let projectTodos = todos.length > 0 ? todos : []

    function addTodo(todo) {
        projectTodos.push(todo);
    }

    function removeTodo(todoTitle) {
        const index = projectTodos.findIndex(t => t.title === todoTitle);
        if (index !== -1) {
            projectTodos.splice(index, 1)
        }
    }

    return {
        title,
        description: description || '',
        todos: projectTodos,
        addTodo,
        removeTodo
    };
}

export { createProject };