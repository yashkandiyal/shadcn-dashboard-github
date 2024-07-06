"use client";
import React, { useState, useEffect, useCallback } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

type ChartData = {
  month: string;
  newUsers: number;
  sales: number;
  revenue: number;
};

export default function LegendLineGraph() {
  const [data, setData] = useState<ChartData[]>([]);
  const [opacity, setOpacity] = useState({ newUsers: 1, sales: 1 });

  const handleMouseEnter = useCallback(
      (o: any) => {
        const { dataKey } = o;
        setOpacity({ ...opacity, [dataKey]: 0.5 });
      },
      [opacity]
  );

  const handleMouseLeave = useCallback(
      (o: any) => {
        const { dataKey } = o;
        setOpacity({ ...opacity, [dataKey]: 1 });
      },
      [opacity]
  );

  useEffect(() => {
    fetch("/api/linebargraphdata")
        .then((response) => response.json())
        .then((data) => setData(data))
        .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
          <Line
              type="monotone"
              dataKey="sales"
              strokeOpacity={opacity.sales}
              stroke="#8884d8"
              activeDot={{ r: 8 }}
          />
          <Line
              type="monotone"
              dataKey="newUsers"
              strokeOpacity={opacity.newUsers}
              stroke="#82ca9d"
          />
        </LineChart>
      </ResponsiveContainer>
  );
}
