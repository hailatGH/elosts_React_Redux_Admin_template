import { useState, useEffect } from "react";
import axios from "axios";
import { Input, InputNumber, Checkbox, Button, Image, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PodcastForm(props) {
  const { TextArea } = Input;
  const [imageSet, setImageSet] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [listHost, setListHost] = useState([]);
  const [listCategory, setListCategory] = useState([]);
  const [inputData, setInputData] = useState(() => {
    return {
      podcast_name: "",
      podcast_rating: null,
      podcast_status: false,
      podcast_description: "",
      podcast_coverImage: null,
      encoder_FUI: "",
      host: null,
      category: null,
    };
  });

  useEffect(() => {
    getHosts();
    getCategories();
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
        let categories = [];
        let responseLength = Object.keys(response.data.results).length;
        for (let i = 0; i < responseLength; i++) {
          let category = {};
          category["label"] = response.data.results[i].artist_name;
          category["value"] = response.data.results[i].id;
          categories.push(category);
        }
        setListCategory(categories);
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
      podcast_name: "",
      podcast_rating: null,
      podcast_status: false,
      podcast_description: "",
      podcast_coverImage: null,
      encoder_FUI: "",
      host: null,
      category: null,
    });
    setImageSet(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(inputData);
    // const url =
    //   "https://podcast-service.calmgrass-743c6f7f.francecentral.azurecontainerapps.io/webApp/podcast";

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
    //       ? notify("success", `Creating ${inputData.podcast_name} succeed!`)
    //       : notify("error", `Creating ${inputData.podcast_name} failed!`);
    //     props.closeModal();
    //     cleanUp();
    //   })
    //   .catch((response) => {
    //     notify("error", `Creating ${inputData.podcast_name} failed!`);
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
          name="podcast_name"
          value={inputData.podcast_name}
          style={{ borderRadius: "2px", height: "40px" }}
        />
      </div>

      <div className="form-item" style={{ width: "100%", marginRight: "5px" }}>
        <InputNumber
          type="number"
          placeholder="Rating"
          onChange={(value) =>
            setInputData((prevInputData) => ({
              ...prevInputData,
              podcast_rating: value,
            }))
          }
          name="podcast_rating"
          value={inputData.podcast_rating}
          min={0}
          max={5}
          style={{
            borderRadius: "2px",
            height: "35px",
            width: "50%",
          }}
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
        <Checkbox
          type="checkbox"
          id="podcast_status"
          checked={inputData.podcast_status}
          onChange={() => handleChange(event)}
          name="podcast_status"
          style={{ opacity: "0.7" }}
        >
          Status
        </Checkbox>
      </div>

      <div className="form-item">
        <TextArea
          placeholder="Description"
          value={inputData.podcast_description}
          onChange={() => handleChange(event)}
          name="podcast_description"
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
              podcast_coverImage: event.target.files[0],
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
