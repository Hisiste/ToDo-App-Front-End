import { useState } from "react";
import { get_average_time_function } from "../api/axios_methods";

function write_average_time(prefix, time) {
    return (
        <>
            <p>{prefix}</p>
            <p>{time}</p>
        </>
    );
}

export function Average() {
    const get_av_time_api = get_average_time_function();

    const [time_all, set_time_all] = useState("");
    const [time_low, set_time_low] = useState("");
    const [time_med, set_time_med] = useState("");
    const [time_high, set_time_high] = useState("");

    get_av_time_api(set_time_all, "All");
    get_av_time_api(set_time_low, "Low");
    get_av_time_api(set_time_med, "Medium");
    get_av_time_api(set_time_high, "High");

    return (
        <div
            className="container mt-3 mb-3"
            style={{
                border: "2px solid black",
                textAlign: "center",
                padding: "15px",
            }}
        >
            <div className="row">
                {write_average_time("Average time to finish tasks:", time_all)}
            </div>

            <div className="row">
                <div className="col">
                    {write_average_time("Low Priority:", time_low)}
                </div>
                <div className="col">
                    {write_average_time("Medium Priority:", time_med)}
                </div>
                <div className="col">
                    {write_average_time("High Priority:", time_high)}
                </div>
            </div>
        </div>
    );
}
