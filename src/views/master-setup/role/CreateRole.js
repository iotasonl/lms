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

let datas,title;
const formSchema = Yup.object().shape({
  name: Yup.string().required("This Field Is Required"),
})

class CreateRole extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    console.log("a", this.props);
  }
  handleSubmit = (values, { setSubmitting }) => {
    const payload = {
      ...values,
    };
    if(this.props.match.params.id !== "0")
    {
      console.log("Updating Role..");
    }
    else {
      console.log("Inserting Role..");
    }
    setTimeout(() => {
      console.log(JSON.stringify(payload, null, 2));
      setSubmitting(false);
    }, 1000);
  };

  render() {
    if(this.props.match.params.RoleId === "0")
    {
      datas = {id: "", name: ""};
      title="Create Role";
    }
    else
    {
      datas = {id: "1", name: "Admin"};
      title="Update Role"
    }
    return (
      <React.Fragment>
        <Breadcrumbs
          breadCrumbLinks={[
            { title: "Role List", link: "/role-list" },
          ]}
          breadCrumbTitle={title}
          breadCrumbParent="Master Setup"
          breadCrumbActive="Role"
        />
        <Card>
          <CardBody>
            <Formik
              initialValues={{
                name:datas.name||"",
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
                    <Col md="12" className="my-1">
                      <Label for="name">Role Name</Label>
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
export default CreateRole
