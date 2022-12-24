import { Breadcrumb } from "antd";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  StationForm,
  ArtistTable,
  MediaPageStartCard,
  FormModel,
} from "../../components";

export default function Hosts() {
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
          <NavLink to="/radio">Radio</NavLink>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <NavLink to="/radio/stations">Station</NavLink>
        </Breadcrumb.Item>
      </Breadcrumb>

      <MediaPageStartCard showModal={showModal} name="Station" />

      <FormModel
        open={open}
        name="Add New Host"
        closeModal={closeModal}
        form={<StationForm closeModal={closeModal} />}
      />

      <div className="table_wraper">
        <ArtistTable showModal={showModal} name="Station" />
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
