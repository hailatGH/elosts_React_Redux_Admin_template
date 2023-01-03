import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  updateGenre,
  addNewGenre,
} from "../../../pages/music/stateSlice/genresSlice";
import { Input, InputNumber, Checkbox, Button, Image } from "antd";
import { PlusOutlined } from "@ant-design/icons";

export default function GenreForm(props) {
  const dispatch = useDispatch();
  const [addRequestStatus, setAddRequestStatus] = useState("idle");
  const [imageUrl, setImageUrl] = useState();
  const [isPost, setIsPost] = useState();
  const { TextArea } = Input;

  const [inputData, setInputData] = useState({
    genre_name: "",
    genre_rating: null,
    genre_status: false,
    genre_description: "",
    genre_coverImage: null,
    encoder_FUI: "",
  });

  useEffect(() => {
    setInputData({
      genre_name: props.genre?.genre_name,
      genre_rating: props.genre?.genre_rating,
      genre_status: props.genre?.genre_status,
      genre_description: props.genre?.genre_description,
      genre_coverImage: null,
      encoder_FUI: props.genre?.encoder_FUI,
    });
    setImageUrl(props.genre?.genre_coverImage);
  }, [props?.genre]);

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
    setImageUrl(null);
  }

  function handleSubmit(event) {
    event.preventDefault();
    try {
      setAddRequestStatus("pending");
      // props?.genre
      dispatch(updateGenre({ ...inputData, id: props.genre.id })).unwrap();
      dispatch(addNewGenre(inputData)).unwrap();
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
        genre_coverImage: event.target.files[0],
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
