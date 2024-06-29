"use client";
import React, { useEffect, useState } from "react";
import PageTitle from "@/components/PageTitle";
import PlanCard from "@/components/PlanCard";

const cardDetails = [
  {
    plan: "Basic Plan",
    pricing: 9.99,
    features: ["Basic Dashboard", "Standard User Management", "Email Support"],
    link: process.env.NEXT_PUBLIC_BASIC_PLAN!,
  },
  {
    plan: "Premium Plan",
    pricing: 19.99,
    features: [
      "Advanced Dashboard",
      "Enhanced User Management",
      "Priority Email & Chat Support",
    ],
    link: process.env.NEXT_PUBLIC_PREMIUM_PLAN!,
  },
  {
    plan: "Ultimate Plan",
    pricing: 29.99,
    features: [
      "Customizable Dashboard",
      "Enterprise User Management",
      "Dedicated Account Manager",
    ],
    link: process.env.NEXT_PUBLIC_ULTIMATE_PLAN!,
  },
];

const SettingsPage = () => {
  const [userPlan, setUserPlan] = useState(null);
 

  useEffect(() => {
    const storedUserPlan = localStorage.getItem("userPlan");
    if (storedUserPlan) {
      setUserPlan(JSON.parse(storedUserPlan)); // Parse JSON if needed
    }
  }, [userPlan]);

  console.log("userPlan:", userPlan);


  return (
      <div className="flex flex-col gap-5 w-full">
        <PageTitle title="Plans" />
        <section className="p-4">
          <div className="relative bg-clip-border text-gray-700 flex h-full min-h-[314px] w-full flex-col items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-900 px-8">
            <div className="container mx-auto text-center">
              <h2 className="text-4xl font-semibold text-gray-900 dark:text-white mb-4">
                Pricing
              </h2>
              <p className="text-xl text-gray-700 dark:text-white mb-8 opacity-70">
                Choose the perfect plan for a better dashboard experience
              </p>
            </div>
          </div>
          <div className="px-10 pt-8 pb-16 -mt-16 lg:px-30 xl:px-40">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {cardDetails.map((card, index) => (
                  <PlanCard
                      key={index}
                      plan={card.plan}
                      pricing={card.pricing}
                      features={card.features}
                      link={
                        userPlan === card.plan ? null : card.link
                      }
                      buttonText={
                        userPlan === card.plan
                            ? "Purchased"
                            : "Join"
                      }
                  />
              ))}
            </div>
          </div>
        </section>
      </div>
  );
};

export default SettingsPage;
