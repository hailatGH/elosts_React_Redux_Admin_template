import {
  MediaSummaryChart,
  MusicSummary,
  PodcastOverallSummary,
  RadioSummary,
} from "../components";
import { Divider, Card, Tabs } from "antd";

export default function MediaSummary() {
  return (
    <div className="media_summary">
      <Divider orientation="left">Music - Podcast - Radio Summary</Divider>

      <div className="media">
        <Card className="page_card" size="small">
          <div className="chart_description">
            <div className="block">
              <div className="music box"></div>
              <div>Music</div>
            </div>
            <div className="block">
              <div className="podcast box"></div>
              <div>Podcast</div>
            </div>
            <div className="block">
              <div className="radio box"></div>
              <div>Radio</div>
            </div>
          </div>
          <MediaSummaryChart />
        </Card>

        <Card className="page_card" size="small">
          <Tabs
            defaultActiveKey="1"
            type="card"
            items={[
              {
                label: "Music",
                key: "1",
                children: <MusicSummary />,
              },
              {
                label: "Podcast",
                key: "2",
                children: <PodcastOverallSummary />,
              },
              {
                label: "Radio",
                key: "3",
                children: <RadioSummary />,
              },
            ]}
          />
        </Card>
      </div>
    </div>
  );
}
