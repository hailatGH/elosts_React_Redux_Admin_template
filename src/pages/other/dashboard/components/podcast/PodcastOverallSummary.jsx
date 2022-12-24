import { Tabs } from "antd";
import {
  PodcastHostSummary,
  CategorySummary,
  EpisodeSummary,
  PodcastSummary,
} from "../../components";

export default function PodcastOverallSummary() {
  return (
    <Tabs
      defaultActiveKey="1"
      items={[
        {
          label: "Hosts",
          key: "1",
          children: <PodcastHostSummary />,
        },
        {
          label: "Podcasts",
          key: "2",
          children: <PodcastSummary />,
        },
        {
          label: "Categories",
          key: "3",
          children: <CategorySummary />,
        },
        {
          label: "Episodes",
          key: "4",
          children: <EpisodeSummary />,
        },
      ]}
    />
  );
}
