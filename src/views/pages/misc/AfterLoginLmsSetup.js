import React from "react";
import FormikWizard from "formik-wizard";
import { Button, Card, CardBody, Col, Row } from "reactstrap";
import { ArrowLeft, ArrowRight } from "react-feather";
import { Spring } from "react-spring/renderprops";
import steps from "./afterLoginSteps";

const FormWrapper = ({
  children,
  isLastStep,
  status,
  goToPreviousStep,
  canGoBack,
  actionLabel,
}) => {
  return (
    <div>
      {status && (
        <div>
          {status.message}
          <hr />
        </div>
      )}
      <Row className="m-0" style={{ height: "-webkit-fill-available" }}>
        <Col sm="12">
          <Card className="auth-card bg-transparent shadow-none rounded-0 mb-0 w-100">
            <CardBody className="text-center">
              <Spring
                from={{ opacity: 0 }}
                to={{ opacity: 1 }}
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
                      onClick={goToPreviousStep}
                      disabled={!canGoBack}
                    >
                      <ArrowLeft size={16} />
                    </Button.Ripple>
                  </div>
                )}
              </Spring>
              <br />
              <br />
              <br />
              {children}
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
                      >
                        {actionLabel || (isLastStep ? "Submit" : "Next step")}
                        <ArrowRight size={16} />
                      </Button.Ripple>
                    </div>
                  </div>
                )}
              </Spring>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

const AfterLoginLmsSetup = () => {
  const handleSubmit = React.useCallback((values) => {
    console.log("full values:", values);

    return {
      message: "Thanks for submitting!",
    };
  }, []);

  return (
    <FormikWizard steps={steps} onSubmit={handleSubmit} render={FormWrapper} />
  );
};

export default AfterLoginLmsSetup;
