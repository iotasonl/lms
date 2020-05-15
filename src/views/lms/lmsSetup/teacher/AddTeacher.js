import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import Breadcrumbs from "../../../../components/@vuexy/breadCrumbs/BreadCrumb";
import {
  FileInput,
  SelectInput,
  TextInput,
  Textarea,
  MultiSelect,
  RadioInput,
} from "../../../../components/hrmsComponent/form/input";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

class AddTeacher extends React.Component {
  render() {
    const FILE_SIZE = 160 * 1024;
    const SUPPORTED_FORMATS = [
      "image/jpg",
      "image/jpeg",
      "image/gif",
      "image/png",
    ];
    const colourOptions = [
      { value: "ocean", label: "Ocean" },
      { value: "blue", label: "Blue" },
      { value: "purple", label: "Purple" },
      { value: "red", label: "Red" },
      { value: "orange", label: "Orange" },
      { value: "yellow", label: "Yellow" },
    ];
    const formSchema = Yup.object().shape({
      phone: Yup.number()
        .required("Teacher's name is required")
        .min(4, "Too Short"),
      name: Yup.string().required("Required").min(4, "Too Short"),
      email: Yup.string().email("Invalid email").required("Required"),
      image: Yup.mixed()
        .required("A file is required")
        .test(
          "fileSize",
          "File too large",
          (value) => value && value.size <= FILE_SIZE
        )
        .test(
          "fileFormat",
          "Unsupported Format",
          (value) => value && SUPPORTED_FORMATS.includes(value.type)
        ),
      select: Yup.string().required("Topic is required!"),
      address: Yup.string().required("Address is required!"),
      class1: Yup.string().ensure().required("Topic is required!"),
    });

    return (
      <React.Fragment>
        <Breadcrumbs
          breadCrumbTitle="Create Organization"
          breadCrumbParent="Organization"
          breadCrumbActive="Create Organization"
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
                    name: "",
                    email: "",
                    phone: "",
                    address: "",
                    image: undefined,
                    class: [colourOptions[4], colourOptions[5]],
                    gender: "",
                  }}
                  validationSchema={formSchema}
                  onSubmit={(values) => {
                    setTimeout(() => {
                      toast.success(JSON.stringify(values, null, 2));
                    }, 500);
                  }}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    setFieldValue,
                    setFieldTouched,
                  }) => (
                    <Form>
                      <div className="row">
                        <div className="col-md-6 col-sm-6">
                          <TextInput
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Teacher's Name"
                            value={values.name}
                            change={handleChange}
                            blur={handleBlur}
                            icon="User"
                            className={`form-control ${
                              errors.name && touched.name && "is-invalid"
                            }`}
                            errorDiv={
                              errors.name && touched.name ? (
                                <div className="invalid-tooltip mt-25">
                                  {errors.name}
                                </div>
                              ) : null
                            }
                          />
                        </div>
                        <div className="col-md-6 col-sm-6">
                          <TextInput
                            type="email"
                            name="email"
                            id="email"
                            value={values.email}
                            placeholder="Teacher's Email"
                            change={handleChange}
                            blur={handleBlur}
                            icon="Mail"
                            className={`form-control ${
                              errors.email && touched.email && "is-invalid"
                            }`}
                            errorDiv={
                              errors.email && touched.email ? (
                                <div className="invalid-tooltip mt-25">
                                  {errors.email}
                                </div>
                              ) : null
                            }
                          />
                        </div>
                        <div className="col-md-6 col-sm-6">
                          <TextInput
                            type="number"
                            name="phone"
                            id="phone"
                            placeholder="Teacher's Phone"
                            value={values.phone}
                            change={handleChange}
                            blur={handleBlur}
                            icon="Phone"
                            className={`form-control ${
                              errors.phone && touched.phone && "is-invalid"
                            }`}
                            errorDiv={
                              errors.phone && touched.phone ? (
                                <div className="invalid-tooltip mt-25">
                                  {errors.phone}
                                </div>
                              ) : null
                            }
                          />
                        </div>
                        <div className="col-md-6 col-sm-6">
                          <FileInput
                            id="image"
                            name="image"
                            value={values.image}
                            change={handleChange}
                            blur={handleBlur}
                            label="Teacher's Image"
                            className={`${
                              errors.image && touched.image && "is-invalid"
                            }`}
                            errorDiv={
                              errors.image && touched.image ? (
                                <div className="invalid-tooltip mt-25">
                                  {errors.image}
                                </div>
                              ) : null
                            }
                          />
                        </div>
                        <div className="col-md-6 col-sm-6">
                          <MultiSelect
                            name="class"
                            options={colourOptions}
                            defaultValue={values.class}
                            change={setFieldValue}
                            blur={setFieldTouched}
                            placeholder="Select Classes"
                            className={`React ${
                              errors.class && touched.class && "is-invalid"
                            }`}
                            errorDiv={
                              errors.class && touched.class ? (
                                <div className="invalid-tooltip mt-25">
                                  {errors.class}
                                </div>
                              ) : null
                            }
                          />
                        </div>
                        <div className="col-md-6 col-sm-6">
                          <MultiSelect
                            name="subject"
                            options={colourOptions}
                            defaultValue={values.class}
                            change={setFieldValue}
                            blur={setFieldTouched}
                            placeholder="Select Classes"
                            className={`React ${
                              errors.subject && touched.subject && "is-invalid"
                            }`}
                            errorDiv={
                              errors.subject && touched.subject ? (
                                <div className="invalid-tooltip mt-25">
                                  {errors.subject}
                                </div>
                              ) : null
                            }
                          />
                        </div>
                        <div className="col-md-6 col-sm-6">
                          <RadioInput
                            className="d-inline-block mr-1"
                            label="Male"
                            defaultChecked={true}
                            name="gender"
                            value="1"
                          />
                          <RadioInput
                            className="d-inline-block mr-1"
                            label="Female"
                            defaultChecked={true}
                            name="gender"
                            value="0"
                          />
                          <br />
                          <br />
                        </div>
                        <div className="col-md-6 col-sm-6">
                          <SelectInput
                            id="state"
                            name="state"
                            defaultValue={colourOptions[0]}
                            options={colourOptions}
                            change={handleChange}
                            blur={handleBlur}
                            className={`React ${
                              errors.state && touched.state && "is-invalid"
                            }`}
                            errorDiv={
                              errors.state && touched.state ? (
                                <div className="invalid-tooltip mt-25">
                                  {errors.state}
                                </div>
                              ) : null
                            }
                          />
                        </div>
                        <div className="col-md-6 col-sm-6">
                          <TextInput
                            type="text"
                            name="city"
                            id="city"
                            placeholder="City"
                            value={values.city}
                            change={handleChange}
                            blur={handleBlur}
                            icon="User"
                            className={`form-control ${
                              errors.city && touched.city && "is-invalid"
                            }`}
                            errorDiv={
                              errors.city && touched.city ? (
                                <div className="invalid-tooltip mt-25">
                                  {errors.city}
                                </div>
                              ) : null
                            }
                          />
                        </div>
                        <div className="col-md-6 col-sm-6">
                          <Textarea
                            name="address"
                            rows="2"
                            placeholder="Enter Address"
                            value={values.address}
                            change={handleChange}
                            blur={handleBlur}
                            className={`${
                              errors.address && touched.address && "is-invalid"
                            }`}
                            errorDiv={
                              errors.address && touched.address ? (
                                <div className="invalid-tooltip mt-25">
                                  {errors.address}
                                </div>
                              ) : null
                            }
                          />
                        </div>
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
