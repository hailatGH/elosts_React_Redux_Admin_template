import { useState } from "react";
import { Input, InputNumber, Checkbox, DatePicker, Button, Image } from "antd";
import { PlusOutlined } from "@ant-design/icons";

export default function ArtistForm(props) {
  const { TextArea } = Input;
  const [imageSet, setImageSet] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [imageFile, setImageFile] = useState();

  function handleImageUpload(event) {
    setImageFile(event.target.files[0]);
  }

  const [inputData, setInputData] = useState(() => {
    return {
      artist_name: "",
      artist_title: "",
      artist_FUI: "",
      artist_rating: null,
      artist_status: false,
      artist_description: "",
      artist_releaseDate: null,
      artist_profileImage: null,
    };
  });

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setInputData((prevInputData) => {
      return {
        ...prevInputData,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    console.log(inputData);
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
    setImageSet(false);
  }

  return (
    <div className="form artist">
      <div className="form-item">
        <Input
          type="text"
          placeholder="Artist Name"
          onChange={() => handleChange(event)}
          name="artist_name"
          value={inputData.artist_name}
          style={{ borderRadius: "2px", height: "40px" }}
        />
      </div>

      <div className="form-item">
        <Input
          type="text"
          placeholder="Artist Title"
          onChange={() => handleChange(event)}
          name="artist_title"
          value={inputData.artist_title}
          style={{ borderRadius: "2px", height: "40px" }}
        />
      </div>

      <div className="form-item">
        <Input
          type="text"
          placeholder="Artist ID"
          onChange={() => handleChange(event)}
          name="artist_FUI"
          value={inputData.artist_FUI}
          style={{ borderRadius: "2px", height: "40px" }}
        />
      </div>

      <div className="form-item">
        <InputNumber
          type="number"
          placeholder="Artist Rating"
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
          Artist Status
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
          placeholder="Artist Release Date"
          style={{ borderRadius: "2px" }}
        />
      </div>

      <div className="form-item">
        <TextArea
          placeholder="Artist Description"
          value={inputData.artist_description}
          onChange={() => handleChange(event)}
          name="artist_description"
          rows={4}
          style={{ borderRadius: "2px" }}
        />
      </div>

      <div className="form-item upload">
        <span>Artist Profile Picture</span>
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
          onChange={() => {
            setImageSet(true);
            setImageUrl(URL.createObjectURL(event.target.files[0]));

            // handleImageUpload(event);
            // const imageData = new FormData();
            // imageData.append("file", event.target.files[0]);
            // imageData.append("fileName", event.target.files[0].name);

            setInputData((prevInputData) => ({
              ...prevInputData,
              artist_profileImage: event.target.files[0],
            }));
          }}
        />
      </div>

      <div className="form-item submit_btn_wraper">
        <Button
          type="primary"
          htmlType="submit"
          onClick={() => {
            handleSubmit(event);
            props.closeModal();
          }}
          className="submit_btn"
        >
          Submit
        </Button>
      </div>
    </div>
  );
}
