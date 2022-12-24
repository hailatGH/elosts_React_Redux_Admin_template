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

export default function EpisodeForm(props) {
  const { TextArea } = Input;
  const [audioSet, setAudioSet] = useState();
  const [imageSet, setImageSet] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [listHost, setListHost] = useState([]);
  const [listCategory, setListCategory] = useState([]);
  const [listPodcast, setListPodcast] = useState([]);
  const [listSeason, setListSeason] = useState([]);
  const [inputData, setInputData] = useState(() => {
    return {
      episode_name: "",
      episode_rating: null,
      episode_status: false,
      episode_releaseDate: null,
      episode_description: "",
      episode_coverImage: null,
      episode_audioFile: null,
      episode_price: null,
      encoder_FUI: "",
      host: null,
      category: null,
      podcast: null,
      season: null,
    };
  });

  useEffect(() => {
    getHosts();
    getCategories();
    getPodcasts();
    getSeasons();
  }, []);

  function getHosts() {
    axios
      .get("https://music-service-vdzflryflq-ew.a.run.app/webApp/artist")
      .then(function (response) {
        let hosts = [];
        let responseLength = Object.keys(response.data.results).length;
        for (let i = 0; i < responseLength; i++) {
          let host = {};
          host["label"] = response.data.results[i].artist_name;
          host["value"] = response.data.results[i].id;
          hosts.push(host);
        }
        setListHost(hosts);
      });
  }
  function getCategories() {
    axios
      .get("https://music-service-vdzflryflq-ew.a.run.app/webApp/artist")
      .then(function (response) {
        let caregories = [];
        let responseLength = Object.keys(response.data.results).length;
        for (let i = 0; i < responseLength; i++) {
          let category = {};
          category["label"] = response.data.results[i].artist_name;
          category["value"] = response.data.results[i].id;
          caregories.push(category);
        }
        setListCategory(caregories);
      });
  }
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
  function getSeasons() {
    axios
      .get("https://music-service-vdzflryflq-ew.a.run.app/webApp/artist")
      .then(function (response) {
        let seasons = [];
        let responseLength = Object.keys(response.data.results).length;
        for (let i = 0; i < responseLength; i++) {
          let season = {};
          season["label"] = response.data.results[i].artist_name;
          season["value"] = response.data.results[i].id;
          seasons.push(season);
        }
        setListSeason(seasons);
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
      episode_name: "",
      episode_rating: null,
      episode_status: false,
      episode_releaseDate: null,
      episode_description: "",
      episode_coverImage: null,
      episode_audioFile: null,
      episode_price: null,
      encoder_FUI: "",
      host: null,
      category: null,
      podcast: null,
      season: null,
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
          name="episode_name"
          value={inputData.episode_name}
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
                episode_rating: value,
              }))
            }
            name="episode_rating"
            value={inputData.episode_rating}
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
                episode_price: value,
              }))
            }
            name="episode_price"
            value={inputData.episode_price}
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
          id="category"
          name="category"
          size="middle"
          placeholder="Category"
          bordered={false}
          value={inputData.category}
          onChange={(value) => {
            setInputData((prevInputData) => {
              return {
                ...prevInputData,
                category: value,
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
          options={listCategory}
        />
      </div>
      <div className="form-item">
        <Select
          id="host"
          name="host"
          size="middle"
          placeholder="Host"
          bordered={false}
          value={inputData.host}
          onChange={(value) => {
            setInputData((prevInputData) => {
              return {
                ...prevInputData,
                host: value,
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
          options={listHost}
        />
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
        <Select
          id="season"
          name="season"
          size="middle"
          placeholder="Season"
          bordered={false}
          value={inputData.season}
          onChange={(value) => {
            setInputData((prevInputData) => {
              return {
                ...prevInputData,
                season: value,
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
          options={listSeason}
        />
      </div>

      <div className="form-item">
        <Checkbox
          type="checkbox"
          id="episode_status"
          checked={inputData.episode_status}
          onChange={() => handleChange(event)}
          name="episode_status"
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
              episode_releaseDate: dateString,
            }))
          }
          name="episode_releaseDate"
          date={inputData.episode_releaseDate}
          placeholder="Release Date"
          style={{ borderRadius: "2px" }}
        />
      </div>

      <div className="form-item">
        <TextArea
          placeholder="Description"
          value={inputData.episode_description}
          onChange={() => handleChange(event)}
          name="episode_description"
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
              episode_coverImage: event.target.files[0],
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
              episode_audioFile: event.target.files[0],
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
