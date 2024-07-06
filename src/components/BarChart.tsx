"use client";
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useWindowWidth } from "@react-hook/window-size";

type PlanData = {
  name: string;
  subscribers: number;
  revenue: number;
  activeUsers: number;
};

export default function MyBarChart() {
  const [data, setData] = useState<PlanData[]>([]);
  const windowWidth = useWindowWidth();

  useEffect(() => {
    fetch("/api/barchartdata")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const chartWidth = windowWidth < 768 ? 370 : 620;

  return (

      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip shared={false} trigger="click" />
          <Legend />
          <Bar dataKey="subscribers" fill="#8884d8" />
          <Bar dataKey="revenue" fill="#82ca9d" />
          <Bar dataKey="activeUsers" fill="#ffc658" />
        </BarChart>
      </ResponsiveContainer>
    
  );
}
