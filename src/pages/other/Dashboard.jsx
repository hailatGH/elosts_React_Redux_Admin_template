import { Breadcrumb, Card } from "antd";
import { NavLink } from "react-router-dom";
import { AnalyticsCard } from "../../components";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default function Dashboard() {
  return (
    <div className="page_wraper">
      <div className="breadCrumb">
        <Breadcrumb>
          <Breadcrumb.Item>
            <NavLink to="/">HOME</NavLink>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>

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

      <div className="summary">
        <Breadcrumb className="summery_title">
          <Breadcrumb.Item>User Summary</Breadcrumb.Item>
        </Breadcrumb>
        <div className="user">
          <Card className="page_card" size="small">
            Incomming Table Data ...
          </Card>
          <div className="chart_wraper">
            <ResponsiveContainer>
              <AreaChart
                width={400}
                height={400}
                data={data}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="uv"
                  stackId="1"
                  stroke="#8884d8"
                  fill="#8884d8"
                />
                <Area
                  type="monotone"
                  dataKey="pv"
                  stackId="1"
                  stroke="#82ca9d"
                  fill="#82ca9d"
                />
                <Area
                  type="monotone"
                  dataKey="amt"
                  stackId="1"
                  stroke="#ffc658"
                  fill="#ffc658"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <Breadcrumb>
          <Breadcrumb.Item>Music Summary</Breadcrumb.Item>
        </Breadcrumb>
        <div className="music">
          <div className="chart_wraper">
            <ResponsiveContainer>
              <AreaChart
                width={400}
                height={400}
                data={data}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="uv"
                  stackId="1"
                  stroke="#8884d8"
                  fill="#8884d8"
                />
                <Area
                  type="monotone"
                  dataKey="pv"
                  stackId="1"
                  stroke="#82ca9d"
                  fill="#82ca9d"
                />
                <Area
                  type="monotone"
                  dataKey="amt"
                  stackId="1"
                  stroke="#ffc658"
                  fill="#ffc658"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <Card className="page_card" size="small">
            Incomming Table Data ...
          </Card>
        </div>

        <Breadcrumb>
          <Breadcrumb.Item>Podcast Summary</Breadcrumb.Item>
        </Breadcrumb>
        <div className="podcast">
          <Card className="page_card" size="small">
            Incomming Table Data ...
          </Card>
          <div className="chart_wraper">
            <ResponsiveContainer>
              <AreaChart
                width={400}
                height={400}
                data={data}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="uv"
                  stackId="1"
                  stroke="#8884d8"
                  fill="#8884d8"
                />
                <Area
                  type="monotone"
                  dataKey="pv"
                  stackId="1"
                  stroke="#82ca9d"
                  fill="#82ca9d"
                />
                <Area
                  type="monotone"
                  dataKey="amt"
                  stackId="1"
                  stroke="#ffc658"
                  fill="#ffc658"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <Breadcrumb>
          <Breadcrumb.Item>Radio Summary</Breadcrumb.Item>
        </Breadcrumb>
        <div className="radio">
          <div className="chart_wraper">
            <ResponsiveContainer>
              <AreaChart
                width={400}
                height={400}
                data={data}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="uv"
                  stackId="1"
                  stroke="#8884d8"
                  fill="#8884d8"
                />
                <Area
                  type="monotone"
                  dataKey="pv"
                  stackId="1"
                  stroke="#82ca9d"
                  fill="#82ca9d"
                />
                <Area
                  type="monotone"
                  dataKey="amt"
                  stackId="1"
                  stroke="#ffc658"
                  fill="#ffc658"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <Card className="page_card" size="small">
            Incomming Table Data ...
          </Card>
        </div>
      </div>
    </div>
  );
}
