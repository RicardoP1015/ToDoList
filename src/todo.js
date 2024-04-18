'use strict';
function createTodo(title, project, date = "", priority = "", description = "") {
    return {
        title,
        project,
        date,
        priority,
        description
    };
}

export { createTodo }