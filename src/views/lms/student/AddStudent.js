import React from "react";
import { Button, Card, CardBody, Col, FormGroup, Label, Row } from "reactstrap";
import { Form, Field, Formik } from "formik";
import * as Yup from "yup";
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb";
import "react-toastify/dist/ReactToastify.css";
import {
  FormikReactSelect,
  RadioInput,
} from "../../../components/hrmsComponent/form/input";
import Flatpickr from "react-flatpickr";

const formSchema = Yup.object().shape({
  first_name: Yup.string().required("First Name is required"),
  last_name: Yup.string().required("Last Name is required"),
  username: Yup.string().required("Username is required").min("4", "Too Short"),
  phone: Yup.number()
    .required("Teacher's name is required")
    .min(4, "Too Short"),
  email: Yup.string().email("Invalid email").required("Required"),
  studentClass: Yup.object()
    .shape({
      label: Yup.string().required(),
      value: Yup.string().required(),
    })
    .nullable()
    .required("Class is required!"),
  gender: Yup.string().required("A radio option is required"),
  state: Yup.object()
    .shape({
      label: Yup.string().required(),
      value: Yup.string().required(),
    })
    .nullable()
    .required("State is required!"),
  address: Yup.string().required("Address is required"),
  pin: Yup.string()
    .required("Pin Code is required")
    .min("6", "Enter a valid Pin Code")
    .max("6", "Enter a valid Pin Code"),
});

