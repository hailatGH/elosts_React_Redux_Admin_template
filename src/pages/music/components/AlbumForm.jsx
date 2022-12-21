import { InboxOutlined } from "@ant-design/icons";
import {
  Form,
  Input,
  InputNumber,
  Switch,
  Upload,
  DatePicker,
  Select,
} from "antd";

const options = [];
for (let i = 10; i < 36; i++) {
  options.push({
    label: i.toString(36) + i,
    value: i.toString(36) + i,
  });
}
const handleChange = (value) => {
  console.log(`selected ${value}`);
};

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
        name="albumname"
        rules={[
          {
            required: true,
            message: "Please input Album Name!",
          },
        ]}
      >
        <Input
          placeholder="Album Name"
          style={{ borderRadius: "2px", height: "40px" }}
        />
      </Form.Item>

      <Form.Item name="albumrating" label="Album Rating">
        <InputNumber
          placeholder="Album Rating"
          style={{ borderRadius: "2px", height: "30px", width: "50%" }}
        />
      </Form.Item>

      <Form.Item
        name="albumstatus"
        label="Album Status"
        valuePropName="checked"
      >
        <Switch defaultChecked={true} />
      </Form.Item>

      <Form.Item name="albumreleasedate">
        <DatePicker placement="bottomLeft" placeholder="Album Release Date" />
      </Form.Item>

      <Form.Item name="albumdescription">
        <TextArea rows={4} placeholder="Album Description" />
      </Form.Item>

      <Form.Item name="albumprice" label="Album Price">
        <InputNumber
          placeholder="Album Price"
          style={{ borderRadius: "2px", height: "30px", width: "50%" }}
        />
      </Form.Item>

      <Form.Item name="artistfui" label="Artists ID">
        <Select
          mode="multiple"
          allowClear
          placeholder="Please select"
          defaultValue={["a10", "c12"]}
          onChange={handleChange}
          options={options}
          style={{ borderRadius: "2px", height: "30px", width: "100%" }}
        />
      </Form.Item>

      <Form.Item label="Album Cover Image">
        <Form.Item
          name="album_coverImage"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          noStyle
        >
          <Upload.Dragger name="album_coverImage">
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag Album Cover Image <br /> to this area to upload
            </p>
          </Upload.Dragger>
        </Form.Item>
      </Form.Item>
    </Form>
  );
}
