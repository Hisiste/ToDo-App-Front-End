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
    const [new_done, set_new_done] = useState(false);
    const [new_priority, set_new_priority] = useState("Low");

    function handle_exit_modal() {
        // https://stackoverflow.com/questions/27826381/clearing-form-input-fields-in-bootstrap
        $("form").get(0).reset(); // Reset form

        set_new_text("");
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
                aria-labelledby="New To Do Window"
                aria-hidden="true"
            >
                <div
                    className="modal-dialog modal-dialog-centered"
                    role="document"
                >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5
                                className="modal-title"
                                id="exampleModalLongTitle"
                            >
                                Add a new to do
                            </h5>
                            <button
                                type="button"
                                className="close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={handle_exit_modal}
                            >
                                <span aria-hidden="true">&times;</span>
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
                                    <label htmlFor="floatingInput">ID</label>
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
                                    <label htmlFor="floatingInput">Text</label>
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">
                                        <i className="fa-regular fa-calendar"></i>
                                    </span>
                                    <div className="form-floating">
                                        <input
                                            className="form-control"
                                            id="new-todo-due-date"
                                            name="new-todo-due-date"
                                            placeholder="Due date"
                                        />
                                        <label htmlFor="floatingInput">
                                            Due Date
                                        </label>
                                    </div>
                                </div>
                                <div className="form-check mb-3">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value=""
                                        id="flexCheckDefault"
                                        onChange={(e) =>
                                            set_new_done(e.target.checked)
                                        }
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="flexCheckDefault"
                                    >
                                        Done
                                    </label>
                                </div>
                                <div className="form-floating mb-3">
                                    <select
                                        className="form-select"
                                        id="floatingSelect"
                                        aria-label="Floating label select example"
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
                                    <label htmlFor="floatingSelect">
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
                                            // Cannot update date on change. :'(
                                            due_date:
                                                document.getElementById(
                                                    "new-todo-due-date"
                                                ).value,
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
                                            id="flexCheckChecked"
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
                                        aria-label="Basic example"
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
                aria-labelledby="New To Do Window"
                aria-hidden="true"
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
                                aria-label="Close"
                                onClick={handle_exit_modal}
                            >
                                <span aria-hidden="true">&times;</span>
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
                                    <label htmlFor="floatingInput">ID</label>
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
                                    <label htmlFor="floatingInput">Text</label>
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">
                                        <i className="fa-regular fa-calendar"></i>
                                    </span>
                                    <div className="form-floating">
                                        <input
                                            className="form-control"
                                            id="edit-todo-due-date"
                                            name="edit-todo-due-date"
                                            placeholder="Due date"
                                            value={edit_due_date}
                                        />
                                        <label htmlFor="floatingInput">
                                            Due Date
                                        </label>
                                    </div>
                                </div>
                                <div className="form-check mb-3">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value=""
                                        id="flexCheckDefault"
                                        onChange={(e) =>
                                            set_edit_done(e.target.checked)
                                        }
                                        checked={edit_done}
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="flexCheckDefault"
                                    >
                                        Done
                                    </label>
                                </div>
                                <div className="form-floating mb-3">
                                    <select
                                        className="form-select"
                                        id="floatingSelect"
                                        aria-label="Floating label select example"
                                        value={edit_priority}
                                        onChange={(e) =>
                                            set_edit_priority(e.target.value)
                                        }
                                    >
                                        <option value="Low">Low</option>
                                        <option value="Medium">Medium</option>
                                        <option value="High">High</option>
                                    </select>
                                    <label htmlFor="floatingSelect">
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
                                            // Cannot update date on change. :'(
                                            due_date:
                                                document.getElementById(
                                                    "edit-todo-due-date"
                                                ).value,
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
