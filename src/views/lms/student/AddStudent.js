import React from "react";
import {Button, Card, CardBody, Col, FormGroup, Label, Row , Center} from "reactstrap";
import { Form, Field, Formik } from "formik";
import * as Yup from "yup";
import Breadcrumbs from "../../component/breadCrumbs/BreadCrumb";
import "react-toastify/dist/ReactToastify.css";
import {
  FormikReactSelect,
  RadioInput,
} from "../../../components/hrmsComponent/form/input";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/light.css";
import "../../../assets/scss/plugins/forms/flatpickr/flatpickr.scss"
import {Check} from "react-feather";
import Checkbox from "../../../components/@vuexy/checkbox/CheckboxesVuexy"

let datas, datas2, title;
const formSchema = Yup.object().shape({
  first_name: Yup.string().required("First Name is required"),
  last_name: Yup.string().required("Last Name is required"),
  username: Yup.string().required("Username is required").min("4", "Too Short"),
  phone: Yup.number()
    .required("Teacher's name is required")
    .min(4, "Too Short"),
  email: Yup.string().email("Invalid email").required("Required"),
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
  dob: Yup.date()
    .max(new Date())
    .required("Date Of Birth is required"),
  studentClass: Yup.object()
    .shape({
      label: Yup.string().required(),
      value: Yup.string().required(),
    })
    .nullable()
    .required("Class is required!"),
  guardian_name: Yup.string().required("Guardian Name is required"),
  profile_pic: Yup.string().required("Profile Pic is required"),
  guardian_email:Yup.string().email("Invalid email").required("Guardian Email Id is required"),
  relation: Yup.string().required("Relation is required"),
});

