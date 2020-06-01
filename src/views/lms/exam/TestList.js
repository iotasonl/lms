import React from "react"
import {
  Card,
  CardBody,
  Input,
  Label
} from "reactstrap"
import DataTable from "react-data-table-component"
import {Trash, Edit, Search} from "react-feather"
import Breadcrumbs from "../../component/breadCrumbs/BreadCrumb";
import {Link } from "react-router-dom";
import Select from "react-select"

const colourOptions = [
    { value: "", label: "Select.." },
    { value: "One", label: "One" },
    { value: "Two", label: "Two" },
    { value: "Three", label: "Three" },
    { value: "Four", label: "Four" },
    { value: "Five", label: "Five" }
  ]
const CustomHeader = props => {
  return (
    <div className="d-flex flex-wrap justify-content-between">
        <div className="add-new" style={{width:'180px'}}>
            <Label>Select Class</Label>
        <Select
            className="React"
            classNamePrefix="select"
            defaultValue={colourOptions[0]}
            onChange={e => props.handleSearch(e)}
            name="color"
            options={colourOptions}
        />
        </div>
        <div className="position-relative has-icon-left mb-1">
        <Input value={props.value} onChange={e => props.handleFilter(e)} />
        <div className="form-control-position">
            <Search size="15" />
        </div>
        </div>
    </div>
  )
}

class TestList extends React.Component {
  constructor(props) {
    super(props);
    this.materialDelete = this.materialDelete.bind(this);
  }
  materialDelete=(e)=>{
      console.log(e);
    // const filteredItems= this.state.items.filter(item =>
    //   item.key!==key);
    // this.setState({
    //   items: filteredItems
    // })
  }
  TestId = 2;
  state = {
    columns: [
      {
        name: "Sl.No",
        selector: "id",
        sortable: true
      },
      {
        name: "Class",
        selector: "class",
        sortable: true
      },
      {
        name: "Subject",
        selector: "subject",
        sortable: true
      },
      {
        name: "Test Name",
        selector: "test_name",
        sortable: true
      },
      {
        name: "Test Date",
        selector: "date",
        sortable: true
      },
      {
        name: "Test Duration",
        selector: "duration",
        sortable: true
      },
      {
        name: "Total Marks",
        selector: "marks",
        sortable: true
      },
      {
        name: "Action",
        selector: "",
        sortable: false,
        cell: () => {
          return (
            <div className="d-flex flex-column align-items-center">
              <ul className="list-inline mb-0">
                <li className="list-inline-item">
                  <Link className="text-dark w-100" to={'/exam/create-test/'+this.TestId}>
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
        class: "One",
        subject: "Math",
        test_name: "Weekly Test",
        date: "2020-05-26",
        duration: "20 Min",
        marks: "20",
        action: ""
      },
      {
        id: 2,
        class: "One",
        subject: "English",
        test_name: "Weekly Test",
        date: "2020-05-26",
        duration: "20 Min",
        marks: "20",
        action: ""
      },
      {
        id: 3,
        class: "Two",
        subject: "Math",
        test_name: "Weekly Test",
        date: "2020-05-27",
        duration: "20 Min",
        marks: "20",
        action: ""
      },
      {
        id: 4,
        class: "Two",
        subject: "Science",
        test_name: "Weekly Test",
        date: "2020-05-27",
        duration: "20 Min",
        marks: "10",
        action: ""
      },
    ],
    value: "",
    filteredData: []
  }

  handleSearch = e =>{
        let value = e.value;
        let data = this.state.data
        let filteredData = this.state.filteredData
        this.setState({ value })
        if (value.length) {
            console.log(value)
            filteredData = data.filter(item => {
              let startsWithCondition =
                item.class.toLowerCase().startsWith(value.toLowerCase())
              let includesCondition =
                item.class.toLowerCase().startsWith(value.toLowerCase())

              if (startsWithCondition) {
                return startsWithCondition
              } else if (!startsWithCondition && includesCondition) {
                return includesCondition
              } else return null
            })
            this.setState({ filteredData })
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
          item.class.toLowerCase().startsWith(value.toLowerCase()) ||
          item.subject.toLowerCase().startsWith(value.toLowerCase()) ||
          item.duration.toLowerCase().startsWith(value.toLowerCase()) ||
          item.test_name.toLowerCase().startsWith(value.toLowerCase()) ||
          item.marks
            .toString()
            .toLowerCase()
            .startsWith(value.toLowerCase()) ||
        item.date
            .toString()
            .toLowerCase()
            .startsWith(value.toLowerCase()) ||
          item.id
            .toString()
            .toLowerCase()
            .startsWith(value.toLowerCase())
        let includesCondition =
          item.class.toLowerCase().startsWith(value.toLowerCase()) ||
          item.subject.toLowerCase().startsWith(value.toLowerCase()) ||
          item.duration.toLowerCase().startsWith(value.toLowerCase()) ||
          item.test_name.toLowerCase().startsWith(value.toLowerCase()) ||
          item.marks
            .toString()
            .toLowerCase()
            .startsWith(value.toLowerCase()) ||
          item.date
            .toString()
            .toLowerCase()
            .startsWith(value.toLowerCase()) ||
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
            { title: "Create Test", link: "/exam/create-test/0"},
          ]}
          breadCrumbTitle="Test List"
          breadCrumbParent="Materials"
          breadCrumbActive="Test List"
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
                <CustomHeader value={value} handleFilter={this.handleFilter} handleSearch={this.handleSearch} />
              }
            />
          </CardBody>
        </Card>
      </React.Fragment>
    )
  }
}

export default TestList
