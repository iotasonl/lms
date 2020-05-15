import React from "react";
import themeConfig from "../configs/themeConfig";
import classnames from "classnames";
import { Row } from "reactstrap";

const FullPageLayout = ({ children, ...rest }) => {
  return (
    // <div
    //   className={classnames(
    //     "full-layout wrapper bg-full-screen-image blank-page dark-layout",
    //     {
    //       "layout-dark": themeConfig.layoutDark
    //     }
    //   )}
    // >
    <div
      className={classnames("full-layout wrapper blank-page dark-layout", {
        "layout-dark": themeConfig.layoutDark,
      })}
      // style={{ background: `url(${background})` }}
    >
      <div className="app-content">
        <div className="content-wrapper">
          <div className="content-body">
            <div className="flexbox-container" id="large-header">
              <canvas id="demo-canvas"></canvas>
              <main
                className="main w-100"
                style={{
                  position: "absolute",
                }}
              >
                {children}
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullPageLayout;
