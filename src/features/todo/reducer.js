import { createSlice } from "@reduxjs/toolkit";

export const todo_slice = createSlice({
    name: "todo_list",
    initialState: {
        last_id: 0,
        todos: [],

        current_sorting: "created_time",

        filtered_todos: [],
        current_filters: {
            name: "",
            priority: "All",
            state: "All",
        },
    },

    reducers: {
        add_todo: (state, action) => {
            state.todos = [
                ...state.todos,
                {
                    id: ++state.last_id,
                    text: action.payload.text,
                    due_date: action.payload.due_date,
                    done: action.payload.done,
                    priority: action.payload.priority,
                    creation_date: action.payload.creation_date,
                },
            ];
        },

        set_todo: (state, action) => {
            let selected_todo = state.todos.findIndex(
                (x) => x.id == action.payload.id
            );
            if (selected_todo == -1) {
                state.todos = [
                    ...state.todos,
                    {
                        id: action.payload.id,
                        text: action.payload.text,
                        due_date: action.payload.due_date,
                        done: action.payload.done,
                        priority: action.payload.priority,
                        creation_date: action.payload.creation_date,
                    },
                ];
                state.last_id++;
            } else {
                state.todos[selected_todo].text = action.payload.text;
                state.todos[selected_todo].due_date = action.payload.due_date;
                state.todos[selected_todo].done = action.payload.done;
                state.todos[selected_todo].priority = action.payload.priority;
            }
        },

        change_done: (state, action) => {
            let selected_todo = state.todos.findIndex(
                (x) => x.id == action.payload.id
            );
            if (selected_todo == -1) return;

            state.todos[selected_todo].done = action.payload.done;
        },

        remove_todo: (state, action) => {
            state.todos = state.todos.filter(
                (todo) => todo.id != action.payload
            );
        },

        edit_todo: (state, action) => {
            let selected_todo = state.todos.findIndex(
                (x) => x.id == action.payload.id
            );
            if (selected_todo == -1) return;

            state.todos[selected_todo].text = action.payload.text;
            state.todos[selected_todo].due_date = action.payload.due_date;
            state.todos[selected_todo].done = action.payload.done;
            state.todos[selected_todo].priority = action.payload.priority;
        },

        set_sort_todo: (state, action) => {
            switch (action.payload.where_clicked) {
                case "priority":
                    switch (state.current_sorting) {
                        case "priority-^":
                            state.current_sorting = "priority-v";
                            break;

                        case "priority-v":
                            state.current_sorting = "created_time";
                            break;

                        default:
                            state.current_sorting = "priority-^";
                            break;
                    }
                    break;

                case "due_date":
                    switch (state.current_sorting) {
                        case "due-date-^":
                            state.current_sorting = "due-date-v";
                            break;

                        case "due-date-v":
                            state.current_sorting = "created_time";
                            break;

                        default:
                            state.current_sorting = "due-date-^";
                            break;
                    }
            }
        },

        sort_todo: (state) => {
            const priority_order = {
                Low: 1,
                Medium: 2,
                High: 3,
            };
            switch (state.current_sorting) {
                case "priority-^":
                    state.todos.sort(
                        (a, b) =>
                            priority_order[b.priority] -
                            priority_order[a.priority]
                    );
                    break;

                case "priority-v":
                    state.todos.sort(
                        (a, b) =>
                            priority_order[a.priority] -
                            priority_order[b.priority]
                    );
                    break;

                case "due-date-^":
                    state.todos.sort((a, b) =>
                        b.due_date.localeCompare(a.due_date)
                    );
                    break;

                case "due-date-v":
                    state.todos.sort((a, b) =>
                        a.due_date.localeCompare(b.due_date)
                    );
                    break;

                default:
                    state.todos.sort((a, b) =>
                        a.creation_date.localeCompare(b.creation_date)
                    );
                    break;
            }
        },

        set_filters: (state, action) => {
            state.current_filters = {
                name: action.payload.name,
                priority: action.payload.priority,
                state: action.payload.state, // True is "1" and False is "0".
            };
        },

        refresh_filtered_todos: (state) => {
            state.filtered_todos = [...state.todos];

            // If name, filter by names.
            if (state.current_filters.name.length != 0) {
                state.filtered_todos = state.filtered_todos.filter((todo) =>
                    todo.text.includes(state.current_filters.name)
                );
            }

            // If priority != all, filter by priorities.
            if (state.current_filters.priority != "All") {
                state.filtered_todos = state.filtered_todos.filter(
                    (todo) => todo.priority === state.current_filters.priority
                );
            }

            // If state != All, filter by current state.
            if (state.current_filters.state != "All") {
                state.filtered_todos = state.filtered_todos.filter(
                    (todo) => todo.done == state.current_filters.state
                );
            }
        },
    },
});

export const {
    add_todo,
    set_todo,
    change_done,
    remove_todo,
    edit_todo,
    set_sort_todo,
    sort_todo,
    set_filters,
    refresh_filtered_todos,
} = todo_slice.actions;

export const select_todos = (state) => state.todo_list.filtered_todos;
export const select_last_index = (state) => state.todo_list.last_id;
export const select_current_sorting = (state) =>
    state.todo_list.current_sorting;

export default todo_slice.reducer;
