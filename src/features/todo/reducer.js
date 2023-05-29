import { createSlice } from "@reduxjs/toolkit";

export const todo_slice = createSlice({
    name: "todo_list",
    initialState: {
        last_id: 0,
        todos: [],

        current_sorting: "Id/ASC",

        filtered_todos: [],
        current_filters: {
            name: "",
            priority: "All",
            state: "All",
        },
    },

    reducers: {
        set_last_id: (state, action) => {
            state.last_id = action.payload.id;
        },

        add_todo: (state, action) => {
            state.todos = [
                ...state.todos,
                {
                    id: ++state.last_id,
                    text: action.payload.text,
                    due_date: action.payload.due_date,
                    done: false,
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
            state.todos[selected_todo].priority = action.payload.priority;
        },

        set_sort_todo: (state, action) => {
            switch (action.payload.where_clicked) {
                case "priority":
                    switch (state.current_sorting) {
                        case "Priority/DESC":
                            state.current_sorting = "Priority/ASC";
                            break;

                        case "Priority/ASC":
                            state.current_sorting = "Id/ASC";
                            break;

                        default:
                            state.current_sorting = "Priority/DESC";
                            break;
                    }
                    break;

                case "due_date":
                    switch (state.current_sorting) {
                        case "DueDate/DESC":
                            state.current_sorting = "DueDate/ASC";
                            break;

                        case "DueDate/ASC":
                            state.current_sorting = "Id/ASC";
                            break;

                        default:
                            state.current_sorting = "DueDate/DESC";
                            break;
                    }
            }
        },

        set_filters: (state, action) => {
            state.current_filters = {
                name: action.payload.name,
                priority: action.payload.priority,
                state: action.payload.state,
            };
        },
    },
});

export const {
    set_last_id,
    add_todo,
    set_todo,
    change_done,
    remove_todo,
    edit_todo,
    set_sort_todo,
    set_filters,
} = todo_slice.actions;

export const select_todos = (state) => state.todo_list.todos;
export const select_last_index = (state) => state.todo_list.last_id;
export const select_current_sorting = (state) =>
    state.todo_list.current_sorting;
export const select_current_filters = (state) =>
    state.todo_list.current_filters;

export default todo_slice.reducer;
