import { useState } from "react";
import { Input, InputNumber, Checkbox, DatePicker, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

export default function ArtistForm(props) {
  const { TextArea } = Input;

  const [formData, setFormData] = useState(() => {
    return {
      artist_name: "",
      artist_title: "",
      artist_FUI: "",
      artist_rating: 0,
      artist_status: false,
      artist_description: "",
      artist_releaseDate: null,
      artist_profileImage: null,
    };
  });

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value,
      };
    });
  }

  function handleSubmit() {
    console.log(formData);
  }

  return (
    <div className="form artist">
      <div className="form-item">
        <Input
          type="text"
          placeholder="Artist Name"
          onChange={handleChange}
          name="artist_name"
          value={formData.artist_name}
          style={{ borderRadius: "2px", height: "40px" }}
        />
      </div>

      <div className="form-item">
        <Input
          type="text"
          placeholder="Artist Title"
          onChange={handleChange}
          name="artist_title"
          value={formData.artist_title}
          style={{ borderRadius: "2px", height: "40px" }}
        />
      </div>

      <div className="form-item">
        <Input
          type="text"
          placeholder="Artist ID"
          onChange={handleChange}
          name="artist_FUI"
          value={formData.artist_FUI}
          style={{ borderRadius: "2px", height: "40px" }}
        />
      </div>

      <div className="form-item">
        <InputNumber
          type="number"
          placeholder="Artist Rating"
          onChange={(value) =>
            setFormData((prevFormData) => ({
              ...prevFormData,
              artist_rating: value,
            }))
          }
          name="artist_rating"
          value={formData.artist_rating}
          min={0}
          max={5}
          defaultValue={0}
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
          checked={formData.artist_status}
          onChange={handleChange}
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
            setFormData((prevFormData) => ({
              ...prevFormData,
              artist_releaseDate: dateString,
            }))
          }
          name="artist_releaseDate"
          date={formData.artist_releaseDate}
          placeholder="Artist Release Date"
          style={{ borderRadius: "2px" }}
        />
      </div>

      <div className="form-item">
        <TextArea
          placeholder="Artist Description"
          value={formData.artist_description}
          onChange={handleChange}
          name="artist_description"
          rows={4}
          style={{ borderRadius: "2px" }}
        />
      </div>

      <div className="form-item upload">
        <span>Artist Profile Picture</span>
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
        <Input
          id="files"
          style={{ visibility: "hidden" }}
          type="file"
          onChange={() =>
            setFormData((prevFormData) => ({
              ...prevFormData,
              artist_profileImage: event.target.files[0],
            }))
          }
        />
      </div>

      <div className="form-item submit_btn_wraper">
        <Button
          type="primary"
          htmlType="submit"
          onClick={() => {
            handleSubmit();
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
