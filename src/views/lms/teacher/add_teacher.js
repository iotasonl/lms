import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  FormGroup,
  Label,
  Row,
} from "reactstrap";
import { Form, Field, Formik } from "formik";
import * as Yup from "yup";
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Select from "react-select";
import { FormikReactSelect } from "../../../components/hrmsComponent/form/input";

const formSchema = Yup.object().shape({
  gender: Yup.object()
    .shape({
      label: Yup.string().required(),
      value: Yup.string().required(),
    })
    .nullable()
    .required("Gender is required!"),
  phone: Yup.number()
    .required("Teacher's name is required")
    .min(4, "Too Short"),
  name: Yup.string().required("Required").min(4, "Too Short"),
  email: Yup.string().email("Invalid email").required("Required"),
});

class AddTeacher extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (values, { setSubmitting }) => {
    const payload = {
      ...values,
      gender: values.gender.value,
    };
    setTimeout(() => {
      console.log(JSON.stringify(payload, null, 2));
      setSubmitting(false);
    }, 1000);
  };

  handleChange = (value) => {
    console.log("hi");
    this.props.onChange(this.props.name, value);
  };
  handleBlur = () => {
    this.props.onBlur(this.props.name, true);
  };

  render() {
    return (
      <React.Fragment>
        <Breadcrumbs
          breadCrumbTitle="Create Teacher"
          breadCrumbParent="Teacher"
          breadCrumbActive="Create Teacher"
        />
        <Row>
          <Col lg="12" md="12">
            <Card>
              <CardHeader>
                <CardTitle>Teacher Registration</CardTitle>
              </CardHeader>
              <CardBody>
                <Formik
                  initialValues={{
                    first_name: "",
                    last_name: "",
                    username: "",
                    password: "",
                    father_name: "",
                    email: "",
                    phone: "",
                    alt_phone: "",
                    gender: null,
                    dob: "",
                    address: "",
                    state: "",
                    city: "",
                    pincode: "",
                    profile_pic: undefined,

                    experience: "",
                    qualification: "",
                    doj: "",
                    aadhar: "",
                    pan_card: "",

                    class: "",
                    subject: "",
                  }}
                  validationSchema={formSchema}
                  onSubmit={this.handleSubmit}
                >
                  {({
                    handleSubmit,
                    setFieldValue,
                    setFieldTouched,
                    handleChange,
                    handleBlur,
                    values,
                    errors,
                    touched,
                    isSubmitting,
                  }) => (
                    <Form>
                      <div className="row">
                        <FormGroup className="col-md-3 col-sm-3">
                          <Label for="first_name">First Name</Label>
                          <Field
                            name="first_name"
                            id="first_name"
                            className={`form-control ${
                              errors.first_name &&
                              touched.first_name &&
                              "is-invalid"
                            }`}
                          />
                          {errors.first_name && touched.first_name ? (
                            <div className="invalid-tooltip mt-25">
                              {errors.first_name}
                            </div>
                          ) : null}
                        </FormGroup>

                        <FormGroup className="col-md-3 col-sm-3">
                          <Label for="last_name">Last Name</Label>
                          <Field
                            name="last_name"
                            id="last_name"
                            className={`form-control ${
                              errors.last_name &&
                              touched.last_name &&
                              "is-invalid"
                            }`}
                          />
                          {errors.last_name && touched.last_name ? (
                            <div className="invalid-tooltip mt-25">
                              {errors.last_name}
                            </div>
                          ) : null}
                        </FormGroup>

                        <FormGroup className="col-md-3 col-sm-3">
                          <Label for="father_name">Father Name</Label>
                          <Field
                            name="father_name"
                            id="father_name"
                            className={`form-control ${
                              errors.father_name &&
                              touched.father_name &&
                              "is-invalid"
                            }`}
                          />
                          {errors.father_name && touched.father_name ? (
                            <div className="invalid-tooltip mt-25">
                              {errors.father_name}
                            </div>
                          ) : null}
                        </FormGroup>

                        <FormGroup className="col-md-3 col-sm-3">
                          <Label for="email">Email ID</Label>
                          <Field
                            name="email"
                            id="email"
                            className={`form-control ${
                              errors.email && touched.email && "is-invalid"
                            }`}
                          />
                          {errors.email && touched.email ? (
                            <div className="invalid-tooltip mt-25">
                              {errors.email}
                            </div>
                          ) : null}
                        </FormGroup>

                        <FormGroup className="col-md-3 col-sm-3">
                          <Label for="phone">Phone Number</Label>
                          <Field
                            name="phone"
                            id="phone"
                            className={`form-control ${
                              errors.phone && touched.phone && "is-invalid"
                            }`}
                          />
                          {errors.phone && touched.phone ? (
                            <div className="invalid-tooltip mt-25">
                              {errors.phone}
                            </div>
                          ) : null}
                        </FormGroup>

                        <FormGroup className="col-md-3 col-sm-3">
                          <Label for="alt_phone">Alternate Phone Number</Label>
                          <Field
                            name="alt_phone"
                            id="alt_phone"
                            className={`form-control ${
                              errors.alt_phone &&
                              touched.alt_phone &&
                              "is-invalid"
                            }`}
                          />
                          {errors.alt_phone && touched.alt_phone ? (
                            <div className="invalid-tooltip mt-25">
                              {errors.alt_phone}
                            </div>
                          ) : null}
                        </FormGroup>

                        <FormGroup className="col-md-3 col-sm-3">
                          <Label for="gender">Gender</Label>
                          <FormikReactSelect
                            className={`react-select ${
                              errors.gender && touched.gender && "is-invalid"
                            }`}
                            name="gender"
                            id="gender"
                            value={values.gender}
                            options={[
                              { value: "Male", label: "Male" },
                              { value: "Female", label: "Female" },
                            ]}
                            onChange={setFieldValue}
                            onBlur={setFieldTouched}
                          />
                          {errors.gender && touched.gender ? (
                            <div className="invalid-tooltip mt-25">
                              {errors.gender}
                            </div>
                          ) : null}
                        </FormGroup>
                      </div>
                      <Button.Ripple color="primary" type="submit">
                        Submit
                      </Button.Ripple>
                    </Form>
                  )}
                </Formik>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}
export default AddTeacher;
