import React from "react";
import { Button, Card, CardBody, CardHeader, CardTitle, Col, FormGroup, Label, Row, CustomInput } from "reactstrap";
import { Form, Field, Formik } from "formik";
import * as Yup from "yup";
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb";
import "react-toastify/dist/ReactToastify.css";
import { FormikReactSelect, } from "../../../components/hrmsComponent/form/input";
import Select from "react-select";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/light.css";
import "../../../assets/scss/plugins/forms/flatpickr/flatpickr.scss"

const formSchema = Yup.object().shape({
    gender: Yup.object()
        .shape({
            label: Yup.string().required(),
            value: Yup.string().required()
        })
        .nullable()
        .required("Gender is required!"),
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    father_name: Yup.string().required("Father name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.number().required("Phone number is required"),
    dob: Yup.string().required("Date of birth is required"),
    address: Yup.string().required("Address is required"),
    state: Yup.string().required("State is required"),
    city: Yup.string().required("City is required"),
    doj: Yup.string().required("Date of joining is required"),
    aadhar: Yup.string().required("Aadhar card is required"),
    pan_card: Yup.string().required("Aadhar card is required"),
    class: Yup.object()
        .shape({
            label: Yup.string().required(),
            value: Yup.string().required()
        })
        .nullable()
        .required("Class is required!"),
});

class AddTeacher extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (values, { setSubmitting }) => {
        const payload = {
            ...values,
            gender: values.gender.value
        };
        setTimeout(() => {
            console.log(JSON.stringify(payload, null, 2));
            setSubmitting(false);
        }, 1000);
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

                                        class: null,
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
                                        isSubmitting
                                    }) => (
                                            <Form>
                                                <div className="row">
                                                    <FormGroup className="col-md-3 col-sm-3">
                                                        <Label for="first_name">First Name</Label>
                                                        <Field name="first_name" id="first_name" className={`form-control ${errors.first_name && touched.first_name && "is-invalid"}`} />
                                                        {errors.first_name && touched.first_name ? (
                                                            <div className="invalid-tooltip mt-25">{errors.first_name}</div>
                                                        ) : null}
                                                    </FormGroup>

                                                    <FormGroup className="col-md-3 col-sm-3">
                                                        <Label for="last_name">Last Name</Label>
                                                        <Field name="last_name" id="last_name" className={`form-control ${errors.last_name && touched.last_name && "is-invalid"}`} />
                                                        {errors.last_name && touched.last_name ? (
                                                            <div className="invalid-tooltip mt-25">{errors.last_name}</div>
                                                        ) : null}
                                                    </FormGroup>

                                                    <FormGroup className="col-md-3 col-sm-3">
                                                        <Label for="father_name">Father Name</Label>
                                                        <Field name="father_name" id="father_name" className={`form-control ${errors.father_name && touched.father_name && "is-invalid"}`} />
                                                        {errors.father_name && touched.father_name ? (
                                                            <div className="invalid-tooltip mt-25">{errors.father_name}</div>
                                                        ) : null}
                                                    </FormGroup>

                                                    <FormGroup className="col-md-3 col-sm-3">
                                                        <Label for="email">Email ID</Label>
                                                        <Field name="email" id="email" className={`form-control ${errors.email && touched.email && "is-invalid"}`} />
                                                        {errors.email && touched.email ? (
                                                            <div className="invalid-tooltip mt-25">{errors.email}</div>
                                                        ) : null}
                                                    </FormGroup>

                                                    <FormGroup className="col-md-3 col-sm-3">
                                                        <Label for="phone">Phone Number</Label>
                                                        <Field name="phone" id="phone" className={`form-control ${errors.phone && touched.phone && "is-invalid"}`} />
                                                        {errors.phone && touched.phone ? (
                                                            <div className="invalid-tooltip mt-25">{errors.phone}</div>
                                                        ) : null}
                                                    </FormGroup>

                                                    <FormGroup className="col-md-3 col-sm-3">
                                                        <Label for="alt_phone">Alternate Phone Number</Label>
                                                        <Field name="alt_phone" id="alt_phone" className={`form-control ${errors.alt_phone && touched.alt_phone && "is-invalid"}`} />
                                                        {errors.alt_phone && touched.alt_phone ? (
                                                            <div className="invalid-tooltip mt-25">{errors.alt_phone}</div>
                                                        ) : null}
                                                    </FormGroup>

                                                    <FormGroup className="col-md-3 col-sm-3">
                                                        <Label for="gender">Gender</Label>
                                                        <FormikReactSelect
                                                            className={`react-select ${errors.gender && touched.gender && "is-invalid"}`}
                                                            name="gender"
                                                            id="gender"
                                                            value={values.gender}
                                                            options={[
                                                                { value: 'Male', label: 'Male' },
                                                                { value: 'Female', label: 'Female' },
                                                            ]}
                                                            onChange={setFieldValue}
                                                            onBlur={setFieldTouched}
                                                        />
                                                        {errors.gender && touched.gender ? (
                                                            <div className="invalid-tooltip mt-25">{errors.gender}</div>
                                                        ) : null}
                                                    </FormGroup>

                                                    <FormGroup className="col-md-3 col-sm-3">
                                                        <Label for="dob">Date of Birth</Label>
                                                        <Flatpickr
                                                            name="dob"
                                                            className={`form-control ${errors.dob && touched.dob && "is-invalid"}`}
                                                            value={values.dob}
                                                            onChange={date => {
                                                                setFieldValue("dob", date)
                                                            }}
                                                            onBlur={date => {
                                                                setFieldTouched("dob", date)
                                                            }}
                                                        />
                                                        {errors.dob && touched.dob ? (
                                                            <div className="invalid-tooltip mt-25">{errors.dob}</div>
                                                        ) : null}
                                                    </FormGroup>

                                                    <FormGroup className="col-md-3 col-sm-3">
                                                        <Label for="address">Address</Label>
                                                        <Field name="address" id="address" className={`form-control ${errors.address && touched.address && "is-invalid"}`} />
                                                        {errors.address && touched.address ? (
                                                            <div className="invalid-tooltip mt-25">{errors.address}</div>
                                                        ) : null}
                                                    </FormGroup>

                                                    <FormGroup className="col-md-3 col-sm-3">
                                                        <Label for="state">State</Label>
                                                        <FormikReactSelect
                                                            className={`react-select ${errors.state && touched.state && "is-invalid"}`}
                                                            name="state"
                                                            id="state"
                                                            value={values.state}
                                                            options={[
                                                                { value: 'Jharkhand', label: 'Jharkhand' },
                                                                { value: 'Bihar', label: 'Bihar' },
                                                            ]}
                                                            onChange={setFieldValue}
                                                            onBlur={setFieldTouched}
                                                        />
                                                        {errors.state && touched.state ? (
                                                            <div className="invalid-tooltip mt-25">{errors.state}</div>
                                                        ) : null}
                                                    </FormGroup>

                                                    <FormGroup className="col-md-3 col-sm-3">
                                                        <Label for="city">City</Label>
                                                        <FormikReactSelect
                                                            className={`react-select ${errors.city && touched.city && "is-invalid"}`}
                                                            name="city"
                                                            id="city"
                                                            value={values.city}
                                                            options={[
                                                                { value: 'Ranchi', label: 'Ranchi' },
                                                                { value: 'Bokaro', label: 'Bokaro' },
                                                            ]}
                                                            onChange={setFieldValue}
                                                            onBlur={setFieldTouched}
                                                        />
                                                        {errors.city && touched.city ? (
                                                            <div className="invalid-tooltip mt-25">{errors.city}</div>
                                                        ) : null}
                                                    </FormGroup>

                                                    <FormGroup className="col-md-3 col-sm-3">
                                                        <Label for="pincode">Pincode</Label>
                                                        <Field name="pincode" id="pincode" className={`form-control ${errors.pincode && touched.pincode && "is-invalid"}`} />
                                                        {errors.pincode && touched.pincode ? (
                                                            <div className="invalid-tooltip mt-25">{errors.pincode}</div>
                                                        ) : null}
                                                    </FormGroup>

                                                    <FormGroup className="col-md-3 col-sm-3">
                                                        <Label for="experience">Experience</Label>
                                                        <Field name="experience" id="experience" className={`form-control ${errors.experience && touched.experience && "is-invalid"}`} />
                                                        {errors.experience && touched.experience ? (
                                                            <div className="invalid-tooltip mt-25">{errors.experience}</div>
                                                        ) : null}
                                                    </FormGroup>

                                                    <FormGroup className="col-md-3 col-sm-3">
                                                        <Label for="qualification">Qualification</Label>
                                                        <Field name="qualification" id="qualification" className={`form-control ${errors.qualification && touched.qualification && "is-invalid"}`} />
                                                        {errors.qualification && touched.qualification ? (
                                                            <div className="invalid-tooltip mt-25">{errors.qualification}</div>
                                                        ) : null}
                                                    </FormGroup>

                                                    <FormGroup className="col-md-3 col-sm-3">
                                                        <Label for="doj">Date of Joining</Label>
                                                        <Flatpickr
                                                            name="doj"
                                                            className={`form-control ${errors.doj && touched.doj && "is-invalid"}`}
                                                            value={values.doj}
                                                            onChange={date => {
                                                                setFieldValue("doj", date)
                                                            }}
                                                            onBlur={date => {
                                                                setFieldTouched("doj", date)
                                                            }}
                                                        />

                                                        {errors.doj && touched.doj ? (
                                                            <div className="invalid-tooltip mt-25">{errors.doj}</div>
                                                        ) : null}
                                                    </FormGroup>

                                                    <FormGroup className="col-md-3 col-sm-3">
                                                        <Label for="aadhar">Aadhar</Label>
                                                        <CustomInput
                                                            type="file"
                                                            id="aadhar"
                                                            name="aadhar"
                                                            className={`${errors.aadhar && touched.aadhar && "is-invalid"}`}
                                                            onChange={aadhar => {
                                                                setFieldValue("aadhar", aadhar)
                                                            }}
                                                            onBlur={aadhar => {
                                                                setFieldTouched("aadhar", aadhar)
                                                            }}
                                                        />
                                                        {errors.aadhar && touched.aadhar ? (
                                                            <div className="invalid-tooltip mt-25">{errors.aadhar}</div>
                                                        ) : null}
                                                    </FormGroup>

                                                    <FormGroup className="col-md-3 col-sm-3">
                                                        <Label for="pan_card">Pan Card</Label>
                                                        <CustomInput
                                                            type="file"
                                                            id="pan_card"
                                                            name="pan_card"
                                                            className={`${errors.pan_card && touched.pan_card && "is-invalid"}`}
                                                            onChange={pan_card => {
                                                                setFieldValue("pan_card", pan_card)
                                                            }}
                                                            onBlur={pan_card => {
                                                                setFieldTouched("pan_card", pan_card)
                                                            }}
                                                        />
                                                        {errors.pan_card && touched.pan_card ? (
                                                            <div className="invalid-tooltip mt-25">{errors.pan_card}</div>
                                                        ) : null}
                                                    </FormGroup>

                                                    <FormGroup className="col-md-3 col-sm-3">
                                                        <Label for="class">Select Class</Label>
                                                        <Select
                                                            name="class"
                                                            id="class"
                                                            closeMenuOnSelect={false}
                                                            defaultValue=""
                                                            isMulti={true}
                                                            options={[
                                                                { value: 'Ranchi', label: 'Ranchi' },
                                                                { value: 'Bokaro', label: 'Bokaro' },
                                                            ]}
                                                            classNamePrefix="select"
                                                            className={`${errors.class && touched.class && "is-invalid"}`}
                                                            onChange={classes => {
                                                                setFieldValue("class", classes)
                                                            }}
                                                            onBlur={classes => {
                                                            setFieldTouched("class", classes)
                                                            }}
                                                        />
                                                        {errors.class && touched.class ? (
                                                            <div className="invalid-tooltip mt-25">{errors.class}</div>
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
