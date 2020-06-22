import React from "react";
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
import Breadcrumbs from "../../component/breadCrumbs/BreadCrumb";
import { connect } from "react-redux"
import {
  postData, getData, updateData
} from "../../../redux/actions/class/"
import { ToastContainer } from "react-toastify"
import {history} from "../../../history";
const formSchema = Yup.object().shape({
  class_name: Yup.string().required("This Field Is Required"),
  class_numeric_name: Yup.number()
    .required("This Field Is Required"),
})
class CreateClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      class_name: "",
      class_numeric_name: "",
      title: 'Create Class'
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }
  async componentDidMount() {
    if(this.props.match.params.ClassId !== "0")
    {
      const jsonData = '{}';
      const wClause = '{"class_name":"' + this.props.match.params.ClassId+'"}';
      await this.props.getData(jsonData, wClause);
      console.log(this.props.app[0].class_name);
      if(this.props.app.length) {
        this.setState({
          id: this.props.app[0].id,
          class_name: this.props.app[0].class_name,
          class_numeric_name: this.props.app[0].class_numeric_name,
          title: "Update Class",
        })
      }
      else {
        history.push("/404")
      }
    }
  }
  handleSubmit = (values) => {
    if(this.props.match.params.ClassId === "0")
    {
      let val = '{"class_name":"' + values.class_name + '","class_numeric_name":"' + values.class_numeric_name + '"}';
      this.props.postData(val);
    }
    else{
      console.log(this.props.match.params.ClassId);
      let val = '{"class_name":"' + values.class_name + '","class_numeric_name":"' + values.class_numeric_name + '"}';
      const wClause = '{"class_name":"' + this.props.match.params.ClassId+'"}';
      this.props.updateData(val, wClause);
    }
  };
  handleInput = (e) =>
  {
    e.target.value = e.target.value.charAt(0).toUpperCase()+e.target.value.slice(1).toLocaleLowerCase();
  }

  render() {
    // if(this.props.match.params.ClassId === "0")
    // {
    //   datas = {class_name: "", class_numeric_name: ""};
    //   title="Create Class"
    // }
    // else
    // {
    //   datas = {class_name: "Two", class_numeric_name: "2"};
    //   title="Update Class"
    // }
    return (
      <React.Fragment>
        <Breadcrumbs
          breadCrumbLinks={[
            { title: "Class List", link: "/class-list" },
          ]}
          breadCrumbTitle={this.state.title}
          breadCrumbParent="Master Setup"
          breadCrumbActive="Class"
        />
        <Card>
          <CardBody>
            <Formik
              enableReinitialize={true}
              initialValues={{
                class_name: this.state.class_name,
                class_numeric_name: this.state.class_numeric_name
              }}
              validationSchema={formSchema}
              onSubmit={this.handleSubmit}
            >
              {({
                  errors,
                  touched
                }) => (
                <Form>
                  <FormGroup row>
                    <Col md="6" className="my-1">
                      <Label for="class_name">Class Name</Label>
                      <Field
                        name="class_name"
                        id="class_name"
                        // onKeyUp={this.handleInput}
                        className={`form-control ${errors.class_name &&
                        touched.class_name &&
                        "is-invalid"}`}
                      />
                      {errors.class_name && touched.class_name ? (
                        <div className="invalid-tooltip mt-25">{errors.class_name}</div>
                      ) : null}
                    </Col>
                    <Col md="6" className="my-1">
                      <Label for="class_numeric_name">Class Numeric Value</Label>
                      <Field
                        type="number"
                        name="class_numeric_name"
                        id="class_numeric_name"
                        className={`form-control ${errors.class_numeric_name &&
                        touched.class_numeric_name &&
                        "is-invalid"}`}
                      />
                      {errors.class_numeric_name && touched.class_numeric_name ? (
                        <div className="invalid-tooltip mt-25">{errors.class_numeric_name}</div>
                      ) : null}
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
        <ToastContainer />
      </React.Fragment>
    )
  }
}
const mapStateToProps = state => {
  return {
    app: state.classApp.class
  }
}
export default connect(mapStateToProps, {
  postData,
  getData,
  updateData
})(CreateClass)
