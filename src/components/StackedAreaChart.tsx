"use client"
import React, { useState, useCallback } from "react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";
import { useWindowWidth } from "@react-hook/window-size";

const data = [
    { name: "Page A", uv: 5000, pv: 2000, amt: 2400 },
    { name: "Page B", uv: 6000, pv: 3000, amt: 2210 },
    { name: "Page C", uv: 8000, pv: 5000, amt: 2290 },
    { name: "Page D", uv: 7000, pv: 4000, amt: 2000 },
    { name: "Page E", uv: 4000, pv: 6000, amt: 2181 },
    { name: "Page F", uv: 3000, pv: 8000, amt: 2500 },
    { name: "Page G", uv: 2000, pv: 7000, amt: 2100 }
];


export default function StackedAreaChart() {
    const [opacity, setOpacity] = useState({ uv: 1, pv: 1 });

    const handleMouseEnter = useCallback(
        (dataKey:any) => {
            setOpacity((prevOpacity) => ({
                ...prevOpacity,
                [dataKey]: 0.5
            }));
        },
        [setOpacity]
    );

    const handleMouseLeave = useCallback(
        (dataKey:any) => {
            setOpacity((prevOpacity) => ({
                ...prevOpacity,
                [dataKey]: 1
            }));
        },
        [setOpacity]
    );

    const windowWidth = useWindowWidth();
    const chartWidth = windowWidth < 768 ? 350 : 700;

    return (
        <AreaChart
            width={chartWidth}
            height={400}
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
                dataKey="uv"
                stackId="1"
                strokeOpacity={opacity.uv}
                stroke="#8884d8"
                fill="#8884d8"
            />
            <Area
                type="monotone"
                dataKey="pv"
                stackId="1"
                strokeOpacity={opacity.pv}
                stroke="#82ca9d"
                fill="#82ca9d"
            />
        </AreaChart>
    );
}
