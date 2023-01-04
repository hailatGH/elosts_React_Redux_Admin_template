import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import {
  updateAlbum,
  addNewAlbum,
} from "../../../pages/music/stateSlice/albumsSlice";
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

export default function AlbumForm(props) {
  const dispatch = useDispatch();
  const [addRequestStatus, setAddRequestStatus] = useState("idle");
  const [imageUrl, setImageUrl] = useState();
  const [listArtist, setListArtist] = useState();
  const { TextArea } = Input;

  const [inputData, setInputData] = useState({
    album_name: "",
    album_rating: null,
    album_status: false,
    album_releaseDate: null,
    album_description: "",
    album_coverImage: null,
    album_price: null,
    encoder_FUI: "",
    artist_id: null,
  });

  useEffect(() => {
    setInputData({
      album_name: props.album?.album_name,
      album_rating: props.album?.album_rating,
      album_status: props.album?.album_status,
      album_releaseDate: props.album?.album_releaseDate,
      album_description: props.album?.album_description,
      album_coverImage: props.album?.album_coverImage,
      album_price: props.album?.album_price,
      encoder_FUI: props.album?.encoder_FUI,
      artist_id: props.album?.artist_id,
    });
    setImageUrl(props.album?.album_coverImage);
    listArtist ? null : getArtists();
  }, [props?.album]);

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
      album_name: "",
      album_rating: null,
      album_status: false,
      album_releaseDate: null,
      album_description: "",
      album_coverImage: null,
      album_price: null,
      encoder_FUI: "",
      artist_id: null,
    });
    setImageUrl(null);
  }

  function handleSubmit(event) {
    event.preventDefault();
    try {
      setAddRequestStatus("pending");
      // props.album.id
      // ? dispatch(updateAlbum({ ...inputData, id: props.album.id })).unwrap()
      dispatch(addNewAlbum(inputData)).unwrap();
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
        album_coverImage: event.target.files[0],
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
          name="album_name"
          value={inputData.album_name}
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
                album_rating: value,
              }))
            }
            name="album_rating"
            value={inputData.album_rating}
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
                album_price: value,
              }))
            }
            name="album_price"
            value={inputData.album_price}
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
          id="artist_id"
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
        <Checkbox
          type="checkbox"
          id="album_status"
          checked={inputData.album_status}
          onChange={() => handleChange(event)}
          name="album_status"
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
              album_releaseDate: dateString,
            }))
          }
          name="album_releaseDate"
          date={inputData.album_releaseDate}
          placeholder="Release Date"
          style={{ borderRadius: "2px" }}
        />
      </div>

      <div className="form-item">
        <TextArea
          placeholder="Description"
          value={inputData.album_description}
          onChange={() => handleChange(event)}
          name="album_description"
          rows={4}
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
