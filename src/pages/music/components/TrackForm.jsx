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
        name="trackname"
        rules={[
          {
            required: true,
            message: "Please input Track Name!",
          },
        ]}
      >
        <Input
          placeholder="Track Name"
          style={{ borderRadius: "2px", height: "40px" }}
        />
      </Form.Item>

      <Form.Item name="trackrating" label="Track Rating">
        <InputNumber
          placeholder="Track Rating"
          style={{ borderRadius: "2px", height: "30px", width: "50%" }}
        />
      </Form.Item>

      <Form.Item
        name="trackstatus"
        label="Track Status"
        valuePropName="checked"
      >
        <Switch defaultChecked={true} />
      </Form.Item>

      <Form.Item name="trackreleasedate">
        <DatePicker placement="bottomLeft" placeholder="Track Release Date" />
      </Form.Item>

      <Form.Item name="trackdescription">
        <TextArea rows={4} placeholder="Track Description" />
      </Form.Item>

      <Form.Item label="Track Cover Image">
        <Form.Item
          name="track_coverImage"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          noStyle
        >
          <Upload.Dragger name="file">
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag Track Cover Image <br /> to this area to upload
            </p>
          </Upload.Dragger>
        </Form.Item>
      </Form.Item>

      <Form.Item label="Track Audio File">
        <Form.Item
          name="track_audioFile"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          noStyle
        >
          <Upload.Dragger name="file">
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag Track Audio File <br /> to this area to upload
            </p>
          </Upload.Dragger>
        </Form.Item>
      </Form.Item>

      <Form.Item name="track_lyrics">
        <TextArea rows={4} placeholder="Track Lyrics" />
      </Form.Item>

      <Form.Item name="track_price" label="Track Price">
        <InputNumber
          placeholder="Track Price"
          style={{ borderRadius: "2px", height: "30px", width: "50%" }}
        />
      </Form.Item>

      <Form.Item name="Featuring Artists">
        <TextArea rows={2} placeholder="Featuring Artists" />
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

      <Form.Item name="albumid" label="Album ID">
        <Select
          showSearch
          style={{
            width: 200,
          }}
          placeholder="Search to Select"
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? "").includes(input)
          }
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? "")
              .toLowerCase()
              .localeCompare((optionB?.label ?? "").toLowerCase())
          }
          options={[
            {
              value: "1",
              label: "Not Identified",
            },
            {
              value: "2",
              label: "Closed",
            },
            {
              value: "3",
              label: "Communicated",
            },
            {
              value: "4",
              label: "Identified",
            },
            {
              value: "5",
              label: "Resolved",
            },
            {
              value: "6",
              label: "Cancelled",
            },
          ]}
        />
      </Form.Item>
      <Form.Item name="genreid" label="Genre ID">
        <Select
          showSearch
          style={{
            width: 200,
          }}
          placeholder="Search to Select"
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? "").includes(input)
          }
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? "")
              .toLowerCase()
              .localeCompare((optionB?.label ?? "").toLowerCase())
          }
          options={[
            {
              value: "1",
              label: "Not Identified",
            },
            {
              value: "2",
              label: "Closed",
            },
            {
              value: "3",
              label: "Communicated",
            },
            {
              value: "4",
              label: "Identified",
            },
            {
              value: "5",
              label: "Resolved",
            },
            {
              value: "6",
              label: "Cancelled",
            },
          ]}
        />
      </Form.Item>
    </Form>
  );
}
