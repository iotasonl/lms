import React from "react"
import {Button, Card, CardBody, CardHeader, CardTitle, Col, Row} from "reactstrap"
import {Form, Formik} from "formik"
import * as Yup from "yup"
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb"
import {FileInput, SelectInput, TextInput} from "../../../components/hrmsComponent/form/input";
import "react-toastify/dist/ReactToastify.css"


const colourOptions = [
  { value: "ocean", label: "Ocean" },
  { value: "blue", label: "Blue" },
  { value: "purple", label: "Purple" },
  { value: "red", label: "Red" },
  { value: "orange", label: "Orange" }
];

class CreateOrganization extends React.Component {

  formSchema = Yup.object().shape({
    phone: Yup.number().required("Required").min(4, "Too Short"),
    name: Yup.string().required("Required").min(4, "Too Short"),
    email: Yup.string()
      .email("Invalid email")
      .required("Required"),
    select: Yup.string().required("Topic is required!"),
    file: Yup.mixed().required('A file is required'),
    url: Yup.string()
      .url()
      .required("Required"),
  });

  render() {
    return (
      <React.Fragment>
        {console.log(this.props.model)}
        <Breadcrumbs
          breadCrumbTitle="Create Organization"
          breadCrumbParent="Organization"
          breadCrumbActive="Create Organization"
        />
        <Row>
          <Col lg="6" md="12">
            <Card>
              <CardHeader>
                <CardTitle>Hello</CardTitle>
              </CardHeader>
              <CardBody>
                <Formik
                  initialValues={{
                    required: "",
                    email: "",
                    select: "",
                    file: "",
                    name: "",
                    phone: ""
                  }}
                  validationSchema={this.formSchema}
                  onSubmit={(values, actions) => {
                    setTimeout(() => {
                      alert(JSON.stringify(values, null, 2));
                      actions.setSubmitting(false);
                    }, 1000);
                  }} >
                  {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                      <TextInput
                        type="text"
                        name="required"
                        id="required"
                        placeholder="First Name"
                        change={handleChange}
                        blur={handleBlur}
                        icon="User"
                        className={`form-control round ${errors.required && touched.required && "is-invalid"}`}
                        errorDiv={errors.required && touched.required ? (<div className="invalid-tooltip mt-25">{errors.required}</div>) : null}
                      />
                      <TextInput
                        test={touched.email}
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        change={handleChange}
                        blur={handleBlur}
                        icon="Mail"
                        className={`form-control ${errors.email && touched.email && "is-invalid"}`}
                        errorDiv={errors.email && touched.email ? (<div className="invalid-tooltip mt-25">{errors.email}</div>) : null}
                      />
                      <FileInput
                        id="file"
                        name="file"
                        // value={values}
                        change={handleChange}
                        blur={handleBlur}
                        label="File Input"
                        className={`${errors.email && touched.email && "is-invalid"}`}
                        errorDiv={errors.email && touched.email ? (<div className="invalid-tooltip mt-25">{errors.email}</div>) : null}
                      />
                      <SelectInput
                        classNamePrefix="select"
                        defaultValue={colourOptions[0]}
                        name="select"
                        options={colourOptions}
                        id="select"
                        change={handleChange}
                        blur={handleBlur}
                        className={`react ${errors.select && touched.select && "is-invalid"}`}
                        errorDiv={errors.select && touched.select ? (<div className="invalid-tooltip mt-25">{errors.select}</div>) : null}
                      />

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
    )
  }
}
export default CreateOrganization