class AddStudent extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    if(this.props.match.params.StudentId !== "0")
    {
      this.state={
        show:'edit',
      }
    }
    else
    {
      this.state={
        show:'',
      }
    }
  }
  guardianPhone = 1234567899;
  handleGuardianPhone = (e) => {
    let guardianPhoneInput = e.target.value;
    if(parseInt(guardianPhoneInput) === this.guardianPhone) {
      this.setState({
        show:true
      })
    } else {
      this.setState({
        show:false
      })
    }
  };

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

  render() {

    if(this.props.match.params.StudentId === "0")
    {
      datas = {
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        phone: "",
        studentClass: [{
          "value": "",
          "label": ""
        }],
        gender: "",
        dob: "",
        address: "",
        state: [{
          "value": "",
          "label": ""
        }],
        city: "",
        pin: "",
        profile_pic: "",
        father_name: "",
        guardian_phone: "",
        checkbox_value:"",
      };
      if(this.state.show === true)
      {
        datas2 = {
          guardian_name: "Mukesh Kumar",
          guardian_email: "mukesh@gmail.com",
          relation:"Father",
          checkbox_value:"",
        };
        console.log('1')
      }
      else if(this.state.show === false)
      {
        datas2 = {
          guardian_name: "",
          guardian_email: "",
          relation:"",
          checkbox_value:"",
        };
        console.log('2')
      }
      else if(this.state.show === '')
      {
        datas2 = {
          guardian_name: "",
          guardian_email: "",
          relation:"",
          checkbox_value:"",
        };
        console.log('2')
      }
      title="Add Student";

    }
    else
    {
      datas = {
        first_name: "Rahul",
        last_name: "Kumar",
        username: "rkumar",
        email: "rkumar@gmail.com",
        phone: "9110181521",
        studentClass: [{
          "value": "2",
          "label": "Two"
        }],
        gender: "Male",
        dob: "22/05/2015",
        address: "Ranchi",
        state: [{
          "value": "1",
          "label": "Jharkhand"
        }],
        city: "Ranchi",
        pin: "834005",
        profile_pic: "",
        father_name: "Mukesh Kumar",
        guardian_phone: "1234567899",
        checkbox_value:"",
      };
      title="Update Student";
      datas2 = {
        guardian_name: "Mukesh Kumar",
        guardian_email: "mukesh@gmail.com",
        relation:"Father",
        checkbox_value:"",
      };
    }
    console.log(datas2)
    return (
      <React.Fragment>
        <Breadcrumbs
          breadCrumbLinks={[
            { title: "Student List", link: "/student/student-list" },
          ]}
          breadCrumbTitle={title}
          breadCrumbParent="Student"
          breadCrumbActive={title}
        />
        <Row>
          <Col lg="12" md="12">
            <Card>
              <CardBody>
                <Formik
                  initialValues={{
                    first_name: datas.first_name,
                    last_name: datas.last_name,
                    username: datas.username,
                    email: datas.email,
                    phone: datas.phone,
                    studentClass: datas.studentClass,
                    gender: datas.gender,
                    dob: datas.dob,
                    address: datas.address,
                    state: datas.state,
                    city: datas.city,
                    pin: datas.pin,
                    profile_pic: datas.profile_pic,
                    father_name: datas.father_name,
                    guardian_name:  datas2.guardian_name,
                    guardian_phone: datas.guardian_phone,
                    guardian_email: datas2.guardian_email,
                    relation: datas2.relation ,
                    checkbox_value: datas.checkbox_value,
                  }}
                  validationSchema={formSchema}
                  onSubmit={this.handleSubmit}
                >
                  {({
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
                          <Label for="studentClass">Class</Label>
                          <FormikReactSelect
                            className={`react-select ${
                              errors.studentClass && touched.studentClass && "is-invalid"
                            }`}
                            name="studentClass"
                            id="studentClass"
                            value={values.studentClass}
                            options={[
                              { value: "1", label: "One" },
                              { value: "2", label: "Two" },
                            ]}
                            onChange={setFieldValue}
                            onBlur={setFieldTouched}
                          />
                          {errors.studentClass && touched.studentClass ? (
                            <div className="invalid-tooltip mt-25">
                              {errors.studentClass}
                            </div>
                          ) : null}
                        </FormGroup>
                        {/*STUDENT DOB*/}
                        <FormGroup className="col-md-3 col-sm-3">
                          <Label for="gender">Date Of Birth</Label>
                          <Flatpickr
                            name="dob"
                            id="dob"
                            className={`form-control ${
                              errors.dob && touched.dob && "is-invalid"
                            }`}
                            value={values.dob}
                            onChange={dateOfBirth=>{
                              setFieldValue("dob",dateOfBirth)
                            }}
                            onBlur={dateOfBirth=>{
                              setFieldTouched("dob",dateOfBirth)
                            }}
                          />
                          {errors.dob && touched.dob ? (
                            <div className="invalid-tooltip mt-25">
                              {errors.dob}
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
                              defaultChecked={true}
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
                              { value: "1", label: "Jharkhand" },
                              { value: "2", label: "Bihar" },
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
                            style={{resize:'none'}}
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
                        {/*IMAGE*/}
                        <FormGroup className="col-md-3 col-sm-3">
                          <Label for="image">Image</Label>
                          <Field
                            type="file"
                            name="profile_pic"
                            id="profile_pic"
                            value={values.profile_pic}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`form-control ${
                              errors.profile_pic && touched.profile_pic && "is-invalid"
                            }`}
                          />
                          {/*<CustomInput*/}
                          {/*  type="file"*/}
                          {/*  id="profile_pic"*/}
                          {/*  name="profile_pic"*/}
                          {/*  className={`${errors.profile_pic && touched.profile_pic && "is-invalid"}`}*/}
                          {/*  onChange={pan_card => {*/}
                          {/*    setFieldValue("profile_pic", pan_card)*/}
                          {/*    console.log("val", values.pan_card)*/}
                          {/*  }}*/}
                          {/*  onBlur={pan_card => {*/}
                          {/*    setFieldTouched("profile_pic", pan_card)*/}
                          {/*  }}*/}
                          {/*/>*/}
                          {errors.profile_pic && touched.profile_pic ? (
                            <div className="invalid-tooltip mt-25">{errors.profile_pic}</div>
                          ) : null}
                        </FormGroup>
                      </div>
                      <div className="row">
                        {/*GUARDIAN PHONE*/}
                        <FormGroup className="col-md-3 col-sm-3">
                          <Label for="phone">Guardian's Phone Number</Label>
                          <Field
                            name="guardian_phone"
                            id="guardian_phone"
                            value={values.guardian_phone}
                            onBlur={this.handleGuardianPhone}
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
                        {
                          this.state.show === false ?
                            <React.Fragment>
                              {/*GUARDIAN NAME*/}
                              <FormGroup id="guardian_name" className="col-md-3 col-sm-3">
                                <Label for="first_name">Guardian's Name</Label>
                                <Field
                                  name="guardian_name"
                                  id="guardian_name"
                                  value={values.guardian_name}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
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
                              <FormGroup id="guardian_email" className="col-md-3 col-sm-3">
                                <Label for="email">Guardian's Email</Label>
                                <Field
                                  type="email"
                                  name="guardian_email"
                                  id="guardian_email"
                                  value={values.guardian_email}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
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
                              {/*RELATION*/}
                              <FormGroup className="col-md-3 col-sm-3">
                                <Label for="relation">Relation</Label>
                                <Field
                                  name="relation"
                                  id="relation"
                                  value={values.relation}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={`form-control ${
                                    errors.relation &&
                                    touched.relation &&
                                    "is-invalid"
                                  }`}
                                />
                                {errors.relation && touched.relation ? (
                                  <div className="invalid-tooltip mt-25">
                                    {errors.relation}
                                  </div>
                                ) : null}
                              </FormGroup>
                            </React.Fragment>
                            : this.state.show === 'edit' ?
                            <React.Fragment>
                              {/*GUARDIAN NAME*/}
                              <FormGroup id="guardian_name" className="col-md-3 col-sm-3">
                                <Label for="first_name">Guardian's Name</Label>
                                <Field
                                  name="guardian_name"
                                  id="guardian_name"
                                  value={values.guardian_name}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
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
                              <FormGroup id="guardian_email" className="col-md-3 col-sm-3">
                                <Label for="email">Guardian's Email</Label>
                                <Field
                                  type="email"
                                  name="guardian_email"
                                  id="guardian_email"
                                  value={values.guardian_email}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
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
                              {/*RELATION*/}
                              <FormGroup className="col-md-3 col-sm-3">
                                <Label for="relation">Relation</Label>
                                <Field
                                  name="relation"
                                  id="relation"
                                  value={values.relation}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={`form-control ${
                                    errors.relation &&
                                    touched.relation &&
                                    "is-invalid"
                                  }`}
                                />
                                {errors.relation && touched.relation ? (
                                  <div className="invalid-tooltip mt-25">
                                    {errors.relation}
                                  </div>
                                ) : null}
                              </FormGroup>
                            </React.Fragment>
                            : this.state.show === true ?
                              <Center style={{padding:'0px 20px'}} className="col-12">
                                <Col
                                  style={{
                                    marginBottom: '10px',
                                    backgroundColor: 'var(--white) !important',
                                    boxShadow: '0px 2px 10px 2px #7776',
                                    borderRadius: '10px',
                                    textAlign: 'left'
                                  }}
                                >
                                  <Card
                                    className="card"
                                  >
                                    <CardBody className="row">
                                      <FormGroup className="col-md-3 col-sm-3 my-2">
                                        <Checkbox
                                          color="primary"
                                          icon={<Check className="vx-icon" size={16} />}
                                        />
                                      </FormGroup>
                                      {/*GUARDIAN NAME*/}
                                      <div className="d-flex user-info col-md-3 col-sm-3">
                                        <Label for="first_name">Guardian's Name</Label>
                                        <div className="my-1">{datas2.guardian_name}</div>
                                      </div>
                                      <div className="d-flex user-info col-md-3 col-sm-3">
                                        <Label for="first_name">Guardian's Email</Label>
                                        <div className="my-1">{datas2.guardian_email}</div>
                                      </div>
                                      <div className="d-flex user-info col-md-3 col-sm-3">
                                        <Label for="first_name">Relation</Label>
                                        <div className="my-1">{datas2.relation}</div>
                                      </div>
                                    </CardBody>
                                  </Card>
                                </Col>
                              </Center>
                              : null
                        }
                      </div>
                      <Button.Ripple
                        color="primary"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        Submit
                      </Button.Ripple>
                      {/* <pre>{JSON.stringify(values, null, 4)}</pre> */}
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
