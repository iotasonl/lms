import { useFormikContext } from "formik";
import React from "react";
import { Button, TabContent, TabPane } from "reactstrap";
import { animated, Spring } from "react-spring/renderprops";
import { textColorButtons } from "../../../../components/reactstrap/buttons/ButtonsSourceCode";
import bg3 from "../../../../assets/img/backgrounds/bg-3.png";

function OrganizationType() {
  const { errors, touched } = useFormikContext();
  const imgStyle = {
    width: "30%",
    position: "fixed",
    bottom: "31px",
    left: "15px",
  };
  return (
    <React.Fragment>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Spring
        from={{
          opacity: 0.3,
          transform: "translate(-20px, 0px)",
        }}
        to={{
          opacity: 1,
          transform: "translate(0px, 0px)",
        }}
        config={{ duration: 600 }}
      >
        {(props) => (
          <TabContent activeTab="1" style={props}>
            <TabPane tabId="1">
              <animated.h2 style={{ color: "#928b8b" }}>
                WHAT IS YOUR ORGANIZATION TYPE?
              </animated.h2>
              <br />
              <animated.div className="d-inline-block mr-1 mb-1" style={props}>
                <Button.Ripple
                  className="border-primary text-primary"
                  color="flat-primary"
                  id="school"
                  style={{ fontSize: "22px", padding: "20px 60px" }}
                >
                  School
                </Button.Ripple>
              </animated.div>
              <animated.div className="d-inline-block mr-1 mb-1" style={props}>
                <Button.Ripple
                  className="border-primary text-primary"
                  color="flat-primary"
                  id="Coaching"
                  style={{ fontSize: "22px", padding: "20px 60px" }}
                >
                  Coaching
                </Button.Ripple>
              </animated.div>
              <animated.div className="d-inline-block mr-1 mb-1" style={props}>
                <Button.Ripple
                  className="border-primary text-primary"
                  color="flat-primary"
                  id="Organization"
                  style={{ fontSize: "22px", padding: "20px 60px" }}
                >
                  Organization
                </Button.Ripple>
              </animated.div>
            </TabPane>
            <TabPane className="component-code" tabId="2">
              {textColorButtons}
            </TabPane>
          </TabContent>
        )}
      </Spring>
      <Spring
        from={{
          opacity: 0,
          width: "29%",
        }}
        to={{
          opacity: 1,
          width: "30%",
        }}
        config={{ duration: 600 }}
      >
        {(bgStyle) => <img src={bg3} style={{ ...imgStyle, ...bgStyle }} />}
      </Spring>
    </React.Fragment>
  );
}

export default OrganizationType;
