import React from "react";
import { Row, Col } from "reactstrap";
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb";
import StudentListConfig from "./StudentListConfig";
import queryString from "query-string";
class StudentList extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Breadcrumbs
          breadCrumbLinks={[
            { title: "Bulk Upload", link: "/student/student-bulk-upload" },
          ]}
          breadCrumbTitle="Student List"
          breadCrumbParent="Student"
          breadCrumbActive="Student List"
        />
        <Row>
          <Col sm="12">
            <StudentListConfig
              thumbView={true}
              parsedFilter={queryString.parse(this.props.location.search)}
            />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default StudentList;
