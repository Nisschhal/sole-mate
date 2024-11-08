import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { DashboardStats } from "../components/dashboard/DashboardStats";
import { RecentSales } from "../components/dashboard/RecentSales";
import { Chart } from "../components/dashboard/Chart";
import prisma from "../lib/db";
import { unstable_noStore as noStore } from "next/cache";

async function getData() {
  const now = new Date();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(now.getDate() - 7);

  const data = await prisma.order.findMany({
    where: {
      createdAt: {
        gte: sevenDaysAgo,
      },
    },
    select: {
      amount: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const result = data.map((item) => ({
    date: new Intl.DateTimeFormat("en-US").format(item.createdAt),
    revenue: item.amount / 100,
  }));

  return result;
}

const Dashboard = async () => {
  // don't cache this page
  noStore();
  const data = await getData();
  return (
    <>
      <DashboardStats />
      {/* 2 GRIDS: with cols-2 in md and cols-3 in lg: Transactions || Recent Transactions */}

      <div className="grid gap-4 md:gap-8 md:grid-cols-2 xl:grid-cols-3 mt-10">
        {/* LEFT << TRANSACTIONS CARD   */}
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Transactions</CardTitle>
            <CardDescription className="text-base">
              Recent Transactions from the last seven days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Chart data={data} />
          </CardContent>
        </Card>

        {/* RIGHT >> RECENT SALES  CARD */}
        <RecentSales />
      </div>
    </>
  );
};

export default Dashboard;
