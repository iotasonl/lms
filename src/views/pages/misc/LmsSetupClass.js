import React from "react";
import { Spring, animated } from "react-spring/renderprops";
import { TypeValidator } from "./InputValidation";

import {
  Card,
  CardBody,
  Button,
  Row,
  Col,
  FormGroup,
  Input,
  TabPane,
  TabContent,
} from "reactstrap";
import { Search, ArrowLeft, ArrowRight } from "react-feather";
import { textColorButtons } from "../../../components/reactstrap/buttons/ButtonsSourceCode";

class LmsSetupClass extends React.Component {
  componentDidMount() {
    const script = document.createElement("script");

    script.src = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/499416/demo.js";
    script.async = true;

    document.body.appendChild(script);
  }

  state = {
    activeStep: 1,
    activeTab: "1",
    organizationType: "",
    organizationName: "",
    organizationEmail: "",
    organizationPhone: "",
    organizationNickname: "",
    userName: "",
    toggle: true,
    validation: {
      organizationEmailValidation: {
        status: false,
        message: "",
      },
      organizationNameValidation: {
        status: false,
        message: "",
      },
      organizationPhoneValidation: {
        status: false,
        message: "",
      },
      organizationNicknameValidation: {
        status: false,
        message: "",
      },
      userNameValidation: {
        status: false,
        message: "",
      },
    },
  };

  toggle = () => this.setState((state) => ({ toggle: !state.toggle }));

  onSubmitHandler = (e) => {
    e.preventDefault();
  };

  _previousStep = () => {
    let activeStep = this.state.activeStep;
    activeStep = activeStep <= 1 ? 1 : activeStep - 1;
    this.setState({
      activeStep: activeStep,
    });
  };

  _nextStep = () => {
    let activeStep = this.state.activeStep;
    activeStep = activeStep >= 5 ? 6 : activeStep + 1;
    this.setState({
      activeStep: activeStep,
    });
  };

  onChangeHandler = (e) => {
    const { name, value, type } = e.target;
    this.setState({
      [name]: value,
    });
    const validation = TypeValidator(name, value, type);
    // console.log(validation);
    let input = validation.input;
    let validationStatus = validation.validationStatus;
    let message = validation.message;
    this.setState((prevState) => ({
      validation: {
        ...prevState.validation,
        [input]: {
          status: validationStatus,
          message: message,
        },
      },
    }));
  };

