import React from "react";
import {
  Collapse,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import classnames from "classnames";
import { Eye, Code, ChevronDown } from "react-feather";
import BreadCrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb";
const collapseItems = [
  {
    id: 0,
    title: "Collapse Item 1",
    content:
      "Pie dragée muffin. Donut cake liquorice marzipan carrot cake topping powder candy. Sugar plum brownie brownie cotton candy.",
  },
  {
    id: 1,
    title: "Collapse Item 2",
    content:
      "Jelly-o brownie marshmallow soufflé I love jelly beans oat cake. I love gummies chocolate bar marshmallow sugar plum.",
  },
  {
    id: 2,
    title: "Collapse Item 3",
    content:
      "Pudding lollipop dessert chocolate gingerbread. Cake cupcake bonbon cupcake marshmallow. Gummi bears carrot cake bonbon cake.",
  },
  {
    id: 3,
    title: "Collapse Item 4",
    content:
      "Brownie sweet carrot cake dragée caramels fruitcake. Gummi bears tootsie roll croissant gingerbread dragée tootsie roll.",
  },
];

class SyllabusList extends React.Component {
  state = {
    activeTab: "1",
    collapseItems: [],
    status: "Closed",
  };

  toggleTab = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab });
    }
  };

  toggleCollapse = (collapseID) => {
    let index = this.state.collapseItems.indexOf(collapseID);
    if (index >= 0) {
      let items = this.state.collapseItems;
      items.splice(index, index + 1);
      this.setState({ collapseItems: items });
    } else {
      let items = this.state.collapseItems;
      items.push(collapseID);
      this.setState({ collapseItems: items });
    }
  };

  onEntered = (id) => {
    if (this.state.collapseItems.includes(id))
      this.setState({ status: "Opened" });
  };
  onEntering = (id) => {
    if (this.state.collapseItems.includes(id))
      this.setState({ status: "Opening..." });
  };

  onExited = (id) => {
    if (this.state.collapseItems.includes(id))
      this.setState({ status: "Closed" });
  };

  onExiting = (id) => {
    if (this.state.collapseItems.includes(id))
      this.setState({ status: "Closing..." });
  };

  render() {
    const renderCollapse = collapseItems.map((collapseItem) => {
      return (
        <div className="collapse-margin" key={collapseItem.id}>
          <Card
            key={collapseItem.id}
            onClick={() => this.toggleCollapse(collapseItem.id)}
            className={classnames({
              "collapse-collapsed":
                this.state.status === "Closed" &&
                this.state.collapseItems.includes(collapseItem.id),
              "collapse-shown":
                this.state.status === "Opened" &&
                this.state.collapseItems.includes(collapseItem.id),
              closing:
                this.state.status === "Closing..." &&
                this.state.collapseItems.includes(collapseItem.id),
              opening:
                this.state.status === "Opening..." &&
                this.state.collapseItems.includes(collapseItem.id),
            })}
          >
            <CardHeader>
              <CardTitle className="lead collapse-title collapsed">
                {collapseItem.id + 1 + ". " + collapseItem.title}
              </CardTitle>
              <ChevronDown size={15} className="collapse-icon" />
            </CardHeader>
            <Collapse
              isOpen={this.state.collapseItems.includes(collapseItem.id)}
              onEntering={() => this.onEntering(collapseItem.id)}
              onEntered={() => this.onEntered(collapseItem.id)}
              onExiting={() => this.onExiting(collapseItem.id)}
              onExited={() => this.onExited(collapseItem.id)}
            >
              <CardBody>{collapseItem.content}</CardBody>
            </Collapse>
          </Card>
        </div>
      );
    });

    return (
      <React.Fragment>
        <BreadCrumbs
          breadCrumbLinks={[
            { title: "Add Syllabus", link: "/syllabus/addSyllabus" },
            { title: "Bulk Upload", link: "/syllabus/syllabusBulkUpload" },
          ]}
          breadCrumbTitle="View Syllabus"
          breadCrumbParent="Syllabus"
          breadCrumbActive="View Syllabus"
        />
        <Card>
          <CardBody>
            <div className="vx-collapse collapse-bordered">
              {renderCollapse}
            </div>
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}
export default SyllabusList;
