import { Breadcrumb } from "antd";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  HostForm,
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
          <NavLink to="/podcast">Podcast</NavLink>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <NavLink to="/podcast/hosts">Host</NavLink>
        </Breadcrumb.Item>
      </Breadcrumb>

      <MediaPageStartCard showModal={showModal} name="Host" />

      <FormModel
        open={open}
        name="Add New Host"
        closeModal={closeModal}
        form={<HostForm closeModal={closeModal} />}
      />

      {/* <div className="table_wraper">
        <ArtistTable showModal={showModal} name="Host" />
      </div> */}

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