  render() {
    console.log(this.state);

    // THE NEXT BUTTON
    let nextButton = (
      <Spring
        from={{ opacity: 0 }}
        to={{ opacity: 1 }}
        config={{ duration: 800 }}
      >
        {(props) => (
          <div style={props}>
            <br />
            <br />
            <div className="d-inline-block mr-1 mb-1">
              <Button.Ripple
                className="mr-1 mb-1 btn btn-outline-primary"
                outline
                type="submit"
                color="primary"
                onClick={() => this._nextStep()}
              >
                <ArrowRight size={16} />
              </Button.Ripple>
            </div>
          </div>
        )}
      </Spring>
    );

    // CONDITION TO SHOW ACTIVE COMPONENT
    let activeComponent;
    if (this.state.activeStep === 1) {
      activeComponent = (
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
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <animated.div
                  className="d-inline-block mr-1 mb-1"
                  style={props}
                >
                  <Button.Ripple
                    className="border-primary text-primary"
                    color="flat-primary"
                    onClick={() => this._nextStep()}
                    id="school"
                    style={{ fontSize: "22px", padding: "20px 60px" }}
                  >
                    School
                  </Button.Ripple>
                </animated.div>
                <animated.div
                  className="d-inline-block mr-1 mb-1"
                  style={props}
                >
                  <Button.Ripple
                    className="border-primary text-primary"
                    color="flat-primary"
                    onClick={() => this._nextStep()}
                    id="Coaching"
                    style={{ fontSize: "22px", padding: "20px 60px" }}
                  >
                    Coaching
                  </Button.Ripple>
                </animated.div>
                <animated.div
                  className="d-inline-block mr-1 mb-1"
                  style={props}
                >
                  <Button.Ripple
                    className="border-primary text-primary"
                    color="flat-primary"
                    onClick={() => this._nextStep()}
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
      );
    } else if (this.state.activeStep === 2) {
      activeComponent = (
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
            <animated.div style={props}>
              <FormGroup className="position-relative has-icon-left mb-0">
                <Input
                  type="text"
                  placeholder="Enter School Name"
                  bsSize="lg"
                  value={this.state.organizationName}
                  name="organizationName"
                  onChange={this.onChangeHandler}
                />
                <div className="form-control-position">
                  <Search size={14} />
                </div>
              </FormGroup>
              <br />
              {this.state.validation.organizationNameValidation.status
                ? nextButton
                : ""}
            </animated.div>
          )}
        </Spring>
      );
    } else if (this.state.activeStep === 3) {
      activeComponent = (
        <div>
          <FormGroup className="position-relative has-icon-left mb-0">
            <Input
              type="email"
              placeholder="Enter School Email"
              bsSize="lg"
              name="organizationEmail"
              value={this.state.organizationEmail}
              onChange={this.onChangeHandler}
            />
            <div className="form-control-position">
              <Search size={14} />
            </div>
          </FormGroup>
          <br />
          {this.state.validation.organizationEmailValidation.status
            ? nextButton
            : ""}
        </div>
      );
    } else if (this.state.activeStep === 4) {
      activeComponent = (
        <div>
          <FormGroup className="position-relative has-icon-left mb-0">
            <Input
              type="number"
              placeholder="Enter School Contact Number"
              bsSize="lg"
              name="organizationPhone"
              value={this.state.organizationPhone}
              onChange={this.onChangeHandler}
            />
            <div className="form-control-position">
              <Search size={14} />
            </div>
          </FormGroup>
          {this.state.validation.organizationPhoneValidation.status
            ? nextButton
            : ""}
        </div>
      );
    } else if (this.state.activeStep === 5) {
      activeComponent = (
        <div>
          <FormGroup className="position-relative has-icon-left mb-0">
            <Input
              type="text"
              placeholder="Enter School Nickname"
              bsSize="lg"
              name="organizationNickname"
              value={this.state.organizationNickname}
              onChange={this.onChangeHandler}
              required
            />
            <div className="form-control-position">
              <Search size={14} />
            </div>
          </FormGroup>
          {this.state.validation.organizationNicknameValidation.status
            ? nextButton
            : ""}
        </div>
      );
    } else if (this.state.activeStep === 6) {
      activeComponent = (
        <div>
          <FormGroup className="position-relative has-icon-left mb-0">
            <Input
              type="text"
              placeholder="Enter Login Username"
              bsSize="lg"
              name="userName"
              value={this.state.userName}
              onChange={this.onChangeHandler}
            />
            <div className="form-control-position">
              <Search size={14} />
            </div>
          </FormGroup>
          {this.state.validation.userNameValidation.status ? nextButton : ""}
        </div>
      );
    }

    const toggle = this.state.toggle;
    return (
      <Row className="m-0" style={{ height: "-webkit-fill-available" }}>
        <Col sm="2" />
        <Col sm="8">
          <Card className="auth-card bg-transparent shadow-none rounded-0 mb-0 w-100">
            <CardBody className="text-center">
              {this.state.activeStep !== 1 ? (
                <Spring
                  from={{ opacity: 0 }}
                  to={{ opacity: toggle ? 1 : 0 }}
                  config={{ duration: 2000 }}
                >
                  {(props) => (
                    <div
                      style={props}
                      className="d-inline-block mr-1 mb-1 float-left"
                    >
                      <Button.Ripple
                        className="btn-icon rounded-circle"
                        outline
                        color="primary"
                        onClick={() => this._previousStep()}
                      >
                        <ArrowLeft size={16} />
                      </Button.Ripple>
                    </div>
                  )}
                </Spring>
              ) : (
                ""
              )}
              <br />
              <h1 className="font-large-2 my-1">
                Register your organization with us
              </h1>
              <br />
              <br />
              <form onSubmit={this.onSubmitHandler}>{activeComponent}</form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default LmsSetupClass;
