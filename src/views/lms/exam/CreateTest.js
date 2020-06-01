import React from "react";
import Breadcrumbs from "../../component/breadCrumbs/BreadCrumb";
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
import {
  FormikReactSelect,
} from "../../../components/hrmsComponent/form/input";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/light.css";
import "../../../assets/scss/plugins/forms/flatpickr/flatpickr.scss"

let datas ,title;
const formSchema = Yup.object().shape({
    subject: Yup.object()
        .shape({
        label: Yup.string().required(),
        value: Yup.string().required(),
        })
        .nullable()
        .required("This Field is required!"),
    duration: Yup.string()
    .required("This Field Is Required"),
    class: Yup.object()
    .shape({
      label: Yup.string().required(),
      value: Yup.string().required(),
    })
    .nullable()
    .required("This Field is required!"),
    testDate: Yup.date()
    .max(new Date())
    .required("This Field is required"),
    testName: Yup.string().required("This Field Is Required"),
    marks: Yup.string()
    .required("This Field Is Required")
    .min("1", "Enter a valid Marks")
    .max("3", "Enter a valid Marks"),
})

class CreateTest extends React.Component {
    constructor(props) {
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit = (values, { setSubmitting }) => {
      const payload = {
        ...values,
      };
      if(this.props.match.params.TestId !== "0")
      {
        console.log("Updating Board..");
      }
      else {
        console.log("Inserting Board..");
      }
      setTimeout(() => {
        console.log(JSON.stringify(payload, null, 2));
        setSubmitting(false);
      }, 1000);
      window.location.href = "/exam/set-question/0";
    };

    render() {
      if(this.props.match.params.TestId === "0")
      {
        datas = {
                id: "",
                class: [{
                    "value": "",
                    "label": ""
                  }],
                subject: [{
                    "value": "",
                    "label": ""
                  }],
                testDate: "",
                duration:"",
                testName:"",
                marks:""
          };
          title="Create Test";
      }
      else
      {
        datas = {
            id: "",
            class: [{
                "value": "1",
                "label": "One"
                }],
            subject: [{
                "value": "2",
                "label": "Science"
                }],
            testDate: "2020-06-20",
            duration:"2:30 hrs",
            testName:"Weekly Test",
            marks:"70"
          };
         title="Update Test";
      }
      return (
        <React.Fragment>
          <Breadcrumbs
            breadCrumbLinks={[
              { title: "Test List", link: "/exam/test-list" },
            ]}
            breadCrumbTitle={title}
            breadCrumbParent="Material"
            breadCrumbActive={title}
          />
          <Card>
            <CardBody>
              <Formik
                initialValues={{
                  class: datas.class,
                  subject:datas.subject,
                  testDate:datas.testDate,
                  duration:datas.duration,
                  testName:datas.testName,
                  marks:datas.marks
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
                      <Col md="4" className="my-1">
                        <Label for="class">Class</Label>
                        <FormikReactSelect
                          className={`${
                            errors.class &&
                            touched.class &&
                            "is-invalid"
                          }`}
                          name="class"
                          id="class"
                          value={values.class}
                          options={[
                            { value: "1", label: "One" },
                            { value: "2", label: "Two" },
                          ]}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                        />
                        {errors.class && touched.class ? (
                          <div className="invalid-tooltip mt-25">
                            {errors.class}
                          </div>
                        ) : null}
                      </Col>
                      <Col md="4" className="my-1">
                        <Label for="subject">Subject</Label>
                        <FormikReactSelect
                          className={`${
                            errors.subject &&
                            touched.subject &&
                            "is-invalid"
                          }`}
                          name="subject"
                          id="subject"
                          value={values.subject}
                          options={[
                            { value: "1", label: "Math" },
                            { value: "2", label: "Science" },
                          ]}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                        />
                        {errors.subject && touched.subject ? (
                          <div className="invalid-tooltip mt-25">
                            {errors.subject}
                          </div>
                        ) : null}
                      </Col>
                      <Col md="4" className="my-1">
                        <Label for="testDate">Test Date</Label>
                        <Flatpickr
                            name="testDate"
                            id="testDate"
                            className={`form-control ${
                                errors.testDate && touched.testDate && "is-invalid"
                              }`}
                            value={values.testDate}
                            onChange={testDate=>{
                              setFieldValue("testDate",testDate)
                            }}
                            onBlur={testDate=>{
                              setFieldTouched("testDate",testDate)
                            }}
                          />
                          {errors.testDate && touched.testDate ? (
                            <div className="invalid-tooltip mt-25">
                              {errors.testDate}
                            </div>
                          ) : null}
                      </Col>
                      <Col md="4" className="my-1">
                        <Label for="duration">Test Duration</Label>
                        <Field
                            name="duration"
                            id="duration"
                            className={`form-control ${errors.duration &&
                            touched.duration &&
                            "is-invalid"}`}
                        />
                        {errors.duration && touched.duration ? (
                            <div className="invalid-tooltip mt-25">{errors.duration}</div>
                        ) : null}
                      </Col>
                      <Col md="4" className="my-1">
                        <Label for="testName">Test Name</Label>
                        <Field
                            name="testName"
                            id="testName"
                            className={`form-control ${errors.testName &&
                            touched.testName &&
                            "is-invalid"}`}
                        />
                        {errors.testName && touched.testName ? (
                            <div className="invalid-tooltip mt-25">{errors.testName}</div>
                        ) : null}
                      </Col>
                      <Col md="4" className="my-1">
                        <Label for="marks">Total Marks</Label>
                        <Field
                            type="number"
                            name="marks"
                            id="marks"
                            className={`form-control ${errors.marks &&
                            touched.marks &&
                            "is-invalid"}`}
                        />
                        {errors.marks && touched.marks ? (
                            <div className="invalid-tooltip mt-25">{errors.marks}</div>
                        ) : null}
                      </Col>
                    </FormGroup>
                    <FormGroup row >
                      <Col sm="12" className="my-2">
                        {/* <Link className="text-dark w-100" to={'/exam/set-question'}> */}
                            <Button.Ripple
                            color="primary"
                            type="submit"
                            className="mb-1 mr-1"
                            path = '/exam/set-question'
                            >
                            Create Test
                            </Button.Ripple>
                        {/* </Link> */}
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
  export default CreateTest
