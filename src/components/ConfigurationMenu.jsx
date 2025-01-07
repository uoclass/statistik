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
      <h3>Select a filter</h3>
      <form onSubmit={onSubmit}>
        <label>
          Term start
          <input type="checkbox" />
        </label>
      </form>
    </>
  );
}

export default ConfigurationMenu;
