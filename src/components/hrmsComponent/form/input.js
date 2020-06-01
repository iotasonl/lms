import React from "react";
import { FormGroup, Label, Input, CustomInput } from "reactstrap";
import * as Icon from "react-feather";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Radio from "../../@vuexy/radio/RadioVuexy";
import "../../../assets/scss/customCheckbox.scss";

const animatedComponents = makeAnimated();

export class CustomCheckbox extends React.Component {
  handleChange = (value) => {
    this.props.onChange(this.props.name, value);
  };
  handleBlur = () => {
    this.props.onBlur(this.props.name, true);
  };
  render() {
    return (
      <div className="d-inline-block mr-1 mb-1">
        <div className="mb-2">
          <input
            type="checkbox"
            name={this.props.name}
            id={this.props.id}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            value={this.props.value}
            className={`${this.props.className}`}
          />
          <label htmlFor={this.props.id} id="label" style={this.props.styles}>
            {this.props.title}
          </label>
        </div>
      </div>
    );
  }
}
export class FormikReactSelect extends React.Component {
  handleChange = (value) => {
    console.log("hi");
    this.props.onChange(this.props.name, value);
  };
  handleBlur = () => {
    this.props.onBlur(this.props.name, true);
  };
  render() {
    return (
      <Select
        className={`react-select ${this.props.className}`}
        classNamePrefix="react-select"
        options={this.props.options}
        isMulti={this.props.isMulti}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        value={this.props.value}
      />
    );
  }
}

export const TextInput = (props) => {
  const IconTag = Icon[props.icon];
  return (
    <FormGroup
      className="has-icon-left form-label-group position-relative"
      style={{ margin: "1.3rem 0" }}
    >
      <Input
        type={props.type}
        name={props.name}
        id={props.id}
        value={props.value}
        placeholder={props.placeholder}
        onChange={props.change}
        onBlur={props.blur}
        className={props.className}
      />
      <div className="form-control-position">
        <IconTag size={15} />
      </div>
      <Label for={props.id}>{props.placeholder}</Label>
      {props.errorDiv}
    </FormGroup>
  );
};

export const SelectInput = (props) => {
  return (
    <FormGroup>
      <Label for={props.name}>{props.label}</Label>
      <Select
        className={props.className}
        classNamePrefix={props.classNamePrefix}
        defaultValue={props.defaultValue}
        name={props.name}
        options={props.options}
        id={props.name}
        onChange={props.change}
        onBlur={props.blur}
      />
      {props.errorDiv}
    </FormGroup>
  );
};

export const FileInput = (props) => {
  return (
    <FormGroup>
      <Label for={props.id}>{props.label}</Label>
      <CustomInput
        type="file"
        id={props.id}
        name={props.name}
        onChange={props.change}
        onBlur={props.blur}
        className={props.className}
      />
      {props.errorDiv}
    </FormGroup>
  );
};

export const Textarea = (props) => {
  return (
    <div className="form-label-group mt-2">
      <Input
        type="textarea"
        name={props.name}
        id={props.name}
        rows={props.rows}
        placeholder={props.placeholder}
        className={props.className}
        value={props.value}
        onChange={props.change}
        onBlur={props.blur}
      />
      <Label>{props.placeholder}</Label>
      {props.errorDiv}
    </div>
  );
};

export const MultiSelect = (props) => {
  return (
    <FormGroup>
      <Label for={props.name}>{props.placeholder}</Label>
      <Select
        name={props.name}
        id={props.name}
        closeMenuOnSelect={false}
        components={animatedComponents}
        defaultValue={props.defaultValue}
        isMulti={true}
        options={props.options}
        classNamePrefix="select"
        onChange={props.change}
        onBlur={props.blur}
        className={props.className}
      />
      {props.errorDiv}
    </FormGroup>
  );
};

export const RadioInput = (props) => {
  const handleChange = (value) => {
    props.onChange(props.name, value);
  };
  const handleBlur = () => {
    props.onBlur(props.name, true);
  };
  return (
    <div className={props.className}>
      <Radio
        label={props.label}
        defaultChecked={props.defaultChecked}
        name={props.name}
        value={props.value}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </div>
  );
};
