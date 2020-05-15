import React from "react";
import { FormGroup, Label, Input, CustomInput } from "reactstrap";
import * as Icon from "react-feather";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Radio from "../../@vuexy/radio/RadioVuexy";

const animatedComponents = makeAnimated();

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
    <FormGroup className="has-icon-left form-label-group position-relative">
      <Label for={props.id}>{props.label}</Label>
      <Select
        className={props.className}
        classNamePrefix={props.classNamePrefix}
        defaultValue={props.defaultValue}
        name={props.name}
        options={props.options}
        id={props.id}
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

const colourOptions = [
  { value: "ocean", label: "Ocean", color: "#00B8D9", isFixed: true },
  { value: "blue", label: "Blue", color: "#0052CC", isFixed: true },
  { value: "purple", label: "Purple", color: "#5243AA", isFixed: true },
  { value: "red", label: "Red", color: "#FF5630", isFixed: false },
  { value: "orange", label: "Orange", color: "#FF8B00", isFixed: false },
  { value: "yellow", label: "Yellow", color: "#FFC400", isFixed: false },
];

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
  return (
    <div className={props.className}>
      <Radio
        label={props.label}
        defaultChecked={props.defaultChecked}
        name={props.name}
        value={props.gender}
      />
    </div>
  );
};
