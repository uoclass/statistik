/*
 * Button
 * by Alex JPS
 * 2024-03-06
 *
 * Defines a simple button component.
 */

// Packages
import React from "react";

// Styles

function Button({ text, onClick }) {
  return (
    <button className={"button"} onClick={onClick}>
      {text}
    </button>
  );
}
export default Button;