class AddStudent extends React.Component {
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
    this.props.onChange(this.props.name, value);
    console.log(value.target.value);
  };
  handleBlur = () => {
    this.props.onBlur(this.props.name, true);
  };

  parentPhone = 9876543210;
  render() {
    return (
      <React.Fragment>
        <Breadcrumbs
          breadCrumbLinks={[
            { title: "Bulk Upload", link: "/student/student-bulk-upload" },
          ]}
          breadCrumbTitle="Add Student"
          breadCrumbParent="Student"
          breadCrumbActive="Add Student"
        />
        <Row>
          <Col lg="12" md="12">
            <Card>
              <CardBody>
                <Formik
                  initialValues={{
                    first_name: "",
                    last_name: "",
                    username: "",
                    email: "",
                    phone: "",
                    studentClass: null,
                    gender: "",
                    dob: "",
                    address: "",
                    state: null,
                    city: "",
                    pin: "",
                    profile_pic: undefined,
                    father_name: "",
                    guardian_name: "",
                    guardian_phone: "",
                    guardian_email: "",
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
                        {/*FIRST NAME*/}
                        <FormGroup className="col-md-3 col-sm-3">
                          <Label for="first_name">First Name</Label>
                          <Field
                            name="first_name"
                            id="first_name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.first_name}
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
                        {/*LAST NAME*/}
                        <FormGroup className="col-md-3 col-sm-3">
                          <Label for="last_name">Last Name</Label>
                          <Field
                            name="last_name"
                            id="last_name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.last_name}
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
                        {/*USERNAME*/}
                        <FormGroup className="col-md-3 col-sm-3">
                          <Label for="username">Username</Label>
                          <Field
                            name="username"
                            id="username"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.username}
                            className={`form-control ${
                              errors.username &&
                              touched.username &&
                              "is-invalid"
                            }`}
                          />
                          {errors.username && touched.username ? (
                            <div className="invalid-tooltip mt-25">
                              {errors.username}
                            </div>
                          ) : null}
                        </FormGroup>
                        {/*EMAIL*/}
                        <FormGroup className="col-md-3 col-sm-3">
                          <Label for="email">Email</Label>
                          <Field
                            type="email"
                            name="email"
                            id="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
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
                        {/*PHONE NUMBER*/}
                        <FormGroup className="col-md-3 col-sm-3">
                          <Label for="phone">Phone Number</Label>
                          <Field
                            name="phone"
                            id="phone"
                            type="number"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.phone}
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
                        {/*STUDENT CLASS*/}
                        <FormGroup className="col-md-3 col-sm-3">
                          <Label for="gender">Class</Label>
                          <FormikReactSelect
                            className={`react-select ${
                              errors.class && touched.class && "is-invalid"
                            }`}
                            name="class"
                            id="class"
                            value={values.class}
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
                        {/*GENDER*/}
                        <FormGroup className="col-md-3 col-sm-3">
                          <Label for="gender">Gender</Label>
                          <br />
                          <div
                            style={{
                              border: "1px solid #ddd",
                              borderRadius: "5px",
                              padding: "5px 20px 5px 8px",
                            }}
                          >
                            <RadioInput
                              label="Male"
                              defaultChecked={false}
                              name="gender"
                              value="1"
                              className="d-inline-block mr-1"
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <RadioInput
                              label="Female"
                              defaultChecked={false}
                              name="gender"
                              value="2"
                              className="d-inline-block mr-1"
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                          {errors.gender && touched.gender ? (
                            <div className="invalid-tooltip mt-25">
                              {errors.gender}
                            </div>
                          ) : null}
                        </FormGroup>
                        {/*DOB*/}
                        <FormGroup className="col-md-3 col-sm-3">
                          <Label for="studentClass">Date of Birth</Label>
                          <Flatpickr
                            name="dob"
                            className="form-control"
                            value={new Date()}
                            options={{
                              altInput: true,
                              altFormat: "F j, Y",
                              dateFormat: "Y-m-d",
                            }}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </FormGroup>
                        {/*STATE*/}
                        <FormGroup className="col-md-3 col-sm-3">
                          <Label for="studentClass">State</Label>
                          <FormikReactSelect
                            className={`${
                              errors.state && touched.state && "is-invalid"
                            }`}
                            name="state"
                            id="state"
                            value={values.state}
                            options={[
                              { value: "Jharkhand", label: "1" },
                              { value: "Bihar", label: "3" },
                            ]}
                            onChange={setFieldValue}
                            onBlur={setFieldTouched}
                          />
                          {errors.state && touched.state ? (
                            <div className="invalid-tooltip mt-25">
                              {errors.state}
                            </div>
                          ) : null}
                        </FormGroup>
                        {/*CITY*/}
                        <FormGroup className="col-md-3 col-sm-3">
                          <Label for="city">City</Label>
                          <Field
                            name="city"
                            id="city"
                            value={values.city}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`form-control ${
                              errors.city && touched.city && "is-invalid"
                            }`}
                          />
                          {errors.city && touched.city ? (
                            <div className="invalid-tooltip mt-25">
                              {errors.city}
                            </div>
                          ) : null}
                        </FormGroup>
                        {/*ADDRESS*/}
                        <FormGroup className="col-md-3 col-sm-3">
                          <Label for="address">Address</Label>
                          <Field
                            component="textarea"
                            rows="1"
                            name="address"
                            id="address"
                            value={values.address}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`form-control ${
                              errors.address && touched.address && "is-invalid"
                            }`}
                          />
                          {errors.address && touched.address ? (
                            <div className="invalid-tooltip mt-25">
                              {errors.address}
                            </div>
                          ) : null}
                        </FormGroup>
                        {/*PIN CODE*/}
                        <FormGroup className="col-md-3 col-sm-3">
                          <Label for="pin">Pin Code</Label>
                          <Field
                            type="number"
                            name="pin"
                            id="pin"
                            value={values.pin}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`form-control ${
                              errors.pin && touched.pin && "is-invalid"
                            }`}
                          />
                          {errors.pin && touched.pin ? (
                            <div className="invalid-tooltip mt-25">
                              {errors.pin}
                            </div>
                          ) : null}
                        </FormGroup>
                      </div>
                      <div className="row">
                        {/*GUARDIAN PHONE*/}
                        <FormGroup className="col-md-6 col-sm-6">
                          <Label for="phone">Guardian's Phone Number</Label>
                          <Field
                            name="guardian_phone"
                            id="guardian_phone"
                            className={`form-control ${
                              errors.guardian_phone &&
                              touched.guardian_phone &&
                              "is-invalid"
                            }`}
                          />
                          {errors.guardian_phone && touched.guardian_phone ? (
                            <div className="invalid-tooltip mt-25">
                              {errors.guardian_phone}
                            </div>
                          ) : null}
                        </FormGroup>
                        {/*GUARDIAN NAME*/}
                        <FormGroup className="col-md-3 col-sm-3">
                          <Label for="first_name">Guardian's Name</Label>
                          <Field
                            name="guardian_name"
                            id="guardian_name"
                            className={`form-control ${
                              errors.guardian_name &&
                              touched.guardian_name &&
                              "is-invalid"
                            }`}
                          />
                          {errors.guardian_name && touched.guardian_name ? (
                            <div className="invalid-tooltip mt-25">
                              {errors.guardian_name}
                            </div>
                          ) : null}
                        </FormGroup>
                        {/*GUARDIAN EMAIL*/}
                        <FormGroup className="col-md-3 col-sm-3">
                          <Label for="email">Guardian's Email</Label>
                          <Field
                            type="email"
                            name="guardian_email"
                            id="guardian_email"
                            className={`form-control ${
                              errors.guardian_email &&
                              touched.guardian_email &&
                              "is-invalid"
                            }`}
                          />
                          {errors.guardian_email && touched.guardian_email ? (
                            <div className="invalid-tooltip mt-25">
                              {errors.guardian_email}
                            </div>
                          ) : null}
                        </FormGroup>
                      </div>
                      <Button.Ripple color="primary" type="submit">
                        Submit
                      </Button.Ripple>
                      <pre>{JSON.stringify(values, null, 4)}</pre>
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
export default AddStudent;
