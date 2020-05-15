import React from "react";
import "../../../assets/scss/customCheckbox.scss";

const CustomCheckbox = (props) => {
  return (
    <div className="d-inline-block mr-1 mb-1">
      <div className="mb-2">
        <input type="checkbox" name={props.name} id={props.id} />
        <label htmlFor={props.id} id="label" style={props.styles}>
          {props.title}
        </label>
      </div>
    </div>
  );
};

export default CustomCheckbox;
