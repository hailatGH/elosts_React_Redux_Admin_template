import { Breadcrumb } from "antd";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  EpisodeForm,
  TrackTable,
  MediaPageStartCard,
  FormModel,
} from "../../components";

export default function Episodes() {
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
          <NavLink to="/podcast/episodes">Episode</NavLink>
        </Breadcrumb.Item>
      </Breadcrumb>

      <MediaPageStartCard showModal={showModal} name="Episode" />

      <FormModel
        open={open}
        name="Add New Episode"
        closeModal={closeModal}
        form={<EpisodeForm closeModal={closeModal} />}
      />

      {/* <div className="table_wraper">
        <TrackTable showModal={showModal} name="Episode" />
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
