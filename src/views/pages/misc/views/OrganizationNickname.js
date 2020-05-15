import React from "react";
import { useFormikContext, Field } from "formik";
import { FormGroup, Row, Col } from "reactstrap";
import { animated, Spring } from "react-spring/renderprops";
import bg3 from "../../../../assets/img/backgrounds/bg-3.png";

function OrganizationNickname() {
  const { errors, touched } = useFormikContext();
  const imgStyle = {
    width: "30%",
    position: "fixed",
    bottom: "31px",
    right: "20px",
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
                    CHOOSE A NICKNAME FOR YOUR ORGANIZATION.
                  </h2>
                  <br />
                  <Field
                    className="form-control custom-input"
                    name="organizationNickname"
                    placeholder="Enter Nickname"
                    id="organizationNickname"
                  />
                  <small style={{ color: "red" }}>
                    {touched.organizationNickname &&
                      errors.organizationNickname}
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
          width: "27%",
        }}
        to={{
          opacity: 1,
          width: "28%",
        }}
        config={{ duration: 600 }}
      >
        {(bgStyle) => <img src={bg3} style={{ ...imgStyle, ...bgStyle }} />}
      </Spring>
    </React.Fragment>
  );
}

export default OrganizationNickname;
