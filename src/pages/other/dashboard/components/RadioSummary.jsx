import { AnalyticsCard } from "../components";
import { Divider, Card } from "antd";

export default function RadioSummary() {
  return (
    <div className="radio_summary">
      <Divider orientation="left">Radio Summary</Divider>
      <div className="analytic_cards">
        <AnalyticsCard
          icon="bx bxs-user"
          name="Artists"
          count={267}
          iconbgcolor="#1f2530"
          contentbgcolor="#2d3545"
          // iconbgcolor="#675da3"
          // contentbgcolor="#7368b5"
        />
        <AnalyticsCard
          icon="bx bxs-album"
          name="Albums"
          count={1207}
          iconbgcolor="#1f2530"
          contentbgcolor="#2d3545"
          // iconbgcolor="#3296D8"
          // contentbgcolor="#38A7F0"
        />
        <AnalyticsCard
          icon="bx bx-category-alt"
          name="Genres"
          count={18}
          iconbgcolor="#1f2530"
          contentbgcolor="#2d3545"
          // iconbgcolor="#6BBD43"
          // contentbgcolor="#77D24B"
        />
        <AnalyticsCard
          icon="bx bxs-music"
          name="Tracks"
          count={22067}
          iconbgcolor="#1f2530"
          contentbgcolor="#2d3545"
          // iconbgcolor="#E25373"
          // contentbgcolor="#FC5C80"
        />
      </div>
      <div className="radio">
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
