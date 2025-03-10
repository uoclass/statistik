import Select, { Props } from "react-select";
import { customStyles, customComponents } from "./MultiSelectStyle";

export default function StyledMultiSelect<Option>(props: Props<Option>) {
  return (
    <Select
      {...props}
      isMulti
      className="basic-multi-select"
      classNamePrefix="select"
      components={customComponents}
      styles={customStyles}
    />
  );
}
