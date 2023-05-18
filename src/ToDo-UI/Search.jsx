import React from "react";

export function Search() {
    return (
        <div className="container mt-3" style={{ border: "2px solid black" }}>
            <div className="row">
                <div className="input-group mb-3 mt-3">
                    <span className="input-group-text" id="search-name">
                        Name
                    </span>
                    <input
                        type="text"
                        className="form-control"
                        aria-label="Name"
                        aria-describedby="search-name"
                    ></input>
                </div>
            </div>

            <div className="row">
                <div className="col-sm-7">
                    <div className="input-group mb-3 mt-3">
                        <label className="input-group-text">Priority</label>
                        <select className="form-select" id="search-priority">
                            <option defaultValue>All</option>
                            <option value="1">High</option>
                            <option value="2">Medium</option>
                            <option value="3">Low</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="row align-items-center justify-content-between">
                <div className="col-sm-7">
                    <div className="input-group mb-3 mt-3">
                        <label className="input-group-text">State</label>
                        <select className="form-select" id="search-priority">
                            <option defaultValue>All</option>
                            <option value="1">Done</option>
                            <option value="2">Undone</option>
                        </select>
                    </div>
                </div>

                <div className="col-sm-2">
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button type="button" className="btn btn-outline-dark">
                            Search
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
