import React from "react";
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
import Breadcrumbs from "../../component/breadCrumbs/BreadCrumb";

let datas,title ;

const formSchema = Yup.object().shape({
  name: Yup.string().required("This Field Is Required"),
  classID: Yup.number()
    .required("This Field Is Required"),
})
class CreateClass extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (values, { setSubmitting }) => {
    const payload = {
      ...values,
    };
    if(this.props.match.params.ClassId !== "0")
    {
      console.log("Updating Class..");
    }
    else {
      console.log("Inserting Class..");
    }
    setTimeout(() => {
      console.log(JSON.stringify(payload, null, 2));
      setSubmitting(false);
    }, 1000);
  };
  render() {
    if(this.props.match.params.ClassId === "0")
    {
      datas = {name: "", classID: ""};
      title="Create Class"
    }
    else
    {
      datas = {name: "Two", classID: "2"};
      title="Update Class"
    }
    return (
      <React.Fragment>
        <Breadcrumbs
          breadCrumbLinks={[
            { title: "Class List", link: "/class-list" },
          ]}
          breadCrumbTitle={title}
          breadCrumbParent="Master Setup"
          breadCrumbActive="Class"
        />
        <Card>
          <CardBody>
            <Formik
              initialValues={{
                name: datas.name,
                classID: datas.classID
              }}
              validationSchema={formSchema}
              onSubmit={this.handleSubmit}
            >
              {({
                  errors,
                  touched
                }) => (
                <Form>
                  <FormGroup row>
                    <Col md="6" className="my-1">
                      <Label for="name">Class Name</Label>
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
                      <Label for="classID">Class Numeric Value</Label>
                      <Field
                        type="number"
                        name="classID"
                        id="classID"
                        className={`form-control ${errors.classID &&
                        touched.classID &&
                        "is-invalid"}`}
                      />
                      {errors.classID && touched.classID ? (
                        <div className="invalid-tooltip mt-25">{errors.classID}</div>
                      ) : null}
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
export default CreateClass
