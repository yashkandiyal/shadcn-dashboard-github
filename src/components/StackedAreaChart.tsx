"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { useWindowWidth } from "@react-hook/window-size";

type ChartData = {
  name: string;
  newUsers: number;
  activeUsers: number;
  revenue: number;
};

export default function StackedAreaChart() {
  const [data, setData] = useState<ChartData[]>([]);
  const [opacity, setOpacity] = useState({ newUsers: 1, activeUsers: 1 });

  const handleMouseEnter = useCallback(
      (dataKey: any) => {
        setOpacity((prevOpacity) => ({
          ...prevOpacity,
          [dataKey]: 0.5
        }));
      },
      [setOpacity]
  );

  const handleMouseLeave = useCallback(
      (dataKey: any) => {
        setOpacity((prevOpacity) => ({
          ...prevOpacity,
          [dataKey]: 1
        }));
      },
      [setOpacity]
  );

  useEffect(() => {
    fetch("/api/stackedareachartdata")
        .then((response) => response.json())
        .then((data) => setData(data))
        .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend
              onMouseEnter={(e) => handleMouseEnter(e.dataKey)}
              onMouseLeave={(e) => handleMouseLeave(e.dataKey)}
          />
          <Area
              type="monotone"
              dataKey="newUsers"
              stackId="1"
              strokeOpacity={opacity.newUsers}
              stroke="#8884d8"
              fill="#8884d8"
          />
          <Area
              type="monotone"
              dataKey="activeUsers"
              stackId="1"
              strokeOpacity={opacity.activeUsers}
              stroke="#82ca9d"
              fill="#82ca9d"
          />
        </AreaChart>
      </ResponsiveContainer>
  );
}
