import { useState, useEffect } from "react";
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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TrackForm(props) {
  const { TextArea } = Input;
  const [audioSet, setAudioSet] = useState();
  const [imageSet, setImageSet] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [listArtist, setListArtist] = useState([]);
  const [listAlbum, setListAlbum] = useState([]);
  const [listGenre, setListGenre] = useState([]);
  const [inputData, setInputData] = useState(() => {
    return {
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
      artist_id: [],
    };
  });

  useEffect(() => {
    getArtists();
    getGenres();
  }, []);

  useEffect(() => {
    getAlbums(inputData.artist_id);
  }, [inputData.artist_id]);

  function getArtists() {
    axios
      .get("https://music-service-vdzflryflq-ew.a.run.app/webApp/artist")
      .then(function (response) {
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
    let artist_id_str = "1";
    if (artist_id) {
      artist_id_str = "";
      for (let id of artist_id)
        artist_id_str = artist_id_str + "," + id.toString();

      artist_id_str = artist_id_str.substring(1);
    }

    axios
      .get(
        `https://music-service-vdzflryflq-ew.a.run.app/webApp/albumsByArtistId?artistId=${artist_id_str}`
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
    axios
      .get("https://music-service-vdzflryflq-ew.a.run.app/webApp/genre")
      .then(function (response) {
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

  const notify = (type, msg) => {
    if (type === "success") toast.success(msg);
    if (type === "error") toast.error(msg);
  };

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
      artist_id: [],
    });
    setImageSet(false);
    setAudioSet(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(inputData);
    // const url = "https://music-service-vdzflryflq-ew.a.run.app/webApp/track";

    // const formData = new FormData();
    // for (let [key, value] of Object.entries(inputData)) {
    //   formData.append(key, value);
    // }

    // const config = {
    //   headers: {
    //     "content-type": "multipart/form-data",
    //   },
    // };

    // axios
    //   .post(url, formData, config)
    //   .then((response) => {
    //     response.status === 201
    //       ? notify("success", `Creating ${inputData.track_name} succeed!`)
    //       : notify("error", `Creating ${inputData.track_name} failed!`);
    //     props.closeModal();
    //     cleanUp();
    //   })
    //   .catch((response) => {
    //     notify("error", `Creating ${inputData.track_name} failed!`);
    //     props.closeModal();
    //     cleanUp();
    //   });
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
          mode="multiple"
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
            height: "70px",
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
          onChange={() => handleChange(event)}
          name="track_description"
          rows={4}
          style={{ borderRadius: "2px" }}
        />
      </div>

      <div className="form-item">
        <TextArea
          placeholder="Lyrics"
          value={inputData.track_lyrics}
          onChange={() => handleChange(event)}
          name="track_lyrics"
          rows={6}
          style={{ borderRadius: "2px" }}
        />
      </div>

      <div className="form-item">
        <TextArea
          placeholder="Featuring Artists"
          value={inputData.artists_featuring}
          onChange={() => handleChange(event)}
          name="artists_featuring"
          rows={2}
          style={{ borderRadius: "2px" }}
        />
      </div>

      <div className="form-item upload">
        <span>Cover Image</span>
        <div className="image_upload_preview">
          {imageSet ? (
            <Image
              width={100}
              height={100}
              src={imageUrl}
              preview={false}
              onClick={() => setImageSet(false)}
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
          onChange={(event) => {
            setImageUrl(URL.createObjectURL(event.target.files[0]));
            setInputData((prevInputData) => ({
              ...prevInputData,
              track_coverImage: event.target.files[0],
            }));
            setImageSet(true);
          }}
        />
      </div>

      <div className="form-item upload">
        <span>Audio File</span>
        {audioSet ? (
          <label htmlFor="audioFiles" onClick={() => setAudioSet(false)}>
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
        )}
        <Input
          id="audioFiles"
          style={{ visibility: "hidden" }}
          type="file"
          onChange={(event) => {
            setAudioSet(true);
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
