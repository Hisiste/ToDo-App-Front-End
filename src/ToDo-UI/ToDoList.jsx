import React from "react";

export function ToDoList() {
    const todos = [
        {
            id: 1,
            text: "Finish homework.",
            due_date: "2023/05/29",
            done: false,
            priority: "high",
            creation_date: "2023/05/11",
        },
    ];

    return (
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
                    {todos.map((item) => (
                        <tr>
                            <th scope="row">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        value={item.done ? "checked" : ""}
                                        id="flexCheckChecked"
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
                                    >
                                        Edit
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-outline-dark"
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
    );
}
