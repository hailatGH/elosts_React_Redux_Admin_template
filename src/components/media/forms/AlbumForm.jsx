import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addNewAlbum } from "../../../pages/music/stateSlice/albumsSlice";
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

export default function AlbumForm(props) {
  const dispatch = useDispatch();
  const [addRequestStatus, setAddRequestStatus] = useState("idle");
  const { TextArea } = Input;
  const [imageSet, setImageSet] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [listArtist, setListArtist] = useState([]);

  const [inputData, setInputData] = useState(() => {
    return {
      album_name: "",
      album_rating: null,
      album_status: false,
      album_releaseDate: null,
      album_description: "",
      album_coverImage: null,
      album_price: null,
      encoder_FUI: "",
      artist_id: [],
    };
  });

  useEffect(() => {
    getArtists();
  }, []);

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
      artist_id: [],
    });
    setImageSet(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    try {
      setAddRequestStatus("pending");
      dispatch(addNewAlbum(inputData)).unwrap();
    } catch (err) {
      setAddRequestStatus("failed");
    } finally {
      setAddRequestStatus("idle");
      props.closeModal();
      cleanUp();
    }
    // const url = "https://music-service-vdzflryflq-ew.a.run.app/webApp/album";

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
    //       ? notify("success", `Creating ${inputData.album_name} succeed!`)
    //       : notify("error", `Creating ${inputData.album_name} failed!`);
    //     props.closeModal();
    //     cleanUp();
    //   })
    //   .catch((response) => {
    //     notify("error", `Creating ${inputData.album_name} failed!`);
    //     props.closeModal();
    //     cleanUp();
    //   });
  }

  function handleImageUpload(event) {
    setImageUrl(URL.createObjectURL(event.target.files[0]));
    setInputData((prevInputData) => {
      return {
        ...prevInputData,
        album_coverImage: event.target.files[0],
      };
    });
    setImageSet(true);
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
          {imageSet ? (
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
