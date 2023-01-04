import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Breadcrumb } from "antd";
import { NavLink } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  selectAllTracks,
  getTracksCount,
  getTracksStatus,
  getTracksError,
  fetchTracks,
} from "./stateSlice/tracksSlice";
import {
  TrackForm,
  TrackTable,
  MediaPageStartCard,
  FormModel,
} from "../../components";

export default function Tracks() {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };

  const [trackId, setTrackId] = useState(1);
  const onSetTrackId = (id) => {
    setTrackId(id);
  };

  const [pageNumber, setPageNumber] = useState(1);
  const onPageNumberChange = (page) => {
    setPageNumber(page);
  };

  const tracks = useSelector(selectAllTracks);
  const tracksCount = useSelector(getTracksCount);
  const tracksStatus = useSelector(getTracksStatus);
  const tracksError = useSelector(getTracksError);

  let track = {};

  try {
    track = tracks.find((track) => track?.id === trackId);
  } catch (err) {
    track = {};
  }

  useEffect(() => {
    dispatch(fetchTracks(pageNumber));
  }, [dispatch, pageNumber]);

  let tracksTable = "";
  if (tracksStatus === "loading") {
    tracksTable = "loading";
  } else if (tracksStatus === "succeeded") {
    tracksTable = (
      <TrackTable
        showModal={showModal}
        current={pageNumber}
        name="Track"
        data={tracks}
        tracksCount={tracksCount}
        onPageNumberChange={onPageNumberChange}
        onSetTrackId={onSetTrackId}
      />
    );
  } else if (tracksStatus === "failed") {
    tracksTable = <p>{tracksError}</p>;
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
          <NavLink to="/music/tracks">Track</NavLink>
        </Breadcrumb.Item>
      </Breadcrumb>

      <MediaPageStartCard
        showModal={showModal}
        onSetId={onSetTrackId}
        name="Track"
      />

      <FormModel
        open={open}
        name="Add New Track"
        closeModal={closeModal}
        form={<TrackForm closeModal={closeModal} track={{ ...track }} />}
      />

      <div className="table_wraper">{tracksTable}</div>

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
