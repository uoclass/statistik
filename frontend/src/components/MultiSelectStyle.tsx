const DropdownIndicator = (props) => {
  return (
    <div
      {...props.innerProps}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "16px",
        height: "16px",
        marginRight: "8px",
        cursor: "pointer",
      }}
    >
      <svg width="10" height="10" viewBox="0 0 10 10">
        <path
          d="M0 3 L5 8 L10 3"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
};

// Custom multi-value container
const MultiValueContainer = ({ children, ...props }) => {
  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "#27272A",
        color: "white",
        fontSize: "0.85em",
        margin: "3px",
        padding: "2px 4px",
        alignItems: "center",
      }}
    >
      {children}
    </div>
  );
};

// Custom multi-value remove button
const MultiValueRemove = (props) => {
  return (
    <div
      {...props.innerProps}
      style={{
        paddingLeft: "6px",
        paddingRight: "2px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
      }}
    >
      <svg width="8" height="8" viewBox="0 0 8 8">
        <line
          x1="0"
          y1="0"
          x2="8"
          y2="8"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <line
          x1="0"
          y1="8"
          x2="8"
          y2="0"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
};

const customComponents = {
  IndicatorSeparator: () => null,
  DropdownIndicator,
  MultiValueContainer,
  MultiValueRemove,
};

// Styles using the style prop
const customStyles = {
  control: (base, state) => ({
    ...base,
    backgroundColor: "#dedede",
    borderRadius: "0",
    border: "0px solid black",
    boxShadow: "none",
    "&:hover": {
      border: "0px solid black",
    },
    padding: "2px",
    fontFamily: "Helvetica, Arial, sans-serif",
  }),
  menu: (base) => ({
    ...base,
    borderRadius: "0",
    border: "1px solid black",
    boxShadow: "none",
    marginTop: "2px",
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? "black"
      : state.isFocused
        ? "#f0f0f0"
        : "white",
    color: state.isSelected ? "white" : "black",
    fontFamily: "Helvetica, Arial, sans-serif",
    padding: "8px 12px",
    "&:hover": {
      backgroundColor: state.isSelected ? "black" : "#f0f0f0",
    },
  }),
  multiValue: (base) => ({
    ...base,
    borderRadius: "0",
    backgroundColor: "transparent",
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: "white",
    padding: "0",
  }),
  multiValueRemove: (base) => ({
    ...base,
    color: "white",
    "&:hover": {
      backgroundColor: "transparent",
      color: "white",
    },
  }),
  placeholder: (base) => ({
    ...base,
    color: "#888888",
  }),
  input: (base) => ({
    ...base,
    margin: "0",
    padding: "0",
  }),
};

export { customComponents, customStyles };
