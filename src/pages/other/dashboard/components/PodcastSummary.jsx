import { AnalyticsCard } from "../components";
import { Divider, Card } from "antd";

export default function PodcastSummary() {
  return (
    <div className="podcast_summary">
      <Divider orientation="left">Podcast Summary</Divider>
      <div className="analytic_cards">
        <AnalyticsCard
          icon="bx bxs-user"
          name="Hosts"
          count={267}
          iconbgcolor="#1f2530"
          contentbgcolor="#2d3545"
        />
        <AnalyticsCard
          icon="bx bxs-microphone-alt"
          name="Podcasts"
          count={1207}
          iconbgcolor="#1f2530"
          contentbgcolor="#2d3545"
        />
        <AnalyticsCard
          icon="bx bx-category-alt"
          name="Categories"
          count={18}
          iconbgcolor="#1f2530"
          contentbgcolor="#2d3545"
        />
        <AnalyticsCard
          icon="bx bx-play-circle"
          name="Episodes"
          count={22067}
          iconbgcolor="#1f2530"
          contentbgcolor="#2d3545"
        />
      </div>
      <div className="podcast">
        <Card className="page_card" size="small">
          Incomming Table Data ...
        </Card>
        <Card className="page_card" size="small">
          Incomming Graph Data ...
        </Card>
      </div>
    </div>
  );
}
