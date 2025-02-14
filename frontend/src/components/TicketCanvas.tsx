import * as Plot from "@observablehq/plot";
import { createElement as h } from "react";

export default function TicketCanvas({ options }) {
  return Plot.plot({ ...options, document: new Document() }).toHyperScript();
}
