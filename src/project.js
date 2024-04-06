'use strict';
function createProject(title, description, ...todos) {
    let projectIndex = 0;
    let projectTodos = todos.length > 0 ? todos : [];

    function addTodo(todo) {
        projectTodos.push(todo);
        todo.project = projectIndex;
        todo.currentProjectIndex = projectTodos.length - 1;
    }

    function removeTodo(index) {
        projectTodos[index].project = 0;
        delete projectTodos[index].currentProjectIndex;
        projectTodos.splice(index, 1);
        projectTodos.forEach((todo, i) => {
            if (i >= index) {
                todo.currentProjectIndex--;
            }
        });
    }

    return {
        title,
        description: description || '',
        todos: projectTodos,
        index: projectIndex,
        addTodo,
        removeTodo
    };
}

export { createProject };