import React from "react";
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb";

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

let datas, title;


const formSchema = Yup.object().shape({
  name: Yup.string().required("This Field Is Required"),
})

class CreateSubject extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit = (values, { setSubmitting }) => {
    const payload = {
      ...values,
    };
    if(this.props.match.params.subjectId !== "0")
    {
      console.log("Updating..");
    }
    else {
      console.log("Inserting..");
    }
    setTimeout(() => {
      console.log(JSON.stringify(payload, null, 2));
      setSubmitting(false);
    }, 1000);
  };

  render() {
    if(this.props.match.params.subjectId === "0")
    {
      datas = {id: "", name: "", nickname: ""};
      title="Create Subject"
    }
    else
    {
      datas = {id: "1", name: "Math", nickname: "Math"};
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
                name: datas.name,
                nickname: datas.nickname
              }}
              validationSchema={formSchema}
              onSubmit={this.handleSubmit}
            >
              {({
                  setFieldValue,
                  setFieldTouched,
                  errors,
                  touched,
                  values
                }) => (
                <Form>
                  <FormGroup row>
                    <Col md="6" className="my-1">
                      <Label for="name">Subject Name</Label>
                      <Field
                        name="name"
                        id="name"
                        className={`form-control ${errors.name &&
                        touched.name &&
                        "is-invalid"}`}
                      />
                      {errors.name && touched.name ? (
                        <div className="invalid-tooltip mt-25">{errors.name}</div>
                      ) : null}
                    </Col>
                    <Col md="6" className="my-1">
                      <Label for="name">Subject Nick Name</Label>
                      <Field
                        name="nickname"
                        id="nickname"
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
      </React.Fragment>
  )
  }
}
export default CreateSubject
