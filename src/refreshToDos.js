import {
    set_last_id,
    set_todo,
    empty_todos,
    change_page,
} from "./features/todo/reducer";

import {
    set_fil_sort_function,
    get_todos_page_function,
    get_nu_pages_function,
    get_last_id_function,
} from "./api/axios_methods";

export function refresh_todos(my_filters, my_sorters, my_curr_page, dispatch) {
    // Call the API to refresh sorters and filters.
    const set_fil_sor_api = set_fil_sort_function();

    set_fil_sor_api({
        filter: {
            name: my_filters.name,
            priority: my_filters.priority,
            state: my_filters.state,
        },
        sort: {
            field: my_sorters.split("/")[0],
            order: my_sorters.split("/")[1],
        },
    });

    // Get the total number of pages. Change the current page if necessary.
    function handle_out_of_bounds(total_pages) {
        if (total_pages == 0) {
            dispatch(
                change_page({
                    page: 1,
                })
            );
        } else if (total_pages < my_curr_page) {
            dispatch(
                change_page({
                    page: total_pages,
                })
            );
        }
    }

    const get_nu_pages_api = get_nu_pages_function();
    const total_pages_api = get_nu_pages_api((nu_pages) => {
        handle_out_of_bounds(nu_pages);
    });

    // Delete all current to dos we have stored and retrieve new to dos from API.
    const get_todos_api = get_todos_page_function();

    function handle_new_todos_page(todos_list) {
        dispatch(empty_todos());
        todos_list.map((todo) => {
            // API stores dates in ISO format and in GMT. We have to add the
            // timezone offset.
            const due_date = new Date(todo.dueDate);
            const offset = due_date.getTimezoneOffset();

            dispatch(
                set_todo({
                    id: todo.id,
                    text: todo.text,
                    due_date:
                        todo.dueDate != null
                            ? new Date(due_date - offset * 60 * 1000)
                                  .toISOString()
                                  .slice(0, -1)
                            : "",
                    done: todo.done,
                    priority: todo.priority,
                    creation_date: todo.creationDate,
                })
            );
        });
    }

    get_todos_api(handle_new_todos_page, { page: my_curr_page });

    // Finally, retrieve the last index used for a to do.
    const last_id_api = get_last_id_function();
    last_id_api((response) => {
        dispatch(
            set_last_id({
                id: response,
            })
        );
    });
}
