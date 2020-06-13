import React from "react";
import Breadcrumbs from "../../component/breadCrumbs/BreadCrumb";
import {
  Card,
  CardBody,
  FormGroup,
  Button,
  Col,
  Label
} from "reactstrap"
import { Formik, Field, Form } from "formik"
import * as Yup from "yup"
import {connect} from "react-redux";
import {postData} from "../../../redux/actions/subject";
import { ToastContainer } from "react-toastify"

let datas, title;


const formSchema = Yup.object().shape({
  subject_name: Yup.string().required("This Field Is Required"),
})

class CreateSubject extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit = (values) => {
    const subject = JSON.stringify(values, null, 2);
    this.props.postData(subject);
  };

  render() {
    if(this.props.match.params.subjectId === "0")
    {
      datas = {id: "", subject_name: "", subject_nick_name: ""};
      title="Create Subject"
    }
    else
    {
      datas = {id: "1", subject_name: "Math", subject_nick_name: "Math"};
      title="Update Subject"
    }
    return (
      <React.Fragment>
        <Breadcrumbs
          breadCrumbLinks={[
            { title: "Subject List", link: "/subject-list" },
          ]}
          breadCrumbTitle={title}
          breadCrumbParent="Master Setup"
          breadCrumbActive="Subject"
        />
        <Card>
          <CardBody>
            <Formik
              initialValues={{
                subject_name: datas.subject_name,
                subject_nick_name: datas.subject_nick_name
              }}
              validationSchema={formSchema}
              onSubmit={this.handleSubmit}
            >
              {({
                  errors,
                  touched,
                }) => (
                <Form>
                  <FormGroup row>
                    <Col md="6" className="my-1">
                      <Label for="subject_name">Subject Name</Label>
                      <Field
                        name="subject_name"
                        id="subject_name"
                        className={`form-control ${errors.subject_name &&
                        touched.subject_name &&
                        "is-invalid"}`}
                      />
                      {errors.subject_name && touched.subject_name ? (
                        <div className="invalid-tooltip mt-25">{errors.subject_name}</div>
                      ) : null}
                    </Col>
                    <Col md="6" className="my-1">
                      <Label for="subject_nick_name">Subject Nick Name</Label>
                      <Field
                        name="subject_nick_name"
                        id="subject_nick_name"
                        className="form-control"
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row >
                    <Col sm="12" className="my-2">
                      <Button.Ripple
                        color="primary"
                        type="submit"
                        className="mb-1 mr-1"
                      >
                        Submit
                      </Button.Ripple>
                      <Button.Ripple
                        outline
                        color="warning"
                        type="reset"
                        className="mb-1"
                      >
                        Reset
                      </Button.Ripple>
                    </Col>
                  </FormGroup>
                </Form>
              )}
            </Formik>
          </CardBody>
        </Card>
        <ToastContainer />
      </React.Fragment>
  )
  }
}
const mapStateToProps = state => {
  return {
    app: state.subjectApp.subject
  }
}
export default connect(mapStateToProps, {
  postData
})(CreateSubject)
