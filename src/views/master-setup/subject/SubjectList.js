import React from "react"
import {
  Card,
  CardBody,
  Input,
} from "reactstrap"
import DataTable from "react-data-table-component"
import {Trash, Edit, Search} from "react-feather"
import Breadcrumbs from "../../component/breadCrumbs/BreadCrumb";
import {Link } from "react-router-dom";
import { connect } from "react-redux"
import {
  getData
} from "../../../redux/actions/subject/"
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
    name: "SUBJECT NAME",
    selector: "subject_name",
    sortable: true
  },
  {
    name: "SUBJECT NICK NAME",
    selector: "subject_nick_name",
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

class SubjectList extends React.Component {
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
        subject_name: list.subject_name,
        subject_nick_name: list.subject_nick_name,
        status: list.status === true ? "ACTIVE" : "DEACTIVE",
        action: (
          <div className="d-flex flex-column align-items-center">
            <ul className="list-inline mb-0">
              <li className="list-inline-item">
                <Link className="text-dark w-100" to={'/subject-create/'+list.id}>
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
          item.subject_name.toLowerCase().startsWith(value.toLowerCase()) ||
          item.subject_nick_name.toLowerCase().startsWith(value.toLowerCase()) ||
          item.id
            .toString()
            .toLowerCase()
            .startsWith(value.toLowerCase())
        let includesCondition =
          item.subject_name.toLowerCase().includes(value.toLowerCase()) ||
          item.subject_nick_name.toLowerCase().includes(value.toLowerCase()) ||
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
            { title: "Create Subject ", link: "/subject-create/0"},
          ]}
          breadCrumbTitle="Subject List"
          breadCrumbParent="Master Setup"
          breadCrumbActive="Subject"
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
    app: state.subjectApp.subject
  }
}
export default connect(mapStateToProps, {
  getData
})(SubjectList)
