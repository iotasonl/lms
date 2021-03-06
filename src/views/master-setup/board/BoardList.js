import React from "react"
import {
  Card,
  CardBody,
  Input,
} from "reactstrap"
import DataTable from "react-data-table-component"
import {Trash, Edit, Search} from "react-feather"
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb";
import {Link } from "react-router-dom";
import { connect } from "react-redux"
import {
  getData
} from "../../../redux/actions/board/"
import { ToastContainer } from "react-toastify"

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

const columns =  [
  {
    name: "Sl.NO",
    selector: "id",
    sortable: true
  },
  {
    name: "BOARD NAME",
    selector: "board_name",
    sortable: true
  },
  {
    name: "BOARD NICK NAME",
    selector: "nick_name",
    sortable: true
  },
  {
    name: "BOARD TYPE",
    selector: "zone_status",
    sortable: true
  },
  {
    name: "STATUS",
    selector: "status",
    sortable: true,
  },
  {
    name: "ACTION",
    selector: "action",
    sortable: false,
  }
]

class BoardList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      value: "",
      filteredData: [],
    }
  }

  async componentDidMount() {
    await this.props.getData("{}", "{}")
  }

  dataFilter = ()=>{
    const {app: data} = this.props;
    const {value, filteredData} = this.state;
    let filterData = data.map((list, key)=>{
      return {
        id:++key,
        board_name: list.board_name,
        nick_name: list.nick_name,
        zone_status: list.zone_status,
        status: list.status === true ? "ACTIVE" : "DEACTIVE",
        action: (
          <div className="d-flex flex-column align-items-center">
            <ul className="list-inline mb-0">
              <li className="list-inline-item">
                <Link className="text-dark w-100" to={'/board-create/'+list.board_name}>
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
    if(!this.state.filterData)
    {
      this.setState({filterData})
    }

    if(filterData && filterData.length){
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
    }
  }

  handleFilter = e => {
    let value = e.target.value
    const {filterData} = this.state;
    let filteredData = this.state.filteredData
    this.setState({ value })

    if (value.length) {
      filteredData = filterData.filter(item => {
        let startsWithCondition =
          item.board_name.toLowerCase().startsWith(value.toLowerCase()) ||
          item.nick_name.toLowerCase().startsWith(value.toLowerCase()) ||
          item.zone_status.toLowerCase().startsWith(value.toLowerCase()) ||
          item.id
            .toString()
            .toLowerCase()
            .startsWith(value.toLowerCase())
        let includesCondition =
          item.board_name.toLowerCase().includes(value.toLowerCase()) ||
          item.nick_name.toLowerCase().includes(value.toLowerCase()) ||
          item.zone_status.toLowerCase().includes(value.toLowerCase()) ||
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
    return (
      <React.Fragment>
        <Breadcrumbs
          breadCrumbLinks={[
            { title: "Create Board ", link: "/board-create/0"},
          ]}
          breadCrumbTitle="Board List"
          breadCrumbParent="Master Setup"
          breadCrumbActive="Board"
        />
        <Card>
          <CardBody className="rdt_Wrapper">
            {this.props.app && this.dataFilter()}
          </CardBody>
        </Card>
        <ToastContainer />
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
  getData
})(BoardList)
