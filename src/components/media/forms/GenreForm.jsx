import { useState } from "react";
import axios from "axios";
import { Input, InputNumber, Checkbox, Button, Image } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function GenreForm(props) {
  const { TextArea } = Input;
  const [imageSet, setImageSet] = useState();
  const [imageUrl, setImageUrl] = useState();

  const [inputData, setInputData] = useState(() => {
    return {
      genre_name: "",
      genre_rating: null,
      genre_status: false,
      genre_description: "",
      genre_coverImage: null,
      encoder_FUI: "",
    };
  });

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
      genre_name: "",
      genre_rating: null,
      genre_status: false,
      genre_description: "",
      genre_coverImage: null,
      encoder_FUI: "",
    });
    setImageSet(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(inputData);
    // const url = "https://music-service-vdzflryflq-ew.a.run.app/webApp/genre";

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
    //       ? notify("success", `Creating ${inputData.genre_name} succeed!`)
    //       : notify("error", `Creating ${inputData.genre_name} failed!`);
    //     props.closeModal();
    //     cleanUp();
    //   })
    //   .catch((response) => {
    //     notify("error", `Creating ${inputData.genre_name} failed!`);
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
          name="genre_name"
          value={inputData.genre_name}
          style={{ borderRadius: "2px", height: "40px" }}
        />
      </div>

      <div className="form-item">
        <InputNumber
          type="number"
          placeholder="Rating"
          onChange={(value) =>
            setInputData((prevInputData) => ({
              ...prevInputData,
              genre_rating: value,
            }))
          }
          name="genre_rating"
          value={inputData.genre_rating}
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
        <Checkbox
          type="checkbox"
          id="genre_status"
          checked={inputData.genre_status}
          onChange={() => handleChange(event)}
          name="genre_status"
          style={{ opacity: "0.7" }}
        >
          Status
        </Checkbox>
      </div>

      <div className="form-item">
        <TextArea
          placeholder="Description"
          value={inputData.genre_description}
          onChange={() => handleChange(event)}
          name="genre_description"
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
            setImageSet(true);
            setImageUrl(URL.createObjectURL(event.target.files[0]));
            setInputData((prevInputData) => ({
              ...prevInputData,
              genre_coverImage: event.target.files[0],
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
