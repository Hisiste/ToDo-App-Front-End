import api from "./axios_config";

// findAll() on Back End.
export function get_todos_function() {
    // Get a list of all to dos.
    // GET "/todos"
    return async (handler) => {
        try {
            const response = await api.get("/todos");
            handler(response.data);
        } catch (err) {
            console.log(err);
        }
    };
}

// addToDo() on Back End.
export function new_todo_function() {
    // Add a new to do on database.
    // POST "/todos"
    return async (data) => {
        try {
            await api.post("/todos", {
                text: data.text,
                dueDate: data.due_date,
                priority: data.priority,
            });
        } catch (err) {
            console.log(err);
        }
    };
}

// editToDo() on BE.
export function edit_todo_function() {
    // Edit an existing to do.
    // PUT "/todos/{id}"
    return async (data) => {
        try {
            await api.put(`/todos/${data.id}`, {
                text: data.text,
                dueDate: data.due_date,
                priority: data.priority,
            });
        } catch (err) {
            console.log(err);
        }
    };
}

// removeToDo().
export function remove_todo_function() {
    // Remove an existing to do by its id.
    // DELETE "/todos/{id}"
    return async (data) => {
        try {
            await api.delete(`/todos/${data.id}`);
        } catch (err) {
            console.log(err);
        }
    };
}
