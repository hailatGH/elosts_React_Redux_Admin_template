import { Tabs } from "antd";
import { RadioHostSummary, StationSummary } from "../../../components";

export default function MusicSummary() {
  return (
    <Tabs
      defaultActiveKey="1"
      items={[
        {
          label: "Hosts",
          key: "1",
          children: <RadioHostSummary />,
        },
        {
          label: "Stations",
          key: "2",
          children: <StationSummary />,
        },
      ]}
    />
  );
}
