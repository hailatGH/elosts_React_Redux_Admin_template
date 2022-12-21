import { Breadcrumb } from "antd";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import {
  ArtistForm,
  MediaPageStartCard,
  FormModel,
  ArtistTable,
} from "./components";

export default function Artists() {
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
          <NavLink to="/artists">Artist</NavLink>
        </Breadcrumb.Item>
      </Breadcrumb>

      <MediaPageStartCard showModal={showModal} name="Artist" />

      <FormModel
        open={open}
        name="Add New Artist"
        handleOk={handleOk}
        handleCancel={handleCancel}
        loading={loading}
        form={<ArtistForm />}
      />

      <div className="table_wraper">
        <ArtistTable showModal={showModal} name="Artist" />
      </div>
    </div>
  );
}
