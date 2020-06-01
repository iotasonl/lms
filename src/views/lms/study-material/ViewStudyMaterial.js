import React from "react"
import {
  Card,
  CardBody,
  Input,
  Label,
  FormGroup
} from "reactstrap"
import DataTable from "react-data-table-component"
import {Trash, Download, Search} from "react-feather"
import Breadcrumbs from "../../component/breadCrumbs/BreadCrumb";
import {Link } from "react-router-dom";
import Select from "react-select"

const classOption = [
    { value: "", label: "Select.." },
    { value: "One", label: "One" },
    { value: "Two", label: "Two" },
    { value: "Three", label: "Three" },
    { value: "Four", label: "Four" },
    { value: "Five", label: "Five" }
  ]
  const subjectOption = [
    { value: "", label: "Select.." },
    { value: "Science", label: "Science" },
    { value: "Math", label: "Math" },
    { value: "English", label: "English" },
    { value: "SST", label: "SST" },
    { value: "GK", label: "GK" }
  ]
const CustomHeader = props => {
  return (
          <div className="row">
            <FormGroup className="col-md-4 col-sm-4">
              <Label>Select Class</Label>
              <Select
                className="React"
                classNamePrefix="select"
                defaultValue={classOption[0]}
                onChange={e => props.handleSearch(e)}
                name="color"
                options={classOption}
              />
            </FormGroup>
            <FormGroup className="col-md-4 col-sm-4">
              <Label>Select Subject</Label>
              <Select
                className="React"
                classNamePrefix="select"
                defaultValue={subjectOption[0]}
                onChange={e => props.handleSearch(e)}
                name="color"
                options={subjectOption}
              />
            </FormGroup>
            <FormGroup className="col-md-4 col-sm-4 position-relative has-icon-left mb-1">
              <Label> </Label>
              <Input value={props.value} onChange={e => props.handleFilter(e)} />
              <div className="form-control-position" style={{marginTop: '20px'}}>
                  <Search size="15"/>
              </div>
            </FormGroup>
          </div>
  )
}

class ViewStudyMaterial extends React.Component {
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
  StudyMaterialId = 2;
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
        name: "Description",
        selector: "description",
        sortable: true
      },
      {
        name: "File",
        selector: "file",
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
                  <Link className="text-dark w-100" to={'/study-material/add-study-material/'+this.StudyMaterialId}>
                    <Download size="20" className="text-primary" />
                  </Link>
                </li>
                <li className="list-inline-item">
                  <Trash size="20" className="text-primary" onClick={() => {
                        this.materialDelete(this)
                    }} />
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
        description: "Algebra",
        file: "algerbra.pdf",
        action: ""
      },
      {
        id: 2,
        class: "One",
        subject: "Science",
        description: "Food",
        file: "food.pdf",
        action: ""
      },
      {
        id: 3,
        class: "One",
        subject: "English",
        description: "The Post",
        file: "post.jpg",
        action: ""
      },
      {
        id: 4,
        class: "Two",
        subject: "Math",
        description: "Algebra 2",
        file: "algerbra.pdf",
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
            filteredData = data.filter(item => {
              let startsWithCondition =
                item.class.toLowerCase().startsWith(value.toLowerCase()) ||
                item.subject.toLowerCase().startsWith(value.toLowerCase())
              let includesCondition =
                item.class.toLowerCase().startsWith(value.toLowerCase()) ||
                item.subject.toLowerCase().startsWith(value.toLowerCase())

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
          item.description.toLowerCase().startsWith(value.toLowerCase()) ||
          item.id
            .toString()
            .toLowerCase()
            .startsWith(value.toLowerCase())
        let includesCondition =
          item.class.toLowerCase().startsWith(value.toLowerCase()) ||
          item.subject.toLowerCase().startsWith(value.toLowerCase()) ||
          item.description.toLowerCase().startsWith(value.toLowerCase()) ||
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
            { title: "Add Study Material ", link: "/study-material/add-study-material/0"},
          ]}
          breadCrumbTitle="View Study Material"
          breadCrumbParent="Master Setup"
          breadCrumbActive="View Study Material"
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

export default ViewStudyMaterial
