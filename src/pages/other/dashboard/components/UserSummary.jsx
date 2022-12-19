import {
  UserSummaryNewUserTable,
  UserSummaySubscriptionTable,
  UserSummayChart,
  UserSummaryCards,
} from "../components";
import { Divider, Card, Tabs } from "antd";

export default function UserSummary() {
  return (
    <div className="user_summary">
      <Divider orientation="left">User Summary</Divider>
      <UserSummaryCards />

      <div className="user">
        <Card className="page_card" size="small">
          <Tabs
            defaultActiveKey="1"
            type="card"
            items={[
              {
                label: "New Users",
                key: "1",
                children: <UserSummaryNewUserTable />,
              },
              {
                label: "New Subscriptions",
                key: "2",
                children: <UserSummaySubscriptionTable />,
              },
            ]}
          />
        </Card>

        <Card className="page_card" size="small">
          <Tabs
            defaultActiveKey="1"
            type="card"
            items={[
              {
                label: "Weekly",
                key: "1",
                children: <UserSummayChart status="weekly" />,
              },
              {
                label: "Monthly",
                key: "2",
                children: <UserSummayChart status="monthly" />,
              },
              {
                label: "Yearly",
                key: "3",
                children: <UserSummayChart status="yearly" />,
              },
            ]}
          />
        </Card>
      </div>
    </div>
  );
}
