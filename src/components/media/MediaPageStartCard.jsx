import { Card, Button } from "antd";
export default function MediaPageStartCard(props) {
  return (
    <Card
      className="page_card"
      size="small"
      style={{ marginTop: "10px", height: "60px" }}
    >
      <div
        className="music"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div>
          <h1>{props.name}</h1>
        </div>
        <div>
          <Button
            type="primary"
            style={{ fontSize: "14px", fontWeight: "600", borderRadius: "4px" }}
            onClick={props.showModal}
          >
            Add {props.name}
          </Button>
        </div>
      </div>
    </Card>
  );
}
