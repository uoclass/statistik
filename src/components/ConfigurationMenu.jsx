import { React } from "react";

function ConfigurationMenu(props) {
  // define filters and layout style
  // form for filters - term start, term end, requestor, building
  const { setConfig, setData } = props;

  const onSubmit = (event) => {
    event.preventDefault();
    // TODO: Do something with the config,
  };
  return (
    <>
      <h3>Create a new view</h3>

      <div class="grey-callout-box" id="report-cache-gen-time-box">
          <p>Using ticket data as of (date and time of report cache generation)</p>
          <button>Refresh</button>
      </div>

      <form onSubmit={onSubmit}>
        <label>
            <p>
                <label htmlFor="term-start">Term start</label> <br />
                <input type="date" id="term-start" />
            </p>
            <p>
                <label htmlFor="term-end">Term end</label> <br />
                <input type="date" id="term-end" />
            </p>
            <p>
                <label htmlFor="view-layout">View layout</label> <br />
                <select name="view-layout">
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
