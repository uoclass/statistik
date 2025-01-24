import { React, useState } from "react";

// import GeneratedView from "../components/GeneratedView";
import ReportCacheStatusCallout from "../components/ReportCacheStatusCallout";
import ViewCreationForm from "../components/ViewCreationForm";

// A layout defines a set of parameters
function ViewCreationPage() {
  return (
    // <GeneratedView config={config} data={data} />
    <>
        <h3>Create a new view</h3>
        <ReportCacheStatusCallout />
        <ViewCreationForm />
    </>
  );
}

export default ViewCreationPage;
