import React from "react"
import {
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    Badge,
    Input,
    Button,
} from "reactstrap"
import DataTable from "react-data-table-component"
import {
    Edit,
    Trash,
    ChevronDown,
    Check,
    ChevronLeft,
    ChevronRight,
    Search
} from "react-feather"

const CustomHeader = props => {
    return (
        <div className="d-flex flex-wrap justify-content-between">
            <div className="add-new">
                <Button.Ripple color="primary">Add New</Button.Ripple>
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

class Teacher_list extends React.Component {
    state = {
        columns: [
            {
                name: "Name",
                selector: "name",
                sortable: true,
                minWidth: "200px",
                cell: row => (
                    <div className="d-flex flex-xl-row flex-column align-items-xl-center align-items-start py-xl-0 py-1">
                        <div className="user-img ml-xl-0 ml-2">
                            <img
                                className="img-fluid rounded-circle"
                                height="36"
                                width="36"
                                src={row.image}
                                alt={row.name}
                            />
                        </div>
                        <div className="user-info text-truncate ml-xl-50 ml-0">
                            <span
                                title={row.name}
                                className="d-block text-bold-500 text-truncate mb-0">
                                {row.name}
                            </span>
                            <small title={row.email}>{row.email}</small>
                        </div>
                    </div>
                )
            },
            {
                name: "Phone Number",
                selector: "phone",
                sortable: true,
                cell: row => (
                    <p className="text-bold-500 text-truncate mb-0">{row.phone}</p>
                )
            },
            {
                name: "Class",
                selector: "class",
                sortable: true,
                cell: row => <p className="text-bold-500 mb-0">{row.class}</p>
            },
            {
                name: "Subject",
                selector: "subject",
                sortable: true,
                cell: row => <p className="text-bold-500 mb-0">{row.subject}</p>
            },
            {
                name: "Status",
                selector: "status",
                sortable: true,
                cell: row => (
                    <Badge
                        color={row.status === "inactive" ? "light-danger" : "light-success"}
                        pill>
                        {row.status}
                    </Badge>
                )
            },
            {
                name: "Action",
                selector: "",
                sortable: true,
                cell: row => (
                    <div>
                        <Edit
                            className="cursor-pointer mr-1"
                            size={20}
                            onClick={() => {}}
                        />
                        <Trash
                            className="cursor-pointer"
                            size={20}
                            onClick={() => {}}
                        />
                    </div>
                )
            }
        ],
        data: [
            {
                image: require("../../../assets/img/portrait/small/avatar-s-2.jpg"),
                name: "Abhishek",
                email: "alillecrop0@twitpic.com",
                phone: "7004814010",
                class: "1",
                subject: "Hindi",
                status: "Active",
            },
            {
                image: require("../../../assets/img/portrait/small/avatar-s-17.jpg"),
                name: "Rohit Kumar",
                email: "barnwalrohit@gmail.com",
                phone: "7004814010",
                class: "1",
                subject: "Hindi",
                status: "Active",
            },
            {
                image: require("../../../assets/img/portrait/small/avatar-s-20.jpg"),
                name: "Chandan",
                email: "atrenholm4@slideshare.net	",
                phone: "7004814010",
                class: "1",
                subject: "Hindi",
                status: "Inctive",
            },
            {
                image: require("../../../assets/img/portrait/small/avatar-s-12.jpg"),
                name: "Ashish",
                email: "hsoaperh@mapy.cz",
                phone: "7004814010",
                class: "1",
                subject: "Hindi",
                status: "Active",
            }
        ],
        filteredData: [],
        value: ""
    }

    handleFilter = e => {
        let value = e.target.value
        let data = this.state.data
        let filteredData = this.state.filteredData
        this.setState({ value })

        if (value.length) {
            filteredData = data.filter(item => {
                let startsWithCondition =
                    item.name.toLowerCase().startsWith(value.toLowerCase()) ||
                    item.date.toLowerCase().startsWith(value.toLowerCase()) ||
                    item.email.toLowerCase().startsWith(value.toLowerCase()) ||
                    item.revenue.toLowerCase().startsWith(value.toLowerCase()) ||
                    item.status.toLowerCase().startsWith(value.toLowerCase())
                let includesCondition =
                    item.name.toLowerCase().includes(value.toLowerCase()) ||
                    item.date.toLowerCase().includes(value.toLowerCase()) ||
                    item.email.toLowerCase().includes(value.toLowerCase()) ||
                    item.revenue.toLowerCase().includes(value.toLowerCase()) ||
                    item.status.toLowerCase().includes(value.toLowerCase())

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
        let { data, columns, value, filteredData } = this.state
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Teacher List</CardTitle>
                </CardHeader>
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
        )
    }
}

export default Teacher_list
