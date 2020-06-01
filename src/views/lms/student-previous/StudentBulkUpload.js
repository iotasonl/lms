import React from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  CustomInput,
  FormGroup,
  Label,
  Row,
} from "reactstrap";
import { Progress } from "reactstrap";
import { Form, Field, Formik } from "formik";
import * as Yup from "yup";
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb";
import "react-toastify/dist/ReactToastify.css";
import { FormikReactSelect } from "../../../components/hrmsComponent/form/input";

const formSchema = Yup.object().shape({
  class: Yup.object()
    .shape({
      label: Yup.string().required(),
      value: Yup.string().required(),
    })
    .nullable()
    .required("Gender is required!"),
  // file: Yup.mixed()
  //   .required("A file is required")
  //   .test(
  //     "fileSize",
  //     "File too large",
  //     (value) => value && value.size <= 160 * 1024
  //   )
  //   .test(
  //     "fileFormat",
  //     "Unsupported Format",
  //     (value) =>
  //       value &&
  //       ["image/jpg", "image/jpeg", "image/gif", "image/png"].includes(
  //         value.type
  //       )
  //   ),
});

class StudentBulkUpload extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (values, { setSubmitting }) => {
    const payload = {
      ...values,
      class: values.class.value,
    };
    setTimeout(() => {
      console.log(JSON.stringify(payload, null, 2));
      setSubmitting(false);
    }, 1000);
  };

  handleChange = (value) => {
    this.props.onChange(this.props.name, value);
  };
  handleBlur = () => {
    this.props.onBlur(this.props.name, true);
  };

  render() {
    return (
      <React.Fragment>
        <Breadcrumbs
          breadCrumbTitle="Student Bulk Upload"
          breadCrumbParent="Student"
          breadCrumbActive="Student Bulk Upload"
        />
        <Row>
          <Col lg="12" md="12">
            <Card>
              <CardBody>
                <Formik
                  initialValues={{
                    class: null,
                    file: "",
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
                    touched
                  }) => (
                    <Form>
                      <div className="row">
                        <FormGroup className="col-md-6 col-sm-6">
                          <Label for="gender">Gender</Label>
                          <FormikReactSelect
                            className={`react-select ${
                              errors.class && touched.class && "is-invalid"
                            }`}
                            name="class"
                            id="class"
                            value={values.gender}
                            options={[
                              { value: "1", label: "Class 1" },
                              { value: "2", label: "Class 2" },
                            ]}
                            onChange={setFieldValue}
                            onBlur={setFieldTouched}
                          />
                          {errors.class && touched.class ? (
                            <div className="invalid-tooltip mt-25">
                              {errors.class}
                            </div>
                          ) : null}
                        </FormGroup>
                        <FormGroup className="col-md-6 col-sm-6">
                          <Label for="customFile">Upload File</Label>
                          <Field
                            component={CustomInput}
                            type="file"
                            id="exampleCustomFileBrowser"
                            name="file"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            className={`${
                              errors.file && touched.file && "is-invalid"
                            }`}
                          />
                          {errors.file && touched.file ? (
                            <div className="invalid-tooltip mt-25">
                              {errors.file}
                            </div>
                          ) : null}
                        </FormGroup>
                      </div>
                      <Progress animated value={2 * 5} />
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
export default StudentBulkUpload;
