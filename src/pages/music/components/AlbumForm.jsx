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

export default function AlbumForm(props) {
  const { TextArea } = Input;
  const [imageSet, setImageSet] = useState();
  const [imageUrl, setImageUrl] = useState();

  const [listArtist, setListArtist] = useState([]);
  // const [triggerGetArtist, setTriggerGetArtist] = useState(false);

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
    const url = "https://music-service-vdzflryflq-ew.a.run.app/webApp/album";

    const formData = new FormData();
    for (let [key, value] of Object.entries(inputData)) {
      formData.append(key, value);
    }

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    axios
      .post(url, formData, config)
      .then((response) => {
        response.status === 201
          ? notify("success", `Creating ${inputData.album_name} succeed!`)
          : notify("error", `Creating ${inputData.album_name} failed!`);
        props.closeModal();
        cleanUp();
      })
      .catch((response) => {
        notify("error", `Creating ${inputData.album_name} failed!`);
        props.closeModal();
        cleanUp();
      });
  }

  return (
    <div className="form album">
      <div className="form-item">
        <Input
          type="text"
          placeholder="Album Name"
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
            placeholder="Album Rating"
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
            placeholder="Album Price"
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
          Album Status
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
          placeholder="Album Release Date"
          style={{ borderRadius: "2px" }}
        />
      </div>

      <div className="form-item">
        <TextArea
          placeholder="Album Description"
          value={inputData.album_description}
          onChange={() => handleChange(event)}
          name="album_description"
          rows={4}
          style={{ borderRadius: "2px" }}
        />
      </div>

      <div className="form-item upload">
        <span>Album Cover Image</span>
        {imageSet ? (
          <Image
            width={200}
            height={100}
            style={{ borderRadius: "4px" }}
            src={imageUrl}
            preview={false}
            onClick={() => setImageSet(false)}
          />
        ) : (
          <label htmlFor="files">
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
        )}
        <Input
          id="files"
          style={{ visibility: "hidden" }}
          type="file"
          onChange={(event) => {
            setImageSet(true);
            setImageUrl(URL.createObjectURL(event.target.files[0]));
            setInputData((prevInputData) => ({
              ...prevInputData,
              album_coverImage: event.target.files[0],
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
