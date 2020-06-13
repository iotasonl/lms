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
import { connect } from "react-redux"
import {
  postData
} from "../../../redux/actions/class/"
import { ToastContainer } from "react-toastify"

let datas,title ;

const formSchema = Yup.object().shape({
  class_name: Yup.string().required("This Field Is Required"),
  class_numeric_name: Yup.number()
    .required("This Field Is Required"),
})
class CreateClass extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }
  handleSubmit = (values) => {
    let val = '{"class_name":"'+values.class_name+'","class_numeric_name":"'+values.class_numeric_name+'"}';
    // const role = JSON.stringify(values, null, 2);
    this.props.postData(val);
  };
  handleInput = (e) =>
  {
    e.target.value = e.target.value.charAt(0).toUpperCase()+e.target.value.slice(1).toLocaleLowerCase();
  }

  render() {
    if(this.props.match.params.ClassId === "0")
    {
      datas = {class_name: "", class_numeric_name: ""};
      title="Create Class"
    }
    else
    {
      datas = {class_name: "Two", class_numeric_name: "2"};
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
                class_name: datas.class_name,
                class_numeric_name: datas.class_numeric_name
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
                      <Label for="class_name">Class Name</Label>
                      <Field
                        name="class_name"
                        id="class_name"
                        onKeyUp={this.handleInput}
                        className={`form-control ${errors.class_name &&
                        touched.class_name &&
                        "is-invalid"}`}
                      />
                      {errors.class_name && touched.class_name ? (
                        <div className="invalid-tooltip mt-25">{errors.class_name}</div>
                      ) : null}
                    </Col>
                    <Col md="6" className="my-1">
                      <Label for="class_numeric_name">Class Numeric Value</Label>
                      <Field
                        type="number"
                        name="class_numeric_name"
                        id="class_numeric_name"
                        className={`form-control ${errors.class_numeric_name &&
                        touched.class_numeric_name &&
                        "is-invalid"}`}
                      />
                      {errors.class_numeric_name && touched.class_numeric_name ? (
                        <div className="invalid-tooltip mt-25">{errors.class_numeric_name}</div>
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
        <ToastContainer />
      </React.Fragment>
    )
  }
}
const mapStateToProps = state => {
  return {
    app: state.classApp.class
  }
}
export default connect(mapStateToProps, {
  postData
})(CreateClass)
