import React from "react";
import { HiCurrencyRupee } from "react-icons/hi2";
import { RiFileList3Line } from "react-icons/ri";
import { BiSolidUserCircle } from "react-icons/bi";
import { MdOutlineFileUpload } from "react-icons/md";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { PieChart, Pie, Cell } from "recharts";

const Dashdata = () => {
  const data1 = [{ name: "Group A", value: 400 }];
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const data = [
    {
      name: "Mon",
      offline: 10000,
      online: 16000,
    },
    {
      name: "Tue",
      offline: 9000,
      online: 18000,
    },
    {
      name: "Wed",
      offline: 22000,
      online: 8000,
    },
    {
      name: "Thu",
      offline: 7000,
      online: 18000,
    },
    {
      name: "Fri",
      offline: 14000,
      online: 14000,
    },
    {
      name: "Sat",
      offline: 16000,
      online: 18000,
    },
    {
      name: "Sun",
      offline: 9000,
      online: 23500,
    },
  ];
  return (
    <main className="main-container">
      <div className="main-title">
        <h3>DASHBOARD</h3>
      </div>
      <div
        style={{
          border: "1px solid #9e9ea4",
          padding: "25px",
          borderRadius: "15px",
        }}
      >
        <h5>Today Sales</h5>
        <h6>Sales summary</h6>
        <div className="main-cards">
          <div className="card">
            <div className="card-inner">
              <HiCurrencyRupee className="card_icon" />
            </div>
            <h3>₹ 12K</h3>
            <h3>Today Earning</h3>
          </div>
          <div className="card">
            <div className="card-inner">
              <RiFileList3Line className="card_icon" />
            </div>
            <h3>₹ 12K</h3>
            <h3>Products Sold</h3>
          </div>
          <div className="card">
            <div className="card-inner">
              <BiSolidUserCircle className="card_icon" />
            </div>
            <h3>₹ 12K</h3>
            <h3>New Customers</h3>
          </div>
          <div className="card">
            <div className="card-inner">
              <MdOutlineFileUpload className="card_icon" />
            </div>
            <h3>Export</h3>
          </div>
        </div>
      </div>
      <div className="charts">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={700}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 0,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="0 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="online"
              fill="#8884d8"
              activeBar={<Rectangle fill="pink" stroke="blue" />}
            />
            <Bar
              dataKey="offline"
              fill="#82ca9d"
              activeBar={<Rectangle fill="gold" stroke="purple" />}
            />
          </BarChart>
        </ResponsiveContainer>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="0 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="offline"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="online" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
        <PieChart width={500} height={400}>
          <Pie
            data={data1}
            cx={200}
            cy={200}
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            <Cell fill="#0088FE"/>
          </Pie>
        </PieChart>
      </div>
    </main>
  );
};

export default Dashdata;
