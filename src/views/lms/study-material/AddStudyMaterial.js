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
import DragAndDrop from "./FileUpload"
import "../../../assets/scss/plugins/extensions/dropzone.scss"

let datas ,title;
const formSchema = Yup.object().shape({
    subject: Yup.object()
    .shape({
      label: Yup.string().required(),
      value: Yup.string().required(),
    })
    .nullable()
    .required("This Field is required!"),
    description: Yup.string()
    .required("This Field Is Required"),
    chapter: Yup.string()
    .required("This Field Is Required"),
    title: Yup.string()
    .required("This Field Is Required"),
    class: Yup.object()
    .shape({
      label: Yup.string().required(),
      value: Yup.string().required(),
    })
    .nullable()
    .required("This Field is required!"),
    profile_pic: Yup.string().required("This Field is required!"),
})

class AddStudyMaterial extends React.Component {
    constructor(props) {
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit = (values, { setSubmitting }) => {
      const payload = {
        ...values,
      };
      if(this.props.match.params.StudyMaterialId !== "0")
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
    };
  
    render() {
      if(this.props.match.params.StudyMaterialId === "0")
      {
        datas = {
             id: "",
             subject: [{
              "value": "",
              "label": ""
            }],
             description: "",
             class: [{
              "value": "",
              "label": ""
            }],
            chapter:"",
            title:""
          };
          title="Add Study Material";
      }
      else
      {
        datas = {
            id: "1",
            subject: [{
              "value": "Math",
              "label": "Math"
            }],
            description: "jac",
            class: [{
              "value": "2",
              "label": "Two"
            }],
            chaapter:"ABC",
            title:"Xyz"
          };
         title="Update Board";
      }
      return (
        <React.Fragment>
          <Breadcrumbs
            breadCrumbLinks={[
              { title: "Study material List", link: "/study-material/view-study-material" },
            ]}
            breadCrumbTitle={title}
            breadCrumbParent="Study Material"
            breadCrumbActive={title}
          />
          <Card>
            <CardBody>
              <Formik
                initialValues={{
                  class: datas.class,
                  description:datas.nickname,
                  subject: datas.subject,
                  fileAttachment:"",
                  chapter: datas.chapter,
                  title: datas.title
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
                      <Col md="3" className="my-1">
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
                      <Col md="3" className="my-1">
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
                            { value: "Math", label: "Math" },
                            { value: "Science", label: "Science" },
                          ]}
                          onChange={setFieldValue}
                          onBlur={setFieldTouched}
                        />
                        {errors.subject && touched.subject ? (
                          <div className="invalid-tooltip mt-25">{errors.subject}</div>
                        ) : null}
                      </Col>
                      <Col md="3" className="my-1">
                        <Label for="chapter">Chapter Name</Label>
                          <Field
                            name="chapter"
                            id="chapter"
                            value={values.chapter}
                            className={`form-control ${
                              errors.chapter &&
                              touched.chapter &&
                              "is-invalid"
                            }`}
                          />
                          {errors.chapter && touched.chapter ? (
                            <div className="invalid-tooltip mt-25">
                              {errors.chapter}
                            </div>
                          ) : null}
                      </Col>
                      <Col md="3" className="my-1">
                        <Label for="title">Title</Label>
                          <Field
                            name="title"
                            id="title"
                            value={values.title}
                            className={`form-control ${
                              errors.title &&
                              touched.title &&
                              "is-invalid"
                            }`}
                          />
                          {errors.title && touched.title ? (
                            <div className="invalid-tooltip mt-25">
                              {errors.title}
                            </div>
                          ) : null}
                      </Col>
                      <Col md="6" className="my-1">
                        <Label for="description">Description</Label>
                        <Field
                            component="textarea"
                            rows="2"
                            name="description"
                            id="description"
                            style={{resize:'none'}}
                            value={values.description}
                            className={`form-control ${
                              errors.description && touched.description && "is-invalid"
                            }`}
                          />
                          {errors.description && touched.description ? (
                            <div className="invalid-tooltip mt-25">
                              {errors.description}
                            </div>
                          ) : null}
                      </Col>
                      <Col md="6" style={{marginBottom: '-50px', marginTop:'-10px'}}>
                          <DragAndDrop />
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
  export default AddStudyMaterial