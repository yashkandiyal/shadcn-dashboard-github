"use client";
import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

// Define the data type
type Payment = {
  name: string;
  email: string;
  lastOrder: string;
  method: string;
};

const COLORS: { [key: string]: string } = {
  Stripe: "#8884d8",
  "Google Pay": "#82ca9d",
  "Apple Pay": "#ffc658",
}; // Colors for each payment method

export default function PieChartComponent() {
  const [data, setData] = useState<Payment[]>([]);

  useEffect(() => {
    fetch("/api/piechartdata")
        .then((response) => response.json())
        .then((data) => setData(data))
        .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Process the data for the PieChart
  const methodCounts = data.reduce((acc: Record<string, number>, payment) => {
    acc[payment.method] = (acc[payment.method] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.keys(methodCounts).map((key) => ({
    name: key,
    value: methodCounts[key],
  }));

  return (
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
              data={chartData}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={120}
              label={({ name, value }) => `${name}: ${value}`} // Display labels with name and value
              labelLine={false} // Hide label line for cleaner look
          >
            {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[entry.name]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
  );
}
