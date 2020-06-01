import React from "react"
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Badge,
  Input,
  Button
} from "reactstrap"
import DataTable from "react-data-table-component"
import {Trash, Edit, Search, Star} from "react-feather"
import {title} from "react-bootstrap-sweetalert/dist/styles/SweetAlertStyles";
import Breadcrumbs from "../../component/breadCrumbs/BreadCrumb";
import {Link } from "react-router-dom";

const CustomHeader = props => {
  return (
      <div className="position-relative has-icon-left mb-1" style={{width:'25%' , float:'right'}}>
        <Input value={props.value} onChange={e => props.handleFilter(e)} />
        <div className="form-control-position">
          <Search size="15" />
        </div>
      </div>
  )
}

class ClassList extends React.Component {
  constructor(props) {
    super(props);
  }
  ClassId=5;
  state = {
    columns: [
      {
        name: "Sl.No",
        selector: "id",
        sortable: true
      },
      {
        name: "Class Name",
        selector: "class_name",
        sortable: true
      },
      {
        name: "Numeric Value",
        selector: "numeric_value",
        sortable: true
      },
      {
        name: "Action",
        selector: "",
        sortable: false,
        cell: row => {
          return (
            <div className="d-flex flex-column align-items-center">
              <ul className="list-inline mb-0">
                <li className="list-inline-item">
                  <Link className="text-dark w-100" to={'/class-create/'+this.ClassId}>
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
      }
    ],
    data: [
      {
        id: 1,
        class_name: "One",
        numeric_value: "1",
        action: ""
      },
      {
        id: 2,
        class_name: "Two",
        numeric_value: "2",
        action: ""
      },
      {
        id: 3,
        class_name: "Four",
        numeric_value: "4",
        action: ""
      },
      {
        id: 4,
        class_name: "Five",
        numeric_value: "5",
        action: ""
      }
    ],
    value: "",
    filteredData: []
  }

  handleFilter = e => {
    let value = e.target.value
    let data = this.state.data
    let filteredData = this.state.filteredData
    this.setState({ value })

    if (value.length) {
      filteredData = data.filter(item => {
        let startsWithCondition =
          item.class_name.toLowerCase().startsWith(value.toLowerCase()) ||
          item.id
            .toString()
            .toLowerCase()
            .startsWith(value.toLowerCase())
        let includesCondition =
          item.class_name.toLowerCase().includes(value.toLowerCase()) ||
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
    let { columns, data, value, filteredData } = this.state
    return (
      <React.Fragment>
        <Breadcrumbs
          breadCrumbLinks={[
            { title: "Create Class ", link: "/class-create/"+this.ClassId },
          ]}
          breadCrumbTitle="Class List"
          breadCrumbParent="Master Setup"
          breadCrumbActive="Class"
        />
        <Card>
          <CardBody className="rdt_Wrapper">
            <DataTable
              className="dataTable-custom"
              data={value.length ? filteredData : data}
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

export default ClassList
