import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Breadcrumb } from "antd";
import { NavLink } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  selectAllGenres,
  getGenresCount,
  getGenresStatus,
  getGenresError,
  fetchGenres,
} from "./stateSlice/genresSlice";
import {
  GenreForm,
  GenreTable,
  MediaPageStartCard,
  FormModel,
} from "../../components";

export default function Geners() {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const closeModal = () => {
    setOpen(false);
  };

  const [genreId, setGenreId] = useState(1);
  const onSetGenreId = (id) => {
    setGenreId(id);
  };

  const [pageNumber, setPageNumber] = useState(1);
  const onPageNumberChange = (page) => {
    setPageNumber(page);
  };

  const genres = useSelector(selectAllGenres);
  const genresCount = useSelector(getGenresCount);
  const genresStatus = useSelector(getGenresStatus);
  const genresError = useSelector(getGenresError);

  let genre = {};

  try {
    genre = genres.find((genre) => genre?.id === genreId);
  } catch (err) {
    genre = {};
  }

  useEffect(() => {
    dispatch(fetchGenres(pageNumber));
  }, [dispatch, pageNumber]);

  let genresTable = "";
  if (genresStatus === "loading") {
    genresTable = "loading";
  } else if (genresStatus === "succeeded") {
    genresTable = (
      <GenreTable
        showModal={showModal}
        current={pageNumber}
        name="Genre"
        data={genres}
        genresCount={genresCount}
        onPageNumberChange={onPageNumberChange}
        onSetGenreId={onSetGenreId}
      />
    );
  } else if (genresStatus === "failed") {
    genresTable = <p>{genresError}</p>;
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
          <NavLink to="/music/geners">Genre</NavLink>
        </Breadcrumb.Item>
      </Breadcrumb>

      <MediaPageStartCard
        showModal={showModal}
        onSetId={onSetGenreId}
        name="Genre"
      />

      <FormModel
        open={open}
        name="Add New Genre"
        closeModal={closeModal}
        form={<GenreForm closeModal={closeModal} genre={{ ...genre }} />}
      />

      <div className="table_wraper">{genresTable}</div>

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
