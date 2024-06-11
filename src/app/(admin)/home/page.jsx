"use client";
import React, { useState, useEffect } from "react";
import PageTitle from "@/components/PageTitle";
import Image from "next/image";
import { DollarSign, Users, CreditCard, Activity } from "lucide-react";
import Card, { CardContent, CardProps } from "@/components/Card";
import BarChart from "@/components/BarChart";
import SalesCard, { SalesProps } from "@/components/SalesCard";
import axios from "axios";

const uesrSalesData = [
  {
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    saleAmount: "+$1,999.00",
  },
  {
    name: "Jackson Lee",
    email: "isabella.nguyen@email.com",
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

export default function Home() {
  const [reportCount, setReportCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [count, setCount] = useState(0);

  const cardData = [
    {
      label: "Total Report",
      amount: reportCount,
      discription: "Last 30 days",
      icon: DollarSign,
    },
    {
      label: "Total Users",
      amount: userCount,
      discription: "Last 30 days",
      icon: Users,
    },
    {
      label: "Sales",
      amount: "+34",
      discription: "Last 30 days",
      icon: CreditCard,
    },
    {
      label: "Active Now",
      amount: "3",
      discription: "last hour",
      icon: Activity,
    },
  ];

  const fetchReportCount = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/report/count`
      );
      console.log(response.data);
      setReportCount(response.data.reportCount);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchUserCount = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/auth/count`
      );
      console.log(response.data);
      setUserCount(response.data.userCount);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchReportCount();
    fetchUserCount();
  }, []);

  return (
    <div className="flex flex-col gap-5  w-full">
      <PageTitle title="Dashboard" />
      <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4">
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
      <section className="grid grid-cols-1  gap-4 transition-all lg:grid-cols-2">
        <CardContent>
          <p className="p-4 font-semibold">Overview</p>
          <BarChart />
        </CardContent>
      </section>
    </div>
  );
}
