'use strict';
function createTodo(title, project = 0, date = "", priority = "", description = "") {
    return {
        title,
        project,
        date,
        priority,
        description
    };
}

export { createTodo }