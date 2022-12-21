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
        name="artistname"
        rules={[
          {
            required: true,
            message: "Please input Artist Name!",
          },
        ]}
      >
        <Input
          placeholder="Artist Name"
          style={{ borderRadius: "2px", height: "40px" }}
        />
      </Form.Item>

      <Form.Item name="artisttitle">
        <Input
          placeholder="Artist Title"
          style={{ borderRadius: "2px", height: "40px" }}
        />
      </Form.Item>

      <Form.Item name="artistrating" label="Artist Rating">
        <InputNumber
          placeholder="Artist Rating"
          style={{ borderRadius: "2px", height: "30px", width: "50%" }}
        />
      </Form.Item>

      <Form.Item
        name="artiststatus"
        label="Artist Status"
        valuePropName="checked"
      >
        <Switch defaultChecked={true} />
      </Form.Item>

      <Form.Item name="artistreleasedate">
        <DatePicker placement="bottomLeft" placeholder="Artist Release Date" />
      </Form.Item>

      <Form.Item name="artistdescription">
        <TextArea rows={4} placeholder="Artist Description" />
      </Form.Item>

      <Form.Item name="artistfui">
        <Input
          placeholder="Artist ID"
          style={{ borderRadius: "2px", height: "40px" }}
        />
      </Form.Item>

      <Form.Item label="Dragger">
        <Form.Item
          name="dragger"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          noStyle
        >
          <Upload.Dragger name="file">
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
          </Upload.Dragger>
        </Form.Item>
      </Form.Item>
    </Form>
  );
}
