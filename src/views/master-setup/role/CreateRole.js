import React from "react";
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb";
import { Card, CardBody, FormGroup, Button, Col, Label } from "reactstrap"
import { Formik, Field, Form } from "formik"
import * as Yup from "yup"
import { connect } from "react-redux"
import { postData, getData } from "../../../redux/actions/role/"
// import { TransverseLoading } from 'react-loadingg';

const formSchema = Yup.object().shape({
    role_name: Yup.string().required("This Field Is Required"),
})

class CreateRole extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            role_id: '',
            role_name: '',
            title: 'Create Role'
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit = (values) => {
        if (this.state.title === 'Create Role') {
            const role = JSON.stringify(values, null, 2);
            this.props.postData(role);
        } else {
            console.log('val2', values)
        }
    };

    async componentDidMount() {
        const jsonData = '{}';
        const wClause = '{"id":"' + this.props.match.params.roleId + '"}';
        await this.props.getData(jsonData, wClause);
    }

    componentDidUpdate(prevProps, prevState) {
        // console.log("po", prevProps.app, this.props.app)
        if (this.props.app.role && this.props.app.role.length) {
            if (prevProps.app.role !== this.props.app.role && !this.props.app.loading) {
                this.setState({
                    role_name: this.props.app.role[0].role_name,
                    title: "Update Role",
                    role_id: this.props.app.role[0].id
                })
                // this.setState({
                //   role_name: this.props.app.role[0].role_name,
                //   title: "Update Role",
                //   role_id: this.props.app.role[0].id
                // }, ()=>console.log("state", this.state))
            }
        }
    }

    render() {
        const { loading } = this.props.app;
        const { title, role_name } = this.state;
        if (loading) {
            return (
                // <TransverseLoading />
              <React.Fragment>
                Loading..
              </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <Breadcrumbs breadCrumbTitle={title}
                        breadCrumbParent="Master Setup"
                        breadCrumbActive="Role"
                    />
                    <Card >
                        <CardBody >
                            <Formik
                                enableReinitialize={true}
                                initialValues={{
                                    role_name: role_name,
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
                                                <Col md="12" className="my-1">
                                                    <Label for="name" > Role Name </Label>
                                                    <Field
                                                        name="role_name"
                                                        id="role_name"
                                                        className={`form-control ${
                                                            errors.nickname && touched.nickname && "is-invalid"
                                                            }`
                                                        }
                                                    />
                                                    {errors.role_name && touched.role_name ? (
                                                        <div className="invalid-tooltip mt-25" >
                                                            {errors.role_name}
                                                        </div>
                                                    ) : null}
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row >
                                                <Col sm="12" className="my-2" >
                                                    <Button.Ripple
                                                        color="primary"
                                                        type="submit"
                                                        className="mb-1 mr-1" >
                                                        Submit
                                                    </Button.Ripple>
                                                    <Button.Ripple outline color="warning"
                                                        type="reset"
                                                        className="mb-1" >
                                                        Reset
                                                    </Button.Ripple>
                                                </Col>
                                            </FormGroup>
                                        </Form>
                                    )
                                }
                            </Formik>
                        </CardBody>
                    </Card>
                </React.Fragment>
            )
        }
    }
}
const mapStateToProps = state => {
    return {
        app: state.roleApp
    }
}
export default connect(mapStateToProps, {
    postData,
    getData
})(CreateRole)
