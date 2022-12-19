import { Breadcrumb, Card } from "antd";
import { NavLink } from "react-router-dom";
import {
  UserSummary,
  MusicSummary,
  PodcastSummary,
  RadioSummary,
} from "./components";

export default function Dashboard() {
  return (
    <div className="page_wraper">
      <div className="breadCrumb">
        <Breadcrumb>
          <Breadcrumb.Item>
            <NavLink to="/">HOME</NavLink>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="summary">
        <UserSummary />
        <MusicSummary />
        <PodcastSummary />
        <RadioSummary />
      </div>
    </div>
  );
}
