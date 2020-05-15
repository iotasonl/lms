import React, { Component } from "react";
import CreateOrganization from "./createOrganization";

class DynamicForm extends Component {

  constructor() {
    super();
  };

  render() {
    return (
      <CreateOrganization
        model={[
          {id: 1, name: "name", label: "Name", type: "text", placeholder: "Enter Name"},
          {id: 2, name: "phone", label: "Phone", type: "number", placeholder: "Enter Phone"},
          {id: 3, name: "select", label: "Select", type: "select"}
        ]}
      />
    )
  }

}

export default DynamicForm;
