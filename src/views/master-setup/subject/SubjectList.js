import React, { Component, Fragment } from "react"
import {
  Card,
  CardBody,
  Input,
  Button
} from "reactstrap"
import DataTable from "react-data-table-component"
import { Trash, Edit, Search } from "react-feather"
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb";
import { Link } from "react-router-dom";
import { connect } from "react-redux"
import {
  getSubject
} from "../../../redux/actions/subject/"
const CustomHeader = props => {
  return (
    <Fragment>
      <Link className="btn" to="/subject/create/0">
        <Button size="md" outline color="info" className="float-left">Add</Button>
      </Link>
      <div className="position-relative has-icon-left mb-1" style={{ width: '25%', float: 'right' }}>
        <Input value={props.value} onChange={e => props.handleFilter(e)} />
        <div className="form-control-position">
          <Search size="15" />
        </div>
      </div>
    </Fragment>
  )
}

const columns = [
  {
    name: "Sl.No",
    selector: "id",
    sortable: true,
    width: "80px"
  },
  {
    name: "Subject Name",
    selector: "subject_name",
    sortable: true
  },
  {
    name: "Subject Nick Name",
    selector: "subject_nick_name",
    sortable: true
  },
  {
    name: "Status",
    selector: "status",
    sortable: true,
  },
  {
    name: "Action",
    selector: "action",
    sortable: false,
  }
]

class RoleList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      value: "",
      filteredData: [],
    }
  }

  async componentDidMount() {
    await this.props.getSubject()
  }

  dataFilter = () => {
    const { app: data } = this.props;
    const { value, filteredData } = this.state;
    let filterData = data.map((list, key) => {
      return {
        id: key + 1,
        subject_name: list.subject_name,
        subject_nick_name: list.subject_nick_name,
        status: list.status === true ? "ACTIVE" : "DEACTIVE",
        c_date: list.c_date.$date,
        action: (
          <div className="d-flex flex-column align-items-center">
            <ul className="list-inline mb-0">
              <li className="list-inline-item">
                <Link className="text-dark w-100" to={'create/' + list._id.$oid}>
                  <Edit size="20" className="text-primary" />
                </Link>
              </li>
              <li className="list-inline-item">
                <Trash size="20" className="text-primary" />
              </li>
            </ul>
          </div>
        )
      }
    });
    if (!this.state.filterData) {
      this.setState({ filterData })
    }

    if (filterData && filterData.length) {

      return (
        <DataTable
          className="dataTable-custom"
          // data={filterData}
          data={value.length ? filteredData : filterData}
          columns={columns}
          noHeader
          pagination
          subHeader
          subHeaderComponent={
            <CustomHeader handleFilter={this.handleFilter} />
          }
        />
      )
    }
  }

  handleFilter = e => {
    let value = e.target.value
    const { filterData } = this.state;
    let filteredData = this.state.filteredData
    this.setState({ value })

    if (value.length) {
      filteredData = filterData.filter(item => {
        let startsWithCondition =
          item.subject_name.toLowerCase().startsWith(value.toLowerCase()) ||
          item.id
            .toString()
            .toLowerCase()
            .startsWith(value.toLowerCase())
        let includesCondition =
          item.subject_name.toLowerCase().includes(value.toLowerCase()) ||
          item.id
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())

        if (startsWithCondition) {
          return startsWithCondition
        } else if (!startsWithCondition && includesCondition) {
          return includesCondition
        } else return null
      })
      this.setState({ filteredData })
    }
  }


  // [{ "_id": "5ec4ff57010068f4765f41ce" , "subject_name": "Admin", "status": true, "c_date": 1589988526809, "d_date": 1589988526809 }]

  render() {
    // console.log("props", this.state)
    return (
      <React.Fragment>
        <Breadcrumbs
          breadCrumbLinks={[
            { title: "Create Role ", link: "/role/create/" + this.RoleId },
          ]}
          breadCrumbTitle="Role List"
          breadCrumbParent="Master Setup"
          breadCrumbActive="Role"
        />
        <Card>
          <CardBody className="rdt_Wrapper">
            {this.props.app && this.dataFilter()}
          </CardBody>
        </Card>
      </React.Fragment>
    )
  }
}


const mapStateToProps = state => {
  console.log("a", state)
  return {
    app: state.subjectApp.role
  }
}
export default connect(mapStateToProps, {
  getSubject
})(RoleList)