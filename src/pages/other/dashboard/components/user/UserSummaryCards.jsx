import { AnalyticsCard } from "../../components";

export default function UserSummayCards() {
  return (
    <div className="analytic_cards">
      <AnalyticsCard
        icon="bx bxs-user"
        name="Total Users"
        count={267}
        iconbgcolor="#1f2530"
        contentbgcolor="#2d3545"
      />
      <AnalyticsCard
        icon="bx bxs-user"
        name="New Users"
        count={1207}
        iconbgcolor="#1f2530"
        contentbgcolor="#2d3545"
      />
      <AnalyticsCard
        icon="bx bxs-user"
        name="Total Subscribed Users"
        count={18}
        iconbgcolor="#1f2530"
        contentbgcolor="#2d3545"
      />
      <AnalyticsCard
        icon="bx bxs-user"
        name="Newly Subscribed Users"
        count={22067}
        iconbgcolor="#1f2530"
        contentbgcolor="#2d3545"
      />
    </div>
  );
}
