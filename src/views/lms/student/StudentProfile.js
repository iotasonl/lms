import React from "react";
import {
    Col,
    Row,
    Card,
    CardHeader,
    CardTitle,
    CardBody,
} from "reactstrap";
import Breadcrumbs from "../../component/breadCrumbs/BreadCrumb";
import "flatpickr/dist/themes/light.css";
import "../../../assets/scss/plugins/forms/flatpickr/flatpickr.scss"
import coverImg from "../../../assets/img/profile/user-uploads/cover.jpg"
import profileImg from "../../../assets/img/profile/user-uploads/user-13.jpg"
import "../../../assets/scss/pages/users-profile.scss"
import "../../../assets/scss/pages/users.scss"

let datas;
class StudentProfile extends React.Component {
    StudentId = 2;
    state = {
        isOpen: false
      }

      toggle = () => {
        this.setState({
          isOpen: !this.state.isOpen
        })
      }
    render(){
        datas = {
            first_name: "Rahul",
            last_name: "Kumar",
            username: "rkumar",
            email: "rkumar@gmail.com",
            phone: "9110181521",
            studentClass:"Two",
            gender: "Male",
            dob: "22/05/2015",
            address: "Ranchi",
            state: "Jharkhand",
            city: "Ranchi",
            pin: "834005",
            profile_pic: "",
            father_name: "Mukesh Kumar",
            guardian_name: "Mukesh Kumar",
            guardian_phone: "1234567899",
            guardian_email: "mukesh@gmail.com",
            relation:"Father",
            checkbox_value:"",
            };
        return(
            <React.Fragment>
                <Breadcrumbs
                    breadCrumbLinks={[
                        { title: "Edit Details", link: "/student/add-student/"+this.StudentId }
                    ]}
                    breadCrumbTitle="Student Profile"
                    breadCrumbParent="Student"
                    breadCrumbActive="Student Profile"
                    />
                <div id="user-profile">
                    <Row>
                        <Col sm="12" className="mb-3">
                            <div className="profile-header mb-2">
                                <div className="position-relative">
                                    <div className="cover-container">
                                        <img
                                        src={coverImg}
                                        alt="CoverImg"
                                        className="img-fluid bg-cover w-100 rounded-0"
                                        />
                                    </div>
                                    <div className="profile-img-container d-flex align-items-center justify-content-between">
                                        <img
                                        src={profileImg}
                                        alt="porfileImg"
                                        className="img-fluid img-border rounded-circle box-shadow-1"
                                        />
                                        <div className="float-right">
                                            {/* <Link className="text-dark w-100" to={'/student/add-student/'+this.StudentId}>
                                                <Button color="primary" className="btn-icon rounded-circle mr-1">
                                                    <Settings size={17} />
                                                </Button>
                                            </Link> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col sm="12" md="6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Gurdian Details</CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <div className="users-page-view-table">
                                    <div className="d-flex user-info">
                                        <div className="user-info-title font-weight-bold">
                                         Name
                                        </div>
                                        <div>{datas.guardian_name}</div>
                                    </div>
                                    <div className="d-flex user-info">
                                        <div className="user-info-title font-weight-bold">
                                        Mobile
                                        </div>
                                        <div>{datas.guardian_phone}</div>
                                    </div>
                                    <div className="d-flex user-info">
                                        <div className="user-info-title font-weight-bold">
                                        Email
                                        </div>
                                        <div className="text-truncate">{datas.guardian_email}</div>
                                    </div>
                                    <div className="d-flex user-info">
                                        <div className="user-info-title font-weight-bold">
                                        Relation
                                        </div>
                                        <div className="text-truncate">{datas.relation}</div>
                                    </div>
                                    </div>
                                </CardBody>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Contact Details</CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <div className="users-page-view-table">
                                    <div className="d-flex user-info">
                                        <div className="user-info-title font-weight-bold">
                                         City
                                        </div>
                                        <div>{datas.city}</div>
                                    </div>
                                    <div className="d-flex user-info">
                                        <div className="user-info-title font-weight-bold">
                                        Address
                                        </div>
                                        <div>{datas.address},{datas.pin}</div>
                                    </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col sm="12" md="6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Student Basic Details</CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <div className="users-page-view-table">
                                    <div className="d-flex user-info">
                                        <div className="user-info-title font-weight-bold">
                                         First Name
                                        </div>
                                        <div className="text-truncate">
                                            {datas.first_name}
                                        </div>
                                    </div>
                                    <div className="d-flex user-info">
                                        <div className="user-info-title font-weight-bold">
                                        Last Name
                                        </div>
                                        <div className="text-truncate">
                                            {datas.last_name}
                                        </div>
                                    </div>
                                    <div className="d-flex user-info">
                                        <div className="user-info-title font-weight-bold">
                                        Username
                                        </div>
                                        <div className="text-truncate">
                                            {datas.username}
                                        </div>
                                    </div>
                                    <div className="d-flex user-info">
                                        <div className="user-info-title font-weight-bold">
                                        Date Of Birth
                                        </div>
                                        <div className="text-truncate">
                                            {datas.dob}
                                        </div>
                                    </div>
                                    <div className="d-flex user-info">
                                        <div className="user-info-title font-weight-bold">
                                        Gender
                                        </div>
                                        <div className="text-truncate">
                                            {datas.gender}
                                        </div>
                                    </div>
                                    <div className="d-flex user-info">
                                        <div className="user-info-title font-weight-bold">
                                        Phone No
                                        </div>
                                        <div className="text-truncate">
                                            {datas.phone}
                                        </div>
                                    </div>
                                    <div className="d-flex user-info">
                                        <div className="user-info-title font-weight-bold">
                                        Email Id
                                        </div>
                                        <div className="text-truncate">
                                            {datas.email}
                                        </div>
                                    </div>
                                    <div className="d-flex user-info">
                                        <div className="user-info-title font-weight-bold">
                                        Class
                                        </div>
                                        <div className="text-truncate">
                                            {datas.studentClass}
                                        </div>
                                    </div>
                                    <div className="d-flex user-info">
                                        <div className="user-info-title font-weight-bold">
                                        State
                                        </div>
                                        <div className="text-truncate">
                                            {datas.state}
                                        </div>
                                    </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </React.Fragment>
        )
    }
}
export default StudentProfile;
