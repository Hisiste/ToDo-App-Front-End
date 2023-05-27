import api from "./axios_config";

// findAll() on Back End.
export function get_todos_function(hook) {
    // Get a list of all to dos.
    // GET "/v1/todos"
    return async () => {
        try {
            const response = await api.get("/v1/todos");
            hook(response.data);
        } catch (err) {
            console.log(err);
        }
    };
}
