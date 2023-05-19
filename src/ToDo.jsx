import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    add_todo,
    change_done,
    remove_todo,
    edit_todo,
    select_todos,
    select_last_index,
} from "./features/todo/reducer";

export function NewToDo() {
    const my_todos = useSelector(select_todos);
    const my_last_idx = useSelector(select_last_index);

    const dispatch = useDispatch();
    const [new_text, set_new_text] = useState("");
    const [new_due_date, set_new_due_date] = useState("");
    const [new_done, set_new_done] = useState(false);
    const [new_priority, set_new_priority] = useState("Low");

    function handle_exit_modal() {
        // https://stackoverflow.com/questions/27826381/clearing-form-input-fields-in-bootstrap
        $("form").get(0).reset(); // Reset form

        set_new_text("");
        set_new_due_date("");
        set_new_done(false);
        set_new_priority("Low");
    }

    return (
        <>
            <div className="container mt-3 mb-3">
                <button
                    type="button"
                    className="btn btn-outline-dark"
                    data-bs-toggle="modal"
                    data-bs-target="#NewToDo"
                >
                    + New To Do
                </button>
            </div>

            <div
                className="modal fade"
                id="NewToDo"
                tabIndex="-1"
                role="dialog"
            >
                <div
                    className="modal-dialog modal-dialog-centered"
                    role="document"
                >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="new-modal-title">
                                Add a new to do
                            </h5>
                            <button
                                type="button"
                                className="close"
                                data-bs-dismiss="modal"
                                aria-label="Close new to do window"
                                onClick={handle_exit_modal}
                            >
                                <span>&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-floating mb-3">
                                    <input
                                        className="form-control"
                                        id="new-todo-id"
                                        value={my_last_idx + 1}
                                        disabled
                                    />
                                    <label htmlFor="new-todo-id">ID</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        className="form-control"
                                        placeholder="Text"
                                        id="new-todo-text"
                                        onChange={(e) =>
                                            set_new_text(e.target.value)
                                        }
                                    />
                                    <label htmlFor="new-todo-text">Text</label>
                                </div>
                                <div className="input-group mb-3">
                                    <div className="form-floating">
                                        <input
                                            className="form-control"
                                            type="date"
                                            id="new-todo-due-date"
                                            placeholder="Due date"
                                            onChange={(e) => {
                                                set_new_due_date(
                                                    e.target.value
                                                );
                                            }}
                                        />
                                        <label htmlFor="new-todo-due-date">
                                            Due Date
                                        </label>
                                    </div>
                                </div>
                                <div className="form-check mb-3">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="new-todo-done"
                                        onClick={(e) =>
                                            set_new_done(e.target.checked)
                                        }
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="new-todo-done"
                                    >
                                        Done
                                    </label>
                                </div>
                                <div className="form-floating mb-3">
                                    <select
                                        className="form-select"
                                        id="new-todo-priority"
                                        onChange={(e) =>
                                            set_new_priority(e.target.value)
                                        }
                                    >
                                        <option value="Low" defaultValue>
                                            Low
                                        </option>
                                        <option value="Medium">Medium</option>
                                        <option value="High">High</option>
                                    </select>
                                    <label htmlFor="new-todo-priority">
                                        Priority
                                    </label>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                                onClick={handle_exit_modal}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => {
                                    dispatch(
                                        add_todo({
                                            text: new_text,
                                            due_date: new_due_date,
                                            done: new_done,
                                            priority: new_priority,
                                            creation_date:
                                                new Date().toString(),
                                        })
                                    ),
                                        handle_exit_modal();
                                }}
                                data-bs-dismiss="modal"
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export function ListToDos() {
    const my_todos = useSelector(select_todos);
    const dispatch = useDispatch();

    const [edit_id, set_edit_id] = useState(-1);
    const [edit_text, set_edit_text] = useState("");
    const [edit_due_date, set_edit_due_date] = useState("");
    const [edit_done, set_edit_done] = useState(false);
    const [edit_priority, set_edit_priority] = useState("Low");

    function handle_open_modal(id, text, due_date, done, priority) {
        set_edit_id(id);
        set_edit_text(text);
        set_edit_due_date(due_date);
        set_edit_done(done);
        set_edit_priority(priority);
    }
    function handle_exit_modal() {
        // https://stackoverflow.com/questions/27826381/clearing-form-input-fields-in-bootstrap
        $("form").get(0).reset(); // Reset form

        set_edit_id(-1);
        set_edit_text("");
        set_edit_done(false);
        set_edit_priority("Low");
    }

    return (
        <>
            <div className="container">
                <table className="table align-middle">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Priority</th>
                            <th scope="col">Due Date</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        {my_todos.map((item) => (
                            <tr key={item.id}>
                                <th scope="row">
                                    <div className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            checked={item.done}
                                            id={"list-todo-done-" + item.id}
                                            onChange={(e) =>
                                                dispatch(
                                                    change_done({
                                                        id: item.id,
                                                        done: e.target.checked,
                                                    })
                                                )
                                            }
                                        ></input>
                                    </div>
                                </th>
                                <td>{item.text}</td>
                                <td>{item.priority}</td>
                                <td>{item.due_date}</td>
                                <td>
                                    <div
                                        className="btn-group btn-group-sm"
                                        role="group"
                                    >
                                        <button
                                            type="button"
                                            className="btn btn-outline-dark"
                                            data-bs-toggle="modal"
                                            data-bs-target="#EditToDo"
                                            onClick={() =>
                                                handle_open_modal(
                                                    item.id,
                                                    item.text,
                                                    item.due_date,
                                                    item.done,
                                                    item.priority
                                                )
                                            }
                                        >
                                            Edit
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-outline-dark"
                                            onClick={(e) =>
                                                dispatch(remove_todo(item.id))
                                            }
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div
                className="modal fade"
                id="EditToDo"
                tabIndex="-1"
                role="dialog"
            >
                <div
                    className="modal-dialog modal-dialog-centered"
                    role="document"
                >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit a to do</h5>
                            <button
                                type="button"
                                className="close"
                                data-bs-dismiss="modal"
                                aria-label="Close edit window"
                                onClick={handle_exit_modal}
                            >
                                <span>&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-floating mb-3">
                                    <input
                                        className="form-control"
                                        id="edit-todo-id"
                                        value={edit_id}
                                        disabled
                                    />
                                    <label htmlFor="edit-todo-id">ID</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        className="form-control"
                                        placeholder="Text"
                                        value={edit_text}
                                        id="edit-todo-text"
                                        onChange={(e) =>
                                            set_edit_text(e.target.value)
                                        }
                                    />
                                    <label htmlFor="edit-todo-text">Text</label>
                                </div>
                                <div className="input-group mb-3">
                                    <div className="form-floating">
                                        <input
                                            className="form-control"
                                            type="date"
                                            id="edit-todo-due-date"
                                            placeholder="Due date"
                                            value={edit_due_date}
                                            onChange={(e) => {
                                                set_edit_due_date(
                                                    e.target.value
                                                );
                                            }}
                                        />
                                        <label htmlFor="edit-todo-due-date">
                                            Due Date
                                        </label>
                                    </div>
                                </div>
                                <div className="form-check mb-3">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="edit-todo-done"
                                        onClick={(e) =>
                                            set_edit_done(e.target.checked)
                                        }
                                        checked={edit_done}
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="edit-todo-done"
                                    >
                                        Done
                                    </label>
                                </div>
                                <div className="form-floating mb-3">
                                    <select
                                        className="form-select"
                                        id="edit-todo-priority"
                                        value={edit_priority}
                                        onChange={(e) =>
                                            set_edit_priority(e.target.value)
                                        }
                                    >
                                        <option value="Low">Low</option>
                                        <option value="Medium">Medium</option>
                                        <option value="High">High</option>
                                    </select>
                                    <label htmlFor="edit-todo-priority">
                                        Priority
                                    </label>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                                onClick={handle_exit_modal}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={() => {
                                    dispatch(
                                        edit_todo({
                                            id: edit_id,
                                            text: edit_text,
                                            due_date: edit_due_date,
                                            done: edit_done,
                                            priority: edit_priority,
                                        })
                                    ),
                                        handle_exit_modal();
                                }}
                                data-bs-dismiss="modal"
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
