import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Breadcrumb } from "antd";
import { NavLink } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  selectAllArtists,
  getArtistsCount,
  getArtistsStatus,
  getArtistsError,
  fetchArtists,
} from "./stateSlice/artistsSlice";
import {
  ArtistForm,
  ArtistTable,
  MediaPageStartCard,
  FormModel,
} from "../../components";

export default function Artists() {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };

  const [artistId, setArtistId] = useState(1);
  const onSetArtistId = (id) => {
    setArtistId(id);
  };

  const [pageNumber, setPageNumber] = useState(1);
  const onPageNumberChange = (page) => {
    setPageNumber(page);
  };

  const artists = useSelector(selectAllArtists);
  const artistsCount = useSelector(getArtistsCount);
  const artistsStatus = useSelector(getArtistsStatus);
  const artistsError = useSelector(getArtistsError);

  let artist = {};

  try {
    artist = artists.find((artist) => artist?.id === artistId);
  } catch (err) {
    artist = {};
  }
  useEffect(() => {
    dispatch(fetchArtists(pageNumber));
  }, [dispatch, pageNumber]);

  let artistsTable = <h3>Something</h3>;
  if (artistsStatus === "loading") {
    artistsTable = "loading";
  } else if (artistsStatus === "succeeded") {
    artistsTable = (
      <ArtistTable
        showModal={showModal}
        current={pageNumber}
        name="Artist"
        data={artists}
        artistsCount={artistsCount}
        onPageNumberChange={onPageNumberChange}
        onSetArtistId={onSetArtistId}
      />
    );
  } else if (artistsStatus === "failed") {
    artistsTable = <p>{artistsError}</p>;
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
          <NavLink to="/music/artists">Artist</NavLink>
        </Breadcrumb.Item>
      </Breadcrumb>

      <MediaPageStartCard
        showModal={showModal}
        onSetId={onSetArtistId}
        name="Artist"
      />

      <FormModel
        open={open}
        name="Add New Artist"
        closeModal={closeModal}
        form={<ArtistForm closeModal={closeModal} artist={{ ...artist }} />}
      />

      <div className="table_wraper">{artistsTable}</div>

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
