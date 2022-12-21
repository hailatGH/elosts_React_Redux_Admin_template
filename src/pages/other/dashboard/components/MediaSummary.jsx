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

      <div className="media_stat">
        <Card className="page_card left" size="small">
          <Divider>Music Statistic</Divider>
          <div className="stat_wraper">
            <div className="stat_card">
              <h3>Artists</h3>
              <h3>213</h3>
            </div>
            <div className="stat_card">
              <h3>Albums</h3>
              <h3>427</h3>
            </div>
            <div className="stat_card">
              <h3>Geners</h3>
              <h3>24</h3>
            </div>
            <div className="stat_card">
              <h3>Tracks</h3>
              <h3>5124</h3>
            </div>
          </div>
        </Card>
        <Card className="page_card mid" size="small">
          <Divider>Podcast Statistic</Divider>
          <div className="stat_wraper">
            <div className="stat_card">
              <h3>Hosts</h3>
              <h3>142</h3>
            </div>
            <div className="stat_card">
              <h3>Podcasts</h3>
              <h3>187</h3>
            </div>
            <div className="stat_card">
              <h3>Categories</h3>
              <h3>16</h3>
            </div>
            <div className="stat_card">
              <h3>Episodes</h3>
              <h3>463</h3>
            </div>
          </div>
        </Card>
        <Card className="page_card right" size="small">
          <Divider>Radio Statistic</Divider>
          <div className="stat_wraper">
            <div className="stat_card">
              <h3>Hosts</h3>
              <h3>17</h3>
            </div>
            <div className="stat_card">
              <h3>Stations</h3>
              <h3>29</h3>
            </div>
          </div>
        </Card>
      </div>

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
