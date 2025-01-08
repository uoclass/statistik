import { React, useState } from "react";
import "../App.css";
// import GeneratedView from "../components/GeneratedView";
import ConfigurationMenu from "../components/ConfigurationMenu";

// A layout defines a set of parameters
function ViewCreationPage() {
  const [config, setConfig] = useState({});
  const [data, setData] = useState({});

  return (
      // <GeneratedView config={config} data={data} />
    <>
      <ConfigurationMenu setConfig={setConfig} setData={setData} />
    </>
  );
}

export default ViewCreationPage;
