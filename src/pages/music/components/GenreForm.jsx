import { InboxOutlined } from "@ant-design/icons";
import { Form, Input, InputNumber, Switch, Upload, DatePicker } from "antd";

const { TextArea } = Input;
const normFile = (e) => {
  console.log("Upload event:", e);
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

export default function ArtistForm() {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <Form onFinish={onFinish}>
      <Form.Item
        name="genrename"
        rules={[
          {
            required: true,
            message: "Please input Genre Name!",
          },
        ]}
      >
        <Input
          placeholder="Genre Name"
          style={{ borderRadius: "2px", height: "40px" }}
        />
      </Form.Item>

      <Form.Item name="genrerating" label="Genre Rating">
        <InputNumber
          placeholder="Genre Rating"
          style={{ borderRadius: "2px", height: "30px", width: "50%" }}
        />
      </Form.Item>

      <Form.Item
        name="genrestatus"
        label="Genre Status"
        valuePropName="checked"
      >
        <Switch defaultChecked={true} />
      </Form.Item>

      <Form.Item name="genredescription">
        <TextArea rows={4} placeholder="Genre Description" />
      </Form.Item>

      <Form.Item label="Genre Cover Image">
        <Form.Item
          name="genre_coverImage"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          noStyle
        >
          <Upload.Dragger name="file">
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag Genre Cover Image <br /> to this area to upload
            </p>
          </Upload.Dragger>
        </Form.Item>
      </Form.Item>
    </Form>
  );
}
