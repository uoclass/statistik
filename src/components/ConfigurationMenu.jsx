import {React} from "react";
import ReportCacheStatusCallout   from "./ReportCacheStatusCallout";
import "./FormElements.css"


function ConfigurationMenu() {
    // define filters and layout style
    // form for filters - term start, term end, requestor, building

    const onSubmit = (event) => {
        event.preventDefault();
        // TODO: Do something with the config,
    };
    return (
        <>
            <h3>Create a new view</h3>

            <ReportCacheStatusCallout />

            <form onSubmit={onSubmit}>
                <label>
                    <p>
                        <label htmlFor="term-start">Term start</label> <br/>
                        <input className="form-input-date" type="date" id="term-start"/>
                    </p>
                    <p>
                        <label htmlFor="term-end">Term end</label> <br/>
                        <input className="form-input-date" type="date" id="term-end"/>
                    </p>
                    <p>
                        <label htmlFor="view-layout">View layout</label> <br/>
                        <select className={"form-select"} name="view-layout">
                            <option>Tickets by requestor</option>
                            <option>Tickets by diagnosis</option>
                            <option>Tickets by week</option>
                            <option>Tickets by building</option>
                            <option>Tickets by room</option>
                        </select>
                    </p>
                </label>
            </form>
        </>
    );
}

export default ConfigurationMenu;
