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
      name: Yup.string().required("Required").min(4, "Too Short"),
      email: Yup.string().email("Invalid email").required("Required"),
      phone: Yup.number()
        .required("Teacher's name is required")
        .min(10, "Enter a valid mobile number")
        .max(10, "Enter a valid mobile number"),
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
      class: Yup.string().ensure().required("Class is required!"),
      subject: Yup.string().ensure().required("Subject is required!"),
      State: Yup.string().ensure().required("Subject is required!"),
      city: Yup.string().required("Required"),
      address: Yup.string().required("Address is required!"),
      pin: Yup.number()
        .required("Pin Code is required")
        .min(6, "Enter a valid Pin Code")
        .max(6, "Enter a valid Pin Code"),
    });

    let data = {
      _id: { $oid: "5ebfa14f9cde69cb447a3cee" },
      board_name: "CBSE",
      nick_name: "CBSE",
      zone_status: "CENTRAL",
      status: true,
      c_date: { $date: 1589636775476 },
      d_date: { $date: 1589636775476 },
    };

    return (
      <React.Fragment>
        <Breadcrumbs
          breadCrumbTitle="Teacher Registration"
          breadCrumbParent="Teacher"
          breadCrumbActive="Teacher Registration"
          rightOptions={[
            {
              title: "Bulk Upload",
              link: "/teacher/tracherBulkUpload",
            },
            {
              title: "Bulk Upload",
              link: "/teacher/tracherBulkUpload",
            },
          ]}
        />
        <Row>
          <Col lg="12" md="12">
            <Card>
              <CardHeader>
                <p>{data.board_name}</p>
                <p>{data.nick_name}</p>
                <p>{data.zone_status}</p>
                <p>{data.status}</p>
                <p>{data.c_date.$date}</p>
                <p>{data.d_date.$date}</p>
                <CardTitle>Teacher Registration</CardTitle>
              </CardHeader>
              <CardBody>
                <Formik
                  initialValues={{
                    name: "",
                    email: "",
                    phone: "",
                    image: undefined,
                    gender: "",
                    class: [colourOptions[4], colourOptions[5]],
                    subject: [colourOptions[4], colourOptions[5]],
                    state: "",
                    city: "",
                    address: "",
                    pin: "",
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
                        <div className="col-md-4 col-sm-4">
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
                        <div className="col-md-4 col-sm-4">
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
                        <div className="col-md-4 col-sm-4">
                          <br />
                          <div
                            style={{
                              border: "1px solid #ccc",
                              borderRadius: "5px",
                              padding: "4px 0 4px 15px",
                            }}
                          >
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
                          </div>
                          <br />
                          <br />
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
                            placeholder="Select Subject"
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
                          <SelectInput
                            name="state"
                            label="Select State"
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
                            rows="1"
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
                        <div className="col-md-6 col-sm-6">
                          <TextInput
                            type="number"
                            name="pin"
                            id="pin"
                            placeholder="Pin Code"
                            value={values.phone}
                            change={handleChange}
                            blur={handleBlur}
                            icon="Droplet"
                            className={`form-control ${
                              errors.pin && touched.pin && "is-invalid"
                            }`}
                            errorDiv={
                              errors.pin && touched.pin ? (
                                <div className="invalid-tooltip mt-25">
                                  {errors.pin}
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
