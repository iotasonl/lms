import React from "react";
import Breadcrumbs from "../../component/breadCrumbs/BreadCrumb";
import { Card, CardBody, FormGroup, Button, Col, Label } from "reactstrap";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { FormikReactSelect } from "../../../components/hrmsComponent/form/input";
import { connect } from "react-redux";
import { postData } from "../../../redux/actions/board";

let datas, title;
const formSchema = Yup.object().shape({
  name: Yup.string().required("This Field Is Required"),
  nickname: Yup.string().required("This Field Is Required"),
  boardType: Yup.object()
    .shape({
      label: Yup.string().required(),
      value: Yup.string().required(),
    })
    .nullable()
    .required("This Field is required!"),
});

class CreateBoard extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit = (values, { setSubmitting }) => {
    const payload = {
      ...values,
    };
    if (this.props.match.params.id !== "0") {
      console.log("Updating Board..");
    } else {
      const board = JSON.stringify(values, null, 2);
      this.props.postData({ json_data: board, method: "board", type: "i" });
    }
    setTimeout(() => {
      setSubmitting(false);
    }, 1000);
  };

  render() {
    if (this.props.match.params.Boardid === "0") {
      datas = {
        id: "",
        name: "",
        nickname: "",
        boardType: {
          value: "",
          label: "",
        },
      };
      title = "Create Board";
    } else {
      datas = {
        id: "1",
        name: "JAC",
        nickname: "jac",
        boardType: {
          value: "2",
          label: "State",
        },
      };
      title = "Update Board";
    }
    return (
      <React.Fragment>
        <Breadcrumbs
          breadCrumbLinks={[{ title: "Board List", link: "/board-list" }]}
          breadCrumbTitle={title}
          breadCrumbParent="Master Setup"
          breadCrumbActive="Board"
        />
        <Card>
          <CardBody>
            <Formik
              initialValues={{
                name: datas.name,
                nickname: datas.nickname,
                boardType: datas.boardType.value,
              }}
              validationSchema={formSchema}
              onSubmit={this.handleSubmit}
            >
              {({
                setFieldValue,
                setFieldTouched,
                errors,
                touched,
                values,
              }) => (
                <Form>
                  <FormGroup row>
                    <Col md="4" className="my-1">
                      <Label for="boardType">Board Type</Label>
                      <FormikReactSelect
                        className={`${
                          errors.boardType && touched.boardType && "is-invalid"
                        }`}
                        name="boardType"
                        id="boardType"
                        defaultValue={values.boardType}
                        options={[
                          { value: "1", label: "Centeral" },
                          { value: "2", label: "State" },
                        ]}
                        onChange={setFieldValue}
                        onBlur={setFieldTouched}
                      />
                      {errors.boardType && touched.boardType ? (
                        <div className="invalid-tooltip mt-25">
                          {errors.boardType}
                        </div>
                      ) : null}
                    </Col>
                    <Col md="4" className="my-1">
                      <Label for="name">Board Name</Label>
                      <Field
                        name="name"
                        id="name"
                        className={`form-control ${
                          errors.name && touched.name && "is-invalid"
                        }`}
                      />
                      {errors.name && touched.name ? (
                        <div className="invalid-tooltip mt-25">
                          {errors.name}
                        </div>
                      ) : null}
                    </Col>
                    <Col md="4" className="my-1">
                      <Label for="name">Board Nick Name</Label>
                      <Field
                        name="nickname"
                        id="nickname"
                        className={`form-control ${
                          errors.nickname && touched.nickname && "is-invalid"
                        }`}
                      />
                      {errors.nickname && touched.nickname ? (
                        <div className="invalid-tooltip mt-25">
                          {errors.nickname}
                        </div>
                      ) : null}
                    </Col>
                  </FormGroup>
                  <FormGroup row>
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
    );
  }
}
const mapStateToProps = (state) => {
  return {
    app: state.roleApp.boards,
  };
};
export default connect(mapStateToProps, {
  postData,
})(CreateBoard);
