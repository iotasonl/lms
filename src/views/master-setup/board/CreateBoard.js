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
import {connect} from "react-redux";
import {postData, getData , updateData} from "../../../redux/actions/board";
import { ToastContainer } from "react-toastify"
import { history } from "../../../history";
const formSchema = Yup.object().shape({
  board_name: Yup.string().required("This Field Is Required"),
  nick_name: Yup.string()
    .required("This Field Is Required"),
  zone_status: Yup.object()
    .shape({
      label: Yup.string().required(),
      value: Yup.string().required(),
    })
    .nullable()
    .required("This Field is required!"),
})

class CreateBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        id: "",
        board_name: "",
        nick_name: "",
        zone_status: [{
          "value": "",
          "label": ""
        }],
      title: 'Create Board'
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async componentDidMount() {
    if(this.props.match.params.Boardid !== "0")
    {
      const jsonData = '{}';
      const wClause = '{"board_name":"' + this.props.match.params.Boardid+'"}';
      await this.props.getData(jsonData, wClause);
      if(this.props.app.length) {
        this.setState({
          id: this.props.app[0].id,
          board_name: this.props.app[0].board_name,
          nick_name: this.props.app[0].nick_name,
          zone_status: [{
            "value": this.props.app[0].zone_status,
            "label": this.props.app[0].zone_status
          }],
          title: "Update Board",
        })
      }
      else {
        history.push("/404")
      }
    }
  }
  handleSubmit = (values) => {
    if(this.props.match.params.Boardid === "0")
    {
      let val = '{"board_name":"' + values.board_name + '","nick_name":"' + values.nick_name + '","zone_status":"' + values.zone_status.label + '"}';
      this.props.postData(val);
    }
    else{
      let val = '{"board_name":"' + values.board_name + '","nick_name":"' + values.nick_name + '","zone_status":"' + values.zone_status.label + '"}';
      const wClause = '{"board_name":"' + this.props.match.params.Boardid+'"}';
      this.props.updateData(val, wClause);
    }
  };

  render() {
    // if(this.props.match.params.Boardid === "0")
    // {
    //   datas = {
    //     id: "",
    //     board_name: "",
    //     nick_name: "",
    //     zone_status: [{
    //       "value": "",
    //       "label": ""
    //     }]
    //   };
    //   title="Create Board";
    // }
    // else
    // {
    //   datas = {
    //     id: "1",
    //     board_name: "JAC",
    //     nick_name: "jac",
    //     zone_status: [{
    //       "value": "2",
    //       "label": "State"
    //     }]
    //   };
    //   title="Update Board";
    // }
    return (
      <React.Fragment>
        <Breadcrumbs
          breadCrumbLinks={[
            { title: "Board List", link: "/board-list" },
          ]}
          breadCrumbTitle={this.state.title}
          breadCrumbParent="Master Setup"
          breadCrumbActive="Board"
        />
        <Card>
          <CardBody>
            <Formik
              enableReinitialize={true}
              initialValues={{
                board_name: this.state.board_name,
                nick_name:this.state.nick_name,
                zone_status: this.state.zone_status
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
                      <Label for="zone_status">Board Type</Label>
                      <FormikReactSelect
                        className={`${
                          errors.boardType &&
                          touched.boardType &&
                          "is-invalid"
                        }`}
                        name="zone_status"
                        id="zone_status"
                        value={values.zone_status}
                        options={[
                          { value: "1", label: "Centeral" },
                          { value: "2", label: "State" },
                        ]}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                      />
                      {errors.zone_status && touched.zone_status ? (
                        <div className="invalid-tooltip mt-25">
                          {errors.zone_status}
                        </div>
                      ) : null}
                    </Col>
                    <Col md="4" className="my-1">
                      <Label for="board_name">Board Name</Label>
                      <Field
                        name="board_name"
                        id="board_name"
                        className={`form-control ${errors.board_name &&
                        touched.board_name &&
                        "is-invalid"}`}
                      />
                      {errors.board_name && touched.board_name ? (
                        <div className="invalid-tooltip mt-25">{errors.board_name}</div>
                      ) : null}
                    </Col>
                    <Col md="4" className="my-1">
                      <Label for="nick_name">Board Nick Name</Label>
                      <Field
                        name="nick_name"
                        id="nick_name"
                        className={`form-control ${errors.nick_name &&
                        touched.nick_name &&
                        "is-invalid"}`}
                      />
                      {errors.nick_name && touched.nick_name ? (
                        <div className="invalid-tooltip mt-25">{errors.nick_name}</div>
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
        <ToastContainer/>
      </React.Fragment>
    )
  }
}
const mapStateToProps = state => {
  return {
    app: state.boardApp.board
  }
}
export default connect(mapStateToProps, {
  postData,
  getData,
  updateData
})(CreateBoard)
