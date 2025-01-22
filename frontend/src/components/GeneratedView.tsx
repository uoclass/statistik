import { useState, React } from "react";
import { FlexibleXYPlot, VerticalBarSeries } from "react-vis";

function GeneratedView(props) {
  return props.isChart ? (
    <ChartView props={props} />
  ) : (
    <ListView props={props} />
  );
}

function ListView(props) {
  return <h1>This is the list representation.</h1>;
}

function ChartView(props) {
  return (
    <FlexibleXYPlot>
      <VerticalBarSeries data={props.data} />
    </FlexibleXYPlot>
  );
}

export default GeneratedView;
