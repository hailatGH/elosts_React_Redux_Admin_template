import { Tabs } from "antd";
import {
  ArtistSummary,
  AlbumSummary,
  GenreSummary,
  TrackSummary,
} from "../../../components";

export default function MusicSummary() {
  return (
    <Tabs
      defaultActiveKey="1"
      items={[
        {
          label: "Artists",
          key: "1",
          children: <ArtistSummary />,
        },
        {
          label: "Albums",
          key: "2",
          children: <AlbumSummary />,
        },
        {
          label: "Geners",
          key: "3",
          children: <GenreSummary />,
        },
        {
          label: "Tracks",
          key: "4",
          children: <TrackSummary />,
        },
      ]}
    />
  );
}
