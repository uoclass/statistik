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
                            <option value="" selected disabled >Select one</option>
                            <option value="1">Tickets by requestor</option>
                            <option value="2">Tickets by diagnosis</option>
                            <option value="3">Tickets by week</option>
                            <option value="4">Tickets by building</option>
                            <option value="5">Tickets by room</option>
                        </select>
                    </p>
                </label>
            </form>
        </>
    );
}

export default ConfigurationMenu;
