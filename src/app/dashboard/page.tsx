"use client";
import React from "react";
import PageTitle from "@/components/PageTitle";
import { DollarSign, Users, CreditCard, Activity } from "lucide-react";
import Card, { CardContent, CardProps } from "@/components/Card";
import BarChart from "@/components/BarChart";
import SalesCard, { SalesProps } from "@/components/SalesCard";
import PieChartComponent from "@/components/PieChart";
import LineBarGraph from "@/components/LineBarGraph";
import StackedAreaChart from "@/components/StackedAreaChart";
import LegendBarGraph from "@/components/LegendBarGraph";

const cardData: CardProps[] = [
  {
    label: "Total Revenue",
    amount: "$45,231.89",
    discription: "+20.1% from last month",
    icon: DollarSign,
  },
  {
    label: "Subscriptions",
    amount: "+2350",
    discription: "+180.1% from last month",
    icon: Users,
  },
  {
    label: "Sales",
    amount: "+12,234",
    discription: "+19% from last month",
    icon: CreditCard,
  },
  {
    label: "Active Now",
    amount: "+573",
    discription: "+201 since last hour",
    icon: Activity,
  },
];

const userSalesData: SalesProps[] = [
  {
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    saleAmount: "+$1,999.00",
  },
  {
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    saleAmount: "+$1,999.00",
  },
  {
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    saleAmount: "+$39.00",
  },
  {
    name: "William Kim",
    email: "will@email.com",
    saleAmount: "+$299.00",
  },
  {
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    saleAmount: "+$39.00",
  },
];

const Home = () => {
  return (
      <div className="flex flex-col gap-5 w-full p-2 md:p-0">
        <PageTitle title="Dashboard" />
        <section className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {cardData.map((d, i) => (
              <Card
                  key={i}
                  amount={d.amount}
                  discription={d.discription}
                  icon={d.icon}
                  label={d.label}
              />
          ))}
        </section>
        <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <CardContent className="flex justify-center items-center flex-col w-full">
            <p className="p-4 font-semibold">Overview</p>
            <BarChart />
          </CardContent>
          <CardContent className="flex flex-col justify-between gap-4 w-full">
            <section>
              <p className="font-semibold">Recent Sales</p>
              <p className="text-sm text-gray-400">
                You made 265 sales this month.
              </p>
            </section>
            <div className="flex flex-col gap-4 w-full">
              {userSalesData.map((d, i) => (
                  <SalesCard
                      key={i}
                      email={d.email}
                      name={d.name}
                      saleAmount={d.saleAmount}
                  />
              ))}
            </div>
          </CardContent>

          <CardContent className="flex justify-center items-center flex-col w-full">
            <p className="p-4 font-semibold">Pie Chart</p>
            <PieChartComponent />
          </CardContent>
          <CardContent className="flex justify-center items-center flex-col w-full">
            <p className="p-4 font-semibold">Line Bar Graph</p>
            <LineBarGraph />
          </CardContent>
          <CardContent className="flex justify-center items-center flex-col w-full">
            <p className="p-4 font-semibold">Stacked Area Chart</p>
            <StackedAreaChart />
          </CardContent>
          <CardContent className="flex justify-center items-center flex-col w-full">
            <p className="p-4 font-semibold">Legend Bar Graph</p>
            <LegendBarGraph />
          </CardContent>
        </section>
      </div>
  );
};

export default Home;
