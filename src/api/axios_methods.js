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

// setDone().
export function set_done_function() {
    // Set a to do as done. If already done, don't do anything.
    // POST "/todos/{id}/done"
    return async (data) => {
        try {
            await api.post(`/todos/${data.id}/done`);
        } catch (err) {
            console.log(err);
        }
    };
}

// setUndone().
export function set_undone_function() {
    // Set a to do as not done. If it's already not done, don't do anything.
    // PUT "/todos/{id}/undone"
    return async (data) => {
        try {
            await api.put(`/todos/${data.id}/undone`);
        } catch (err) {
            console.log(err);
        }
    };
}

// setFiltersAndSorters().
export function set_fil_sort_function() {
    // Set filters and sorters for our to dos.
    // POST "/todos/setFiltSort"
    return async (data) => {
        try {
            await api.post("/todos/setFiltSort", {
                filters: {
                    name: data.filter.name,
                    priority: data.filter.priority,
                    done: data.filter.state,
                },
                sortField: data.sort.field,
                sortOrder: data.sort.order,
            });
        } catch (err) {
            console.log(err);
        }
    };
}

// getPage().
export function get_todos_page_function() {
    // Return a page of max 10 to dos with sorting and filters added.
    // GET "/todos/filtSort/{page}"
    return async (handler, data) => {
        try {
            const response = await api.get(`/todos/filtSort/${data.page}`);
            handler(response.data);
        } catch (err) {
            console.log(err);
        }
    };
}

// getNumberOfPages().
export function get_nu_pages_function() {
    // Return the number of pages in total.
    // GET "/todos/filtSort/pages"
    return async (handler) => {
        try {
            const response = await api.get("/todos/filtSort/pages");
            handler(response.data);
        } catch (err) {
            console.log(err);
        }
    };
}

// giveMeLastID().
export function get_last_id_function() {
    // Retrieve last index used.
    // GET "/todos/lastIndex"
    return async (handler) => {
        try {
            const response = await api.get("/todos/lastIndex");
            handler(response.data);
        } catch (err) {
            console.log(err);
        }
    };
}

// getAverageTime().
export function get_average_time_function() {
    // Retrieve the average time to complete the to dos, given a priority.
    // GET "/todos/average/{priority}"
    return async (handler, priority) => {
        try {
            const response = await api.get(`/todos/average/${priority}`);
            handler(response.data);
        } catch (err) {
            console.log(err);
        }
    };
}
