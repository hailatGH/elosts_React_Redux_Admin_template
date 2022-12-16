import { Breadcrumb } from "antd";
import { NavLink } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="page_wraper">
      <Breadcrumb className="breadCrumb">
        <Breadcrumb.Item>
          <NavLink to="/">HOME</NavLink>
        </Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
}
