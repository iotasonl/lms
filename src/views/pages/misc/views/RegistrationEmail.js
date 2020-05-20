import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Form,
  Input,
  FormGroup,
  Label,
  Button,
} from "reactstrap";
import csImg from "../../../../assets/img/icons/mail.png";
import "../../../../assets/scss/pages/coming-soon.scss";
import Countdown from "react-countdown-now";

class RegistrationEmail extends React.Component {
  render() {
    return (
      <Row className="d-flex vh-100 align-items-center justify-content-center m-0">
        <Col xl="5" md="8" className="px-md-0 px-2">
          <Card className="mb-0">
            <CardHeader className="justify-content-center">
              <h2>Verify your email</h2>
            </CardHeader>
            <CardBody className="text-center">
              <img src={csImg} alt="csImg" className="img-fluid width-150" />
              <div className="divider">
                <div className="divider-text">iOTAS</div>
              </div>
              <p className="text-left mb-2 text-center">
                Please check your email for verification link
              </p>
              <Button.Ripple block color="primary" className="btn-block">
                Home
              </Button.Ripple>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}
export default RegistrationEmail;
