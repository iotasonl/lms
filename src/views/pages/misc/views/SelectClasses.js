import React from "react";
import { useFormikContext, Field } from "formik";
import { FormGroup, Row, Col } from "reactstrap";
import { animated, Spring } from "react-spring/renderprops";
import bg6 from "../../../../assets/img/backgrounds/bg-6.png";
import CustomCheckbox from "../customCheckbox";

function SelectClasses() {
  const { errors, touched } = useFormikContext();
  const imgStyle = {
    width: "100%",
    position: "fixed",
    bottom: "31px",
    left: "20px",
    zIndex: -1,
  };
  return (
    <React.Fragment>
      <Spring
        from={{
          opacity: 0,
          transform: "translate(-20px, 0px)",
        }}
        to={{
          opacity: 1,
          transform: "translate(0px, 0px)",
        }}
        config={{ duration: 600 }}
      >
        {(props) => (
          <Row>
            <Col sm="3" />
            <Col sm="6">
              <animated.div style={props}>
                <FormGroup className="position-relative mb-0">
                  <h2 style={{ color: "#928b8b" }}>
                    SELECT APPLICABLE CLASSES
                  </h2>
                  <br />
                  <CustomCheckbox
                    name="classes[]"
                    styles={{ padding: "10px 22px", fontSize: "22px" }}
                    id="1"
                    title="1"
                  />
                  <CustomCheckbox
                    name="classes[]"
                    styles={{ padding: "10px 22px", fontSize: "22px" }}
                    id="2"
                    title="2"
                  />
                  <CustomCheckbox
                    name="classes[]"
                    styles={{ padding: "10px 22px", fontSize: "22px" }}
                    id="3"
                    title="3"
                  />
                  <CustomCheckbox
                    name="classes[]"
                    styles={{ padding: "10px 22px", fontSize: "22px" }}
                    id="4"
                    title="4"
                  />
                  <CustomCheckbox
                    name="classes[]"
                    styles={{ padding: "10px 22px", fontSize: "22px" }}
                    id="5"
                    title="5"
                  />
                  <CustomCheckbox
                    name="classes[]"
                    styles={{ padding: "10px 22px", fontSize: "22px" }}
                    id="6"
                    title="6"
                  />
                  <CustomCheckbox
                    name="classes[]"
                    styles={{ padding: "10px 22px", fontSize: "22px" }}
                    id="7"
                    title="7"
                  />
                  <small style={{ color: "red" }}>
                    {touched.organizationEmail && errors.organizationEmail}
                  </small>
                </FormGroup>
                <br />
              </animated.div>
            </Col>
          </Row>
        )}
      </Spring>
      <Spring
        from={{
          opacity: 0,
          width: "79%",
        }}
        to={{
          opacity: 1,
          width: "80%",
        }}
        config={{ duration: 600 }}
      >
        {(bgStyle) => <img src={bg6} style={{ ...imgStyle, ...bgStyle }} />}
      </Spring>
    </React.Fragment>
  );
}

export default SelectClasses;
