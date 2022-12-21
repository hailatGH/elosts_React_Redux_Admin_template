import { Modal, Button } from "antd";
import { ArtistForm } from "../components";
export default function FormModel(props) {
  return (
    <Modal
      open={props.open}
      title={props.name}
      onOk={props.handleOk}
      onCancel={props.handleCancel}
      footer={[
        <Button key="back" onClick={props.handleCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={props.loading}
          onClick={props.handleOk}
        >
          Submit
        </Button>,
      ]}
    >
      {props.form}
    </Modal>
  );
}
