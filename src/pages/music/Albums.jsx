import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Breadcrumb } from "antd";
import { NavLink } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  selectAllAlbums,
  getAlbumsCount,
  getAlbumsStatus,
  getAlbumsError,
  fetchAlbums,
} from "./stateSlice/albumsSlice";
import {
  AlbumForm,
  AlbumTable,
  MediaPageStartCard,
  FormModel,
} from "../../components";

export default function Albums() {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };

  const [albumId, setAlbumId] = useState(1);
  const onSetAlbumId = (id) => {
    setAlbumId(id);
  };

  const [pageNumber, setPageNumber] = useState(1);
  const onPageNumberChange = (page) => {
    setPageNumber(page);
  };

  const albums = useSelector(selectAllAlbums);
  const albumsCount = useSelector(getAlbumsCount);
  const albumsStatus = useSelector(getAlbumsStatus);
  const albumsError = useSelector(getAlbumsError);

  let album = {};

  try {
    album = albums.find((album) => album?.id === albumId);
  } catch (err) {
    album = {};
  }

  useEffect(() => {
    dispatch(fetchAlbums(pageNumber));
  }, [dispatch, pageNumber]);

  let albumsTable = <h3>Something</h3>;
  if (albumsStatus === "loading") {
    albumsTable = "loading";
  } else if (albumsStatus === "succeeded") {
    albumsTable = (
      <AlbumTable
        showModal={showModal}
        current={pageNumber}
        name="Album"
        data={albums}
        albumsCount={albumsCount}
        onPageNumberChange={onPageNumberChange}
        onSetAlbumId={onSetAlbumId}
      />
    );
  } else if (albumsStatus === "failed") {
    albumsTable = <p>{albumsError}</p>;
  }

  return (
    <div className="page_wraper static">
      <Breadcrumb className="breadCrumb">
        <Breadcrumb.Item>
          <NavLink to="/">Home</NavLink>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <NavLink to="/music">Music</NavLink>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          <NavLink to="/music/albums">Album</NavLink>
        </Breadcrumb.Item>
      </Breadcrumb>

      <MediaPageStartCard
        showModal={showModal}
        onSetId={onSetAlbumId}
        name="Album"
      />

      <FormModel
        open={open}
        name="Add New Album"
        closeModal={closeModal}
        form={<AlbumForm closeModal={closeModal} album={{ ...album }} />}
      />

      <div className="table_wraper">{albumsTable}</div>

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
