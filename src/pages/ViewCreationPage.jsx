import { React, useState } from "react";
import "../App.css";
// import GeneratedView from "../components/GeneratedView";
import ConfigurationMenu from "../components/ConfigurationMenu";

// A layout defines a set of parameters
function ViewCreationPage() {

  return (
      // <GeneratedView config={config} data={data} />
    <>
      <ConfigurationMenu />
    </>
  );
}

export default ViewCreationPage;
