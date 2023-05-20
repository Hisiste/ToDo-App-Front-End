import { createSlice } from "@reduxjs/toolkit";

export const todo_slice = createSlice({
    name: "todo_list",
    initialState: {
        todos: [],
        last_id: 0,
        current_sorting: "created_time",
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
    },
});

export const {
    add_todo,
    change_done,
    remove_todo,
    edit_todo,
    set_sort_todo,
    sort_todo,
} = todo_slice.actions;

export const select_todos = (state) => state.todo_list.todos;
export const select_last_index = (state) => state.todo_list.last_id;
export const select_current_sorting = (state) =>
    state.todo_list.current_sorting;

export default todo_slice.reducer;
