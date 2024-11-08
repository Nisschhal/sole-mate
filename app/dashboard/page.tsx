import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { DashboardStats } from "../components/dashboard/DashboardStats";
import { RecentSales } from "../components/dashboard/RecentSales";

const Dashboard = () => {
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
              Recent Transactions from your store
            </CardDescription>
          </CardHeader>
        </Card>

        {/* RIGHT >> RECENT SALES  CARD */}
        <RecentSales />
      </div>
    </>
  );
};

export default Dashboard;
