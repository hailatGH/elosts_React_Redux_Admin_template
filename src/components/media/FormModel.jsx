import { Modal } from "antd";

export default function FormModel(props) {
  return (
    <Modal
      open={props.open}
      title={props.name}
      onOk={props.closeModal}
      onCancel={props.closeModal}
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
    >
      {props.form}
    </Modal>
  );
}
