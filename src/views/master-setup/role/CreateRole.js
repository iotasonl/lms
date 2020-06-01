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
import { connect } from "react-redux"
import {
  postData, getData
} from "../../../redux/actions/role/"

let datas,title;
const formSchema = Yup.object().shape({
  role_name: Yup.string().required("This Field Is Required"),
})

class CreateRole extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    console.log("a", this.props.match.params);
  }
  handleSubmit = (values) => {
    const role = JSON.stringify(values, null, 2);
    this.props.postData(role);
    
    // const payload = {
    //   ...values,
    // };
    // if (this.props.match.params.roleId !== "0")
    // {
    //   console.log("Updating Role..");
    // }
    // else {
    //   console.log("Inserting Role..");
    // }
    // setTimeout(() => {
    //   console.log(JSON.stringify(payload, null, 2));
    //   setSubmitting(false);
    // }, 1000);
  };

  render() {
    if(this.props.match.params.roleId === "0")
    {
      datas = {id: "", role_name: ""};
      title="Create Role";
    }
    else
    {
      datas = {id: "1", role_name: "Admin"};
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
                role_name:datas.role_name||"",
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
                        name="role_name"
                        id="role_name"
                        className={`form-control ${errors.role_name &&
                        touched.role_name &&
                        "is-invalid"}`}
                      />
                      {errors.role_name && touched.role_name ? (
                          <div className="invalid-tooltip mt-25">{errors.role_name}</div>
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
// export default CreateRole
const mapStateToProps = state => {
  // console.log("state", state.roleApp.role)
  return {
    app: state.roleApp.role
  }
}
export default connect(mapStateToProps, {
  postData
})(CreateRole)