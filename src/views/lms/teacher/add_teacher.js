import React from "react";
import { Button, Card, CardBody, CardHeader, CardTitle, Col, FormGroup, Label, Row } from "reactstrap";
import { Form, Field, Formik } from "formik";
import * as Yup from "yup";
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/light.css";
import "../../../assets/scss/plugins/forms/flatpickr/flatpickr.scss"
import Radio from "../../../components/@vuexy/radio/RadioVuexy";
import profilePreview from "../../../components/hrmsComponent/form/profilePic";

const FILE_SIZE = 160 * 1024;
const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png"
];
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
    profile_pic: Yup
        .mixed()
        .required("A file is required")
        .test(
            "fileSize",
            "File too large",
            value => value && value.size <= FILE_SIZE
        )
        .test(
            "fileFormat",
            "Unsupported Format",
            value => value && SUPPORTED_FORMATS.includes(value.type)
        ),
});

class AddTeacher extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (values) => {
        console.log("value", values)
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
                                        gender: null,
                                        dob: "",
                                        profile_pic: "",
                                        class: null,
                                        subject: "",
                                        file: "",
                                    }}
                                    validationSchema={formSchema}
                                    onSubmit={this.handleSubmit}
                                >
                                    {({
                                        setFieldValue,
                                        setFieldTouched,
                                        handleBlur,
                                        values,
                                        errors,
                                        touched,
                                    }) => (
                                            <Form >
                                                <div className="row">
                                                    <FormGroup className="col-md-12 col-sm-12">
                                                        <Field
                                                            name="profile_pic"
                                                            component={profilePreview}
                                                            title="Select a file"
                                                            setFieldValue={setFieldValue}
                                                            errorMessage={errors["profile_pic"] ? errors["profile_pic"] : undefined}
                                                            touched={touched["profile_pic"]}
                                                            style={{ display: "flex" }}
                                                            onBlur={handleBlur}
                                                        />
                                                    </FormGroup>

                                                    <FormGroup className="col-md-3 col-sm-3">
                                                        <Label for="first_name">First Name</Label>
                                                        <Field name="first_name" id="first_name" className={`form-control ${errors.first_name && touched.first_name && "is-invalid"}`} />
                                                        {errors.first_name && touched.first_name ? (
                                                            <div className="invalid-tooltip mt-25">{errors.first_name}</div>
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
                                                        <Label for="gender">Gender</Label>
                                                        <br />
                                                        <div className="d-inline-block mr-1">
                                                            <Radio
                                                                label="Male"
                                                                defaultChecked={true}
                                                                name="gender"
                                                                value="1"
                                                            />
                                                        </div>
                                                        <div className="d-inline-block mr-1">
                                                            <Radio
                                                                label="Female"
                                                                defaultChecked={false}
                                                                name="gender"
                                                                value="0"
                                                            />
                                                        </div>
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

                                                    <FormGroup className="col-md-3 col-sm-3">
                                                        <Label for="class">Select Subject</Label>
                                                        <Select
                                                            name="subject"
                                                            id="subject"
                                                            closeMenuOnSelect={false}
                                                            defaultValue=""
                                                            isMulti={true}
                                                            options={[
                                                                { value: 'Ranchi', label: 'Ranchi' },
                                                                { value: 'Bokaro', label: 'Bokaro' },
                                                            ]}
                                                            classNamePrefix="select"
                                                            className={`${errors.subject && touched.subject && "is-invalid"}`}
                                                            onChange={subjectes => {
                                                                setFieldValue("subject", subjectes)
                                                            }}
                                                            onBlur={subjectes => {
                                                                setFieldTouched("subject", subjectes)
                                                            }}
                                                        />
                                                        {errors.subject && touched.subject ? (
                                                            <div className="invalid-tooltip mt-25">{errors.subject}</div>
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
