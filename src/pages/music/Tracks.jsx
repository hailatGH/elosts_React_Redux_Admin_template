import { Breadcrumb } from "antd";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import {
  TrackForm,
  TrackTable,
  MediaPageStartCard,
  FormModel,
} from "./components";

export default function Tracks() {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div className="page_wraper">
      <Breadcrumb className="breadCrumb">
        <Breadcrumb.Item>
          <NavLink to="/">Home</NavLink>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <NavLink to="/music">Music</NavLink>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <NavLink to="/tracks">Track</NavLink>
        </Breadcrumb.Item>
      </Breadcrumb>

      <MediaPageStartCard showModal={showModal} name="Track" />

      <FormModel
        open={open}
        name="Add New Track"
        handleOk={handleOk}
        handleCancel={handleCancel}
        loading={loading}
        form={<TrackForm />}
      />

      <div className="table_wraper">
        <TrackTable showModal={showModal} name="Track" />
      </div>
    </div>
  );
}
