import { object, string } from "yup";

import OrganizationName from "./views/OrganizationName";
import OrganizationType from "./views/OrganizationType";
import OrganizationEmail from "./views/OrganizationEmail";
import OrganizationNickname from "./views/OrganizationNickname";
import Username from "./views/Username";

import Summary from "./views/Summary";

export default [
  {
    id: "organizationType",
    component: OrganizationType,
    initialValues: {
      userName: "",
    },
    validationSchema: object().shape({}),
    actionLabel: "Next",
  },
  {
    id: "organizationName",
    component: OrganizationName,
    initialValues: {
      organizationName: "",
    },
    validationSchema: object().shape({
      organizationName: string().required("You have to fill it"),
    }),
    actionLabel: "Next",
    onAction: (sectionValues, formValues) => {
      if (sectionValues.companyName === "argh!") {
        throw new Error("Please, choose a better name!");
      }
    },
  },
  {
    id: "organizationEmail",
    component: OrganizationEmail,
    initialValues: {
      organizationEmail: "",
    },
    validationSchema: object().shape({
      organizationEmail: string()
        .required("This field is required")
        .email("Enter a valid email address"),
    }),
    actionLabel: "Next",
    onAction: (sectionValues, formValues) => {
      if (sectionValues.companyName === "argh!") {
        throw new Error("Please, choose a better name!");
      }
    },
  },
  {
    id: "organizationNickname",
    component: OrganizationNickname,
    initialValues: {
      organizationNickname: "",
    },
    validationSchema: object().shape({
      organizationNickname: string().required(),
    }),
    actionLabel: "Next",
    onAction: (sectionValues, formValues) => {
      if (sectionValues.companyName === "argh!") {
        throw new Error("Please, choose a better name!");
      }
    },
  },
  {
    id: "username",
    component: Username,
    initialValues: {
      username: "",
    },
    validationSchema: object().shape({
      username: string().required(),
    }),
    actionLabel: "Next",
    onAction: (sectionValues, formValues) => {
      if (sectionValues.companyName === "argh!") {
        throw new Error("Please, choose a better name!");
      }
    },
  },
  {
    id: "summary",
    component: Summary,
  },
];
