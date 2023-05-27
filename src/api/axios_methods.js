import api from "./axios_config";

// findAll() on Back End.
export function get_todos_function() {
    // Get a list of all to dos.
    // GET "/v1/todos"
    return async (handler) => {
        try {
            const response = await api.get("/todos");
            handler(response.data);
        } catch (err) {
            console.log(err);
        }
    };
}
