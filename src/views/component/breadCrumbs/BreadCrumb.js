import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  UncontrolledButtonDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";
import { Home, Settings } from "react-feather";
import { NavLink } from "react-router-dom";
class BreadCrumbs extends React.Component {
  render() {
    // let rightOptions = this.props.rightOptions;
    // let breadCrumbsRightOptions = rightOptions.map((option) => {
    //   return (
    //     <DropdownItem tag="li">
    //       <NavLink className="text-dark w-100" to={option.link}>
    //         {option.title}
    //       </NavLink>
    //     </DropdownItem>
    //   );
    // });
    return (
      <div className="content-header row">
        <div className="content-header-left col-md-9 col-12 mb-2">
          <div className="row breadcrumbs-top">
            <div className="col-12">
              {this.props.breadCrumbTitle ? (
                <h2 className="content-header-title float-left mb-0">
                  {this.props.breadCrumbTitle}
                </h2>
              ) : (
                ""
              )}
              <div className="breadcrumb-wrapper vx-breadcrumbs d-sm-block d-none col-12">
                <Breadcrumb tag="ol">
                  <BreadcrumbItem tag="li">
                    <NavLink to="/">
                      <Home className="align-top" size={15} />
                    </NavLink>
                  </BreadcrumbItem>
                  <BreadcrumbItem tag="li" className="text-primary">
                    {this.props.breadCrumbParent}
                  </BreadcrumbItem>
                  {this.props.breadCrumbParent2 ? (
                    <BreadcrumbItem tag="li" className="text-primary">
                      {this.props.breadCrumbParent2}
                    </BreadcrumbItem>
                  ) : (
                    ""
                  )}
                  {this.props.breadCrumbParent3 ? (
                    <BreadcrumbItem tag="li" className="text-primary">
                      {this.props.breadCrumbParent3}
                    </BreadcrumbItem>
                  ) : (
                    ""
                  )}
                  <BreadcrumbItem tag="li" active>
                    {this.props.breadCrumbActive}
                  </BreadcrumbItem>
                </Breadcrumb>
              </div>
            </div>
          </div>
        </div>
        <div className="content-header-right text-md-right col-md-3 col-12 d-md-block d-none">
          <div className="form-group breadcrum-right dropdown">
            <UncontrolledButtonDropdown>
              <DropdownToggle
                color="primary"
                size="sm"
                className="btn-icon btn-round dropdown-toggle"
              >
                <Settings
                  size={14}
                  style={{
                    left: 0,
                  }}
                />
              </DropdownToggle>
              <DropdownMenu tag="ul" right>
                { this.props.breadCrumbLinks.map(links =>
                  <DropdownItem tag="li" key={links.title}>
                    <NavLink className="text-dark w-100" to={links.link}>
                      {links.title}
                    </NavLink>
                  </DropdownItem>
                )}
              </DropdownMenu>
            </UncontrolledButtonDropdown>
          </div>
        </div>
      </div>
    );
  }
}
export default BreadCrumbs;
