import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  updateArtist,
  addNewArtist,
} from "../../../pages/music/stateSlice/artistsSlice";
import { Input, InputNumber, Checkbox, DatePicker, Button, Image } from "antd";
import { PlusOutlined } from "@ant-design/icons";

export default function ArtistForm(props) {
  const dispatch = useDispatch();
  const [addRequestStatus, setAddRequestStatus] = useState("idle");
  const [imageUrl, setImageUrl] = useState();
  const { TextArea } = Input;

  const [inputData, setInputData] = useState({
    artist_name: "",
    artist_title: "",
    artist_FUI: "",
    artist_rating: null,
    artist_status: false,
    artist_description: "",
    artist_releaseDate: null,
    artist_profileImage: null,
  });

  useEffect(() => {
    setInputData({
      artist_name: props.artist?.artist_name,
      artist_title: props.artist?.artist_title,
      artist_FUI: props.artist?.artist_FUI,
      artist_rating: props.artist?.artist_rating,
      artist_status: props.artist?.artist_status,
      artist_description: props.artist?.artist_description,
      artist_releaseDate: props.artist?.artist_releaseDate,
      artist_profileImage: props.artist?.artist_profileImage,
    });
    setImageUrl(props.artist?.artist_profileImage);
  }, [props?.artist]);

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
      artist_name: "",
      artist_title: "",
      artist_FUI: "",
      artist_rating: null,
      artist_status: false,
      artist_description: "",
      artist_releaseDate: null,
      artist_profileImage: null,
    });
    setImageUrl(null);
  }

  function handleSubmit(event) {
    event.preventDefault();
    try {
      setAddRequestStatus("pending");
      props.artist.id
        ? dispatch(updateArtist({ ...inputData, id: props.artist.id })).unwrap()
        : dispatch(addNewArtist(inputData)).unwrap();
    } catch (err) {
      setAddRequestStatus("failed");
    } finally {
      setAddRequestStatus("idle");
      props.closeModal();
      cleanUp();
    }
    // const url = "https://music-service-vdzflryflq-ew.a.run.app/webApp/artist";

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
    //       ? notify("success", `Creating ${inputData.artist_name} succeed!`)
    //       : notify("error", `Creating ${inputData.artist_name} failed!`);
    //     props.closeModal();
    //     cleanUp();
    //   })
    //   .catch((response) => {
    //     notify("error", `Creating ${inputData.artist_name} failed!`);
    //     props.closeModal();
    //     cleanUp();
    //   });
  }

  function handleImageUpload(event) {
    setImageUrl(URL.createObjectURL(event.target.files[0]));
    setInputData((prevInputData) => {
      return {
        ...prevInputData,
        artist_profileImage: event.target.files[0],
      };
    });
  }

  return (
    <div className="form artist">
      <div className="form-item">
        <Input
          type="text"
          placeholder="Name"
          onChange={() => handleChange(event)}
          name="artist_name"
          value={inputData.artist_name}
          style={{ borderRadius: "2px", height: "40px" }}
        />
      </div>

      <div className="form-item">
        <Input
          type="text"
          placeholder="Title"
          onChange={() => handleChange(event)}
          name="artist_title"
          value={inputData.artist_title}
          style={{ borderRadius: "2px", height: "40px" }}
        />
      </div>

      <div className="form-item">
        <Input
          type="text"
          placeholder="ID"
          onChange={() => handleChange(event)}
          name="artist_FUI"
          value={inputData.artist_FUI}
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
              artist_rating: value,
            }))
          }
          name="artist_rating"
          value={inputData.artist_rating}
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
          id="artist_status"
          checked={inputData.artist_status}
          onChange={() => handleChange(event)}
          name="artist_status"
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
              artist_releaseDate: dateString,
            }))
          }
          name="artist_releaseDate"
          date={inputData.artist_releaseDate}
          placeholder="Release Date"
          style={{ borderRadius: "2px" }}
        />
      </div>

      <div className="form-item">
        <TextArea
          placeholder="Description"
          value={inputData.artist_description}
          onChange={() => handleChange(event)}
          name="artist_description"
          rows={4}
          style={{ borderRadius: "2px" }}
        />
      </div>

      <div className="form-item upload">
        <span>Profile Picture</span>
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
