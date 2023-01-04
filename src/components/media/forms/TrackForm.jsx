import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  updateTrack,
  addNewTrack,
} from "../../../pages/music/stateSlice/tracksSlice";
import axios from "axios";
import {
  Input,
  InputNumber,
  Checkbox,
  DatePicker,
  Button,
  Image,
  Select,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";

export default function TrackForm(props) {
  const dispatch = useDispatch();
  const [addRequestStatus, setAddRequestStatus] = useState("idle");
  const [imageUrl, setImageUrl] = useState();
  const [listArtist, setListArtist] = useState();
  const [listAlbum, setListAlbum] = useState();
  const [listGenre, setListGenre] = useState();
  const { TextArea } = Input;

  const [inputData, setInputData] = useState({
    track_name: "",
    track_rating: null,
    track_status: false,
    track_releaseDate: null,
    track_description: "",
    track_coverImage: null,
    track_audioFile: null,
    track_lyrics: "",
    track_price: null,
    artists_featuring: "",
    encoder_FUI: "",
    album_id: null,
    genre_id: null,
    artist_id: null,
  });

  useEffect(() => {
    getAlbums(inputData?.artist_id);
  }, [inputData.artist_id]);

  useEffect(() => {
    setInputData({
      track_name: props.track?.track_name,
      track_rating: props.track?.track_rating,
      track_status: props.track?.track_status,
      track_releaseDate: props.track?.track_releaseDate,
      track_description: props.track?.track_description,
      track_coverImage: props.track?.track_coverImage,
      track_audioFile: props.track?.track_audioFile,
      track_lyrics: props.track?.track_lyrics,
      track_price: props.track?.track_price,
      artists_featuring: props.track?.artists_featuring,
      encoder_FUI: "",
      album_id: props.track?.album_id,
      genre_id: props.track?.genre_id,
      artist_id: props.track?.artist_id,
    });
    setImageUrl(props.track?.track_coverImage);
    listArtist ? null : getArtists();
    listGenre ? null : getGenres();
  }, [props?.track]);

  function getArtists() {
    axios.get("http://127.0.0.1:8000/webApp/artist").then(function (response) {
      let artists = [];
      let responseLength = Object.keys(response.data.results).length;
      for (let i = 0; i < responseLength; i++) {
        let artist = {};
        artist["label"] = response.data.results[i].artist_name;
        artist["value"] = response.data.results[i].id;
        artists.push(artist);
      }
      setListArtist(artists);
    });
  }

  function getAlbums(artist_id) {
    // let artist_id_str = "1";
    // if (artist_id) {
    //   artist_id_str = "";
    //   for (let id of artist_id)
    //     artist_id_str = artist_id_str + "," + id.toString();

    //   artist_id_str = artist_id_str.substring(1);
    // }
    axios
      .get(
        `http://127.0.0.1:8000/webApp/albumsByArtistId?artistId=${artist_id}`
      )
      .then(function (response) {
        let albums = [];
        let responseLength = Object.keys(response.data).length;
        for (let i = 0; i < responseLength; i++) {
          let album = {};
          album["label"] = response.data[i].album_name;
          album["value"] = response.data[i].id;
          albums.push(album);
        }
        setListAlbum(albums);
      });
  }

  function getGenres() {
    axios.get("http://127.0.0.1:8000/webApp/genre").then(function (response) {
      let genres = [];
      let responseLength = Object.keys(response.data.results).length;
      for (let i = 0; i < responseLength; i++) {
        let genre = {};
        genre["label"] = response.data.results[i].genre_name;
        genre["value"] = response.data.results[i].id;
        genres.push(genre);
      }
      setListGenre(genres);
    });
  }

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setInputData((prevInputData) => {
      return {
        ...prevInputData,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }

  function cleanUp() {
    setInputData({
      track_name: "",
      track_rating: null,
      track_status: false,
      track_releaseDate: null,
      track_description: "",
      track_coverImage: null,
      track_audioFile: null,
      track_lyrics: "",
      track_price: null,
      artists_featuring: "",
      encoder_FUI: "",
      album_id: null,
      genre_id: null,
      artist_id: null,
    });
    setImageUrl(null);
  }

  function handleSubmit(event) {
    event.preventDefault();
    try {
      setAddRequestStatus("pending");
      props.track.id
        ? dispatch(updateTrack({ ...inputData, id: props.track.id })).unwrap()
        : dispatch(addNewTrack(inputData)).unwrap();
    } catch (err) {
      setAddRequestStatus("failed");
    } finally {
      setAddRequestStatus("idle");
      props.closeModal();
      cleanUp();
    }
  }

  function handleImageUpload(event) {
    setImageUrl(URL.createObjectURL(event.target.files[0]));
    setInputData((prevInputData) => {
      return {
        ...prevInputData,
        track_coverImage: event.target.files[0],
      };
    });
  }

  return (
    <div className="form">
      <div className="form-item">
        <Input
          type="text"
          placeholder="Name"
          onChange={() => handleChange(event)}
          name="track_name"
          value={inputData.track_name}
          style={{ borderRadius: "2px", height: "40px" }}
        />
      </div>

      <div className="form-group-item">
        <div
          className="form-item"
          style={{ width: "100%", marginRight: "5px" }}
        >
          <InputNumber
            type="number"
            placeholder="Rating"
            onChange={(value) =>
              setInputData((prevInputData) => ({
                ...prevInputData,
                track_rating: value,
              }))
            }
            name="track_rating"
            value={inputData.track_rating}
            min={0}
            max={5}
            style={{
              borderRadius: "2px",
              height: "35px",
              width: "100%",
            }}
          />
        </div>
        <div className="form-item" style={{ width: "100%", marginLeft: "5px" }}>
          <InputNumber
            type="number"
            placeholder="Price"
            onChange={(value) =>
              setInputData((prevInputData) => ({
                ...prevInputData,
                track_price: value,
              }))
            }
            name="track_price"
            value={inputData.track_price}
            style={{
              borderRadius: "2px",
              height: "35px",
              width: "100%",
            }}
          />
        </div>
      </div>
      <div className="form-item">
        <Select
          id="genre_id"
          name="genre_id"
          size="middle"
          placeholder="Genre"
          bordered={false}
          value={inputData.genre_id}
          onChange={(value) => {
            setInputData((prevInputData) => {
              return {
                ...prevInputData,
                genre_id: value,
              };
            });
          }}
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? "")
              .toLowerCase()
              .localeCompare((optionB?.label ?? "").toLowerCase())
          }
          style={{
            height: "35px",
            borderRadius: "2px",
            border: "1px solid #D9D9D9",
            width: "100%",
          }}
          options={listGenre}
        />
      </div>
      <div className="form-item">
        <Select
          id=""
          name="artist_id"
          // mode="multiple"
          size="middle"
          placeholder="Artist"
          bordered={false}
          value={inputData.artist_id}
          onChange={(value) => {
            setInputData((prevInputData) => {
              return {
                ...prevInputData,
                artist_id: value,
              };
            });
          }}
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? "")
              .toLowerCase()
              .localeCompare((optionB?.label ?? "").toLowerCase())
          }
          style={{
            height: "35px",
            borderRadius: "2px",
            border: "1px solid #D9D9D9",
            width: "100%",
          }}
          options={listArtist}
        />
      </div>
      <div className="form-item">
        <Select
          id="album_id"
          name="album_id"
          size="middle"
          placeholder="Album"
          bordered={false}
          value={inputData.album_id}
          onChange={(value) => {
            setInputData((prevInputData) => {
              return {
                ...prevInputData,
                album_id: value,
              };
            });
          }}
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
          }
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? "")
              .toLowerCase()
              .localeCompare((optionB?.label ?? "").toLowerCase())
          }
          style={{
            height: "35px",
            borderRadius: "2px",
            border: "1px solid #D9D9D9",
            width: "100%",
          }}
          options={listAlbum}
        />
      </div>

      <div className="form-item">
        <Checkbox
          type="checkbox"
          id="track_status"
          checked={inputData.track_status}
          onChange={() => handleChange(event)}
          name="track_status"
          style={{ opacity: "0.7" }}
        >
          Status
        </Checkbox>
      </div>

      <div className="form-item">
        <DatePicker
          type="date"
          placement="bottomLeft"
          onChange={(date, dateString) =>
            setInputData((prevInputData) => ({
              ...prevInputData,
              track_releaseDate: dateString,
            }))
          }
          name="track_releaseDate"
          date={inputData.track_releaseDate}
          placeholder="Release Date"
          style={{ borderRadius: "2px" }}
        />
      </div>

      <div className="form-item">
        <TextArea
          placeholder="Description"
          value={inputData.track_description}
          onChange={(event) => handleChange(event)}
          name="track_description"
          rows={4}
          style={{ borderRadius: "2px" }}
        />
      </div>

      <div className="form-item">
        <TextArea
          placeholder="Lyrics"
          value={inputData.track_lyrics}
          onChange={(event) => handleChange(event)}
          name="track_lyrics"
          rows={6}
          style={{ borderRadius: "2px" }}
        />
      </div>

      <div className="form-item">
        <TextArea
          placeholder="Featuring Artists"
          value={inputData.artists_featuring}
          onChange={(event) => handleChange(event)}
          name="artists_featuring"
          rows={2}
          style={{ borderRadius: "2px" }}
        />
      </div>

      <div className="form-item upload">
        <span>Cover Image</span>
        <div className="image_upload_preview">
          {imageUrl ? (
            <Image
              width={100}
              height={100}
              src={imageUrl}
              preview={true}
              style={{ borderRadius: "4px" }}
            />
          ) : (
            ""
          )}
          <label htmlFor="imgFiles">
            <div className="upload_label">
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                  cursor: "pointer",
                  opacity: "0.7",
                }}
              >
                Upload
              </div>
            </div>
          </label>
        </div>
        <Input
          id="imgFiles"
          style={{ visibility: "hidden" }}
          type="file"
          onChange={(event) => handleImageUpload(event)}
        />
      </div>

      <div className="form-item upload">
        <span>Audio File</span>
        <div className="image_upload_preview">
          {inputData.track_audioFile ? (
            <label htmlFor="audioFiles">
              <div className="upload_label audio">
                <i
                  className="bx bx-check-double"
                  style={{ color: "green", fontWeight: 700, fontSize: "20px" }}
                ></i>
                <div
                  style={{
                    marginTop: 8,
                    cursor: "pointer",
                    opacity: "0.7",
                    color: "green",
                  }}
                >
                  Uploaded
                </div>
              </div>
            </label>
          ) : (
            ""
          )}
          <label htmlFor="audioFiles">
            <div className="upload_label audio">
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                  cursor: "pointer",
                  opacity: "0.7",
                }}
              >
                Upload
              </div>
            </div>
          </label>
        </div>
        <Input
          id="audioFiles"
          style={{ visibility: "hidden" }}
          type="file"
          onChange={(event) => {
            setInputData((prevInputData) => ({
              ...prevInputData,
              track_audioFile: event.target.files[0],
            }));
          }}
        />
      </div>

      <div className="form-item submit_btn_wraper">
        <Button
          type="primary"
          htmlType="submit"
          onClick={(event) => handleSubmit(event)}
          className="submit_btn"
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
