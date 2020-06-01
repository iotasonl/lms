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

class BoardList extends React.Component {
  constructor(props) {
    super(props);
  }
  Boardid = 12;
  state = {
    columns: [
      {
        name: "Sl.No",
        selector: "id",
        sortable: true
      },
      {
        name: "Board Name",
        selector: "board_name",
        sortable: true
      },
      {
        name: "Board Nick Name",
        selector: "nick_name",
        sortable: true
      },
      {
        name: "Board Type",
        selector: "board_type",
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
                  <Link className="text-dark w-100" to={'/board-create/'+this.Boardid}>
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
        board_name: "CBSE",
        nick_name: "cbse",
        board_type: "Centeral",
        action: ""
      },
      {
        id: 2,
        board_name: "ICSE",
        nick_name: "icse",
        board_type: "Centeral",
        action: ""
      },
      {
        id: 3,
        board_name: "JAC",
        nick_name: "jac",
        board_type: "State",
        action: ""
      },
      {
        id: 4,
        board_name: "ICSE",
        nick_name: "icse",
        board_type: "Centeral",
        action: ""
      },
      {
        id: 5,
        board_name: "ICSE",
        nick_name: "icse",
        board_type: "Centeral",
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
          item.board_name.toLowerCase().startsWith(value.toLowerCase()) ||
          item.nick_name.toLowerCase().startsWith(value.toLowerCase()) ||
          item.board_type.toLowerCase().startsWith(value.toLowerCase()) ||
          item.id
            .toString()
            .toLowerCase()
            .startsWith(value.toLowerCase())
        let includesCondition =
          item.board_name.toLowerCase().includes(value.toLowerCase()) ||
          item.nick_name.toLowerCase().includes(value.toLowerCase()) ||
          item.board_type.toLowerCase().includes(value.toLowerCase()) ||
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
            { title: "Create Board ", link: "/board-create/"+this.Boardid },
          ]}
          breadCrumbTitle="Board List"
          breadCrumbParent="Master Setup"
          breadCrumbActive="Board"
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

export default BoardList
