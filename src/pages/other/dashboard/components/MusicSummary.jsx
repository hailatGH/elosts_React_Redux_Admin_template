import { AnalyticsCard } from ".";
import { Divider, Card } from "antd";

export default function MusicSummary() {
  return (
    <div className="music_summary">
      <Divider orientation="left">Music Summary</Divider>
      <div className="analytic_cards">
        <AnalyticsCard
          icon="bx bxs-user"
          name="Artists"
          count={267}
          iconbgcolor="#1f2530"
          contentbgcolor="#2d3545"
        />
        <AnalyticsCard
          icon="bx bxs-album"
          name="Albums"
          count={1207}
          iconbgcolor="#1f2530"
          contentbgcolor="#2d3545"
        />
        <AnalyticsCard
          icon="bx bx-category-alt"
          name="Genres"
          count={18}
          iconbgcolor="#1f2530"
          contentbgcolor="#2d3545"
        />
        <AnalyticsCard
          icon="bx bxs-music"
          name="Tracks"
          count={22067}
          iconbgcolor="#1f2530"
          contentbgcolor="#2d3545"
        />
      </div>
      <div className="music">
        <Card className="page_card" size="small">
          Incomming Graph Data ...
        </Card>
        <Card className="page_card" size="small">
          Incomming Table Data ...
        </Card>
      </div>
    </div>
  );
}
