import { Breadcrumb } from "antd";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import {
  AlbumForm,
  AlbumTable,
  MediaPageStartCard,
  FormModel,
} from "./components";

export default function Albums() {
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
          <NavLink to="/albums">Album</NavLink>
        </Breadcrumb.Item>
      </Breadcrumb>

      <MediaPageStartCard showModal={showModal} name="Album" />

      <FormModel
        open={open}
        name="Add New Album"
        handleOk={handleOk}
        handleCancel={handleCancel}
        loading={loading}
        form={<AlbumForm />}
      />

      <div className="table_wraper">
        <AlbumTable showModal={showModal} name="Album" />
      </div>
    </div>
  );
}
