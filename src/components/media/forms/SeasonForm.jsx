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

export default function SeasonForm(props) {
  const { TextArea } = Input;
  const [imageSet, setImageSet] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [listPodcast, setListPodcast] = useState([]);
  const [inputData, setInputData] = useState(() => {
    return {
      season_name: "",
      season_rating: null,
      season_status: false,
      season_releaseDate: null,
      season_description: "",
      season_coverImage: null,
      season_price: null,
      encoder_FUI: "",
      podcast: null,
    };
  });

  useEffect(() => {
    getPodcasts();
  }, []);

  function getPodcasts() {
    axios
      .get("https://music-service-vdzflryflq-ew.a.run.app/webApp/artist")
      .then(function (response) {
        let podcasts = [];
        let responseLength = Object.keys(response.data.results).length;
        for (let i = 0; i < responseLength; i++) {
          let podcast = {};
          podcast["label"] = response.data.results[i].artist_name;
          podcast["value"] = response.data.results[i].id;
          podcasts.push(podcast);
        }
        setListPodcast(podcasts);
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
      season_name: "",
      season_rating: null,
      season_status: false,
      season_releaseDate: null,
      season_description: "",
      season_coverImage: null,
      season_price: null,
      encoder_FUI: "",
      podcast: null,
    });
    setImageSet(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(inputData);
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

  return (
    <div className="form">
      <div className="form-item">
        <Input
          type="text"
          placeholder="Name"
          onChange={() => handleChange(event)}
          name="season_name"
          value={inputData.season_name}
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
                season_rating: value,
              }))
            }
            name="season_rating"
            value={inputData.season_rating}
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
                season_price: value,
              }))
            }
            name="season_price"
            value={inputData.season_price}
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
          id="podcast"
          name="podcast"
          size="middle"
          placeholder="Podcast"
          bordered={false}
          value={inputData.podcast}
          onChange={(value) => {
            setInputData((prevInputData) => {
              return {
                ...prevInputData,
                podcast: value,
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
          options={listPodcast}
        />
      </div>

      <div className="form-item">
        <Checkbox
          type="checkbox"
          id="season_status"
          checked={inputData.season_status}
          onChange={() => handleChange(event)}
          name="season_status"
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
              season_releaseDate: dateString,
            }))
          }
          name="season_releaseDate"
          date={inputData.season_releaseDate}
          placeholder="Release Date"
          style={{ borderRadius: "2px" }}
        />
      </div>

      <div className="form-item">
        <TextArea
          placeholder="Description"
          value={inputData.season_description}
          onChange={() => handleChange(event)}
          name="season_description"
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
              preview={false}
              onClick={() => setImageSet(false)}
              style={{ borderRadius: "4px" }}
            />
          ) : (
            ""
          )}
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
        </div>

        <Input
          id="files"
          style={{ visibility: "hidden" }}
          type="file"
          onChange={(event) => {
            setImageSet(true);
            setImageUrl(URL.createObjectURL(event.target.files[0]));
            setInputData((prevInputData) => ({
              ...prevInputData,
              season_coverImage: event.target.files[0],
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
