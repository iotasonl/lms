import React from "react"
import {
  Card,
  CardBody,
  Input,
} from "reactstrap"
import DataTable from "react-data-table-component"
import { Trash, Edit, Search } from "react-feather"
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb";
import { Link } from "react-router-dom";
import { connect } from "react-redux"
import {
  getData
} from "../../../redux/actions/role/"

const CustomHeader = props => {
  return (
    <div className="position-relative has-icon-left mb-1" style={{ width: '25%', float: 'right' }}>
      <Input value={props.value} onChange={e => props.handleFilter(e)} />
      <div className="form-control-position">
        <Search size="15" />
      </div>
    </div>
  )
}

const columns = [
  {
    name: "Sl.No",
    selector: "id",
    sortable: true
  },
  {
    name: "Role Name",
    selector: "role_name",
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
      roleData: [],
    }
  }

  async componentDidMount() {
    await this.props.getData()
    this.setState({
      data: this.props.app,
    })
    this.state.data && this.state.data.length && this.dataFilter()
  }

  dataFilter = () => {
    const { data } = this.state;
    let filterData = data.map((list, key) => {
      return {
        id: list._id.$oid,
        role_name: list.role_name,
        status: list.status === true ? "ACTIVE" : "DEACTIVE",
        c_date: list.c_date.$date,
        action: (
          <div className="d-flex flex-column align-items-center">
            <ul className="list-inline mb-0">
              <li className="list-inline-item">
                <Link className="text-dark w-100" to={'/role-create/'}>
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
    if (filterData && filterData.length) {
      this.setState({ roleData: filterData })
    }
  }

  handleFilter = e => {
    let value = e.target.value
    let data = this.state.data
    let filteredData = this.state.filteredData
    this.setState({ value })

    if (value.length) {
      filteredData = data.filter(item => {
        let startsWithCondition =
          item.role_name.toLowerCase().startsWith(value.toLowerCase()) ||
          item.id
            .toString()
            .toLowerCase()
            .startsWith(value.toLowerCase())
        let includesCondition =
          item.role_name.toLowerCase().includes(value.toLowerCase()) ||
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


  // [{ "_id": "5ec4ff57010068f4765f41ce" , "role_name": "Admin", "status": true, "c_date": 1589988526809, "d_date": 1589988526809 }]

  render() {
    let { roleData, value, filteredData } = this.state
    return (
      <React.Fragment>
        <Breadcrumbs
          breadCrumbLinks={[
            { title: "Create Role ", link: "/role-create/" + this.RoleId },
          ]}
          breadCrumbTitle="Role List"
          breadCrumbParent="Master Setup"
          breadCrumbActive="Role"
        />
        <Card>
          <CardBody className="rdt_Wrapper">
            <DataTable
              className="dataTable-custom"
              data={value.length ? filteredData : roleData}
              columns={columns}
              noHeader
              pagination
              subHeader
              subHeaderComponent={
                <CustomHeader value={value} handleFilter={this.handleFilter} />
              }
            />
          </CardBody>
        </Card>
      </React.Fragment>
    )
  }
}

// export default RoleList

const mapStateToProps = state => {
  // console.log("state", state.roleApp.role)
  return {
    app: state.roleApp.role
  }
}
export default connect(mapStateToProps, {
  getData
})(RoleList)