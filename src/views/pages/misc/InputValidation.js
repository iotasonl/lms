import validator from "validator/es";

export const TypeValidator = (name, value, type) => {
  if (type === "email") {
    let isEmpty = validator.isEmpty(value);
    if (isEmpty == false) {
      let emailValidation = validator.isEmail(value);
      if (emailValidation) {
        return {
          input: name + "Validation",
          validationStatus: emailValidation,
          message: "",
        };
      } else {
        return {
          input: name + "Validation",
          validationStatus: emailValidation,
          message: "Opps... wrong email",
        };
      }
    } else {
      return {
        input: name + "Validation",
        validationStatus: false,
        message: "Email address is required",
      };
    }
  } else if (type === "text") {
    let isEmpty = validator.isEmpty(value);
    if (isEmpty == false) {
      let minLength = validator.isLength(value, { min: 4 });
      if (minLength) {
        return {
          input: name + "Validation",
          validationStatus: minLength,
          message: "",
        };
      } else {
        return {
          input: name + "Validation",
          validationStatus: minLength,
          message: "should must be greater then 3 digits",
        };
      }
    } else {
      return {
        input: name + "Validation",
        validationStatus: false,
        message: "is required",
      };
    }
  } else if (type === "number") {
    let isNumeric = validator.isNumeric(value);
    if (isNumeric) {
      let isEmpty = validator.isEmpty(value);
      if (isEmpty == false) {
        let minLength = validator.isLength(value, { min: 10, max: 10 });
        if (minLength) {
          return {
            input: name + "Validation",
            validationStatus: minLength,
            message: "",
          };
        } else {
          return {
            input: name + "Validation",
            validationStatus: minLength,
            message: "Enter a valid phone number",
          };
        }
      } else {
        return {
          input: name + "Validation",
          validationStatus: isEmpty,
          message: "is required",
        };
      }
    } else {
      return {
        input: name + "Validation",
        validationStatus: isNumeric,
        message: "Enter a valid phone number",
      };
    }
  }
};
