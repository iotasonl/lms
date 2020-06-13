import React, { Fragment } from "react"
import { Card, CardBody, Input, Button, Badge } from "reactstrap"
import DataTable from "react-data-table-component"
import { Trash, Edit, Search } from "react-feather"
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb";
import { Link } from "react-router-dom";
import { connect } from "react-redux"
import { getData } from "../../../redux/actions/role/"
import moment from 'moment'
import { TransverseLoading  } from 'react-loadingg';

const CustomHeader = props => {
  return (
    <Fragment>
      <Link className="btn" to="/role/create">
        <Button size="md" rounded outline color="info" className="float-left">Add</Button>
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
    name: "Created Date",
    selector: "c_date",
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
    await this.props.getData('{}', '{}')
  }

  dataFilter = () => {
    
    const { role: data, loading } = this.props.app;
    const { value, filteredData } = this.state;
    // console.log("ss", loading)
    let filterData = data.map((list, key) => {
      return {
        id: key + 1,
        role_name: list.role_name,
        c_date: moment(list.c_date).format('DD-MM-YYYY'),
        status: (list.status === true ? (
          <Badge color="primary" className="mr-1 mb-1">
            ACTIVE
          </Badge>
        ) : (
            <Badge color="danger" className="mr-1 mb-1">
              INACTIVE
            </Badge>
          )),
        action: (
          <div className="d-flex flex-column align-items-center">
            <ul className="list-inline mb-0">
              <li className="list-inline-item">
                <Link className="text-dark w-100" to={'/role/create/' + list.id}>
                  <Edit size="20" className="text-primary" />
                </Link>
              </li>
              <li className="list-inline-item">
                <Link className="text-dark w-100" to={'/role/create/' + list.id}>
                  <Trash size="20" className="text-primary" />
                </Link>
              </li>
            </ul>
          </div>
        )
      }
    });
    if (!this.state.filterData) {
      this.setState({ filterData })
    }

    if(loading){
      return(
        <div>
          <TransverseLoading  />
        </div>
      )
    }else{
    if (filterData && filterData.length) {
      return (
        <DataTable
          className="dataTable-custom"
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
    }}
  }

  handleFilter = e => {
    let value = e.target.value
    const { filterData } = this.state;
    let filteredData = this.state.filteredData
    this.setState({ value })

    if (value.length) {
      filteredData = filterData.filter(item => {
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

  render() {
    console.log("aaa", this.props.app)
    if (this.props.loading) {
      return <div>Loading</div>
    }
    if (this.props.error) {
      return <div style={{ color: 'red' }}>ERROR: {this.props.error}</div>
    }
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
            {this.props.app && this.dataFilter()}
          </CardBody>
        </Card>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  console.log("state", state.roleApp)
  return {
    app: state.roleApp,
  }
}
export default connect(mapStateToProps, {
  getData
})(RoleList)