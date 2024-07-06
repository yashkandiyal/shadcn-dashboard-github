"use client";
import React, { useEffect, useState } from "react";
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter,
  ResponsiveContainer
} from "recharts";

type PlanData = {
  name: string;
  subscribers: number;
  revenue: number;
  activeUsers: number;
  newUsers: number;
};

export default function LineBarGraph() {
  const [data, setData] = useState<PlanData[]>([]);

  useEffect(() => {
    fetch("/api/linebargraphdata")
        .then((response) => response.json())
        .then((data) => setData(data))
        .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart
            data={data}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20
            }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area type="monotone" dataKey="revenue" fill="#8884d8" stroke="#8884d8" />
          <Bar dataKey="subscribers" barSize={20} fill="#413ea0" />
          <Line type="monotone" dataKey="activeUsers" stroke="#ff7300" />
          <Scatter dataKey="newUsers" fill="red" />
        </ComposedChart>
      </ResponsiveContainer>
  );
}
