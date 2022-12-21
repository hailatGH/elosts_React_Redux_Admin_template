import { Breadcrumb } from "antd";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import {
  GenreForm,
  GenreTable,
  MediaPageStartCard,
  FormModel,
} from "./components";

export default function Geners() {
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
          <NavLink to="/geners">Genre</NavLink>
        </Breadcrumb.Item>
      </Breadcrumb>

      <MediaPageStartCard showModal={showModal} name="Genre" />

      <FormModel
        open={open}
        name="Add New Genre"
        handleOk={handleOk}
        handleCancel={handleCancel}
        loading={loading}
        form={<GenreForm />}
      />

      <div className="table_wraper">
        <GenreTable showModal={showModal} name="Genre" />
      </div>
    </div>
  );
}
