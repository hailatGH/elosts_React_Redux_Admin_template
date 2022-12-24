import { Breadcrumb } from "antd";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  TrackForm,
  TrackTable,
  MediaPageStartCard,
  FormModel,
} from "../../components";

export default function Tracks() {
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
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
          <NavLink to="/music/tracks">Track</NavLink>
        </Breadcrumb.Item>
      </Breadcrumb>

      <MediaPageStartCard showModal={showModal} name="Track" />

      <FormModel
        open={open}
        name="Add New Track"
        closeModal={closeModal}
        form={<TrackForm closeModal={closeModal} />}
      />

      <div className="table_wraper">
        <TrackTable showModal={showModal} name="Track" />
      </div>

      <ToastContainer
        autoClose={3000}
        position="top-right"
        hideProgressBar
        newestOnTop={true}
        pauseOnHover={false}
      />
    </div>
  );
}
