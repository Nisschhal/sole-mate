import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { DashboardStats } from "../components/dashboard/DashboardStats";

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
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Recent Sales</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-8">
            {/* Card Content 1 */}
            <div className="flex items-center gap-4">
              {/* USER Avatar */}
              <Avatar className="hidden sm:flex size-9">
                <AvatarFallback>NP</AvatarFallback>
              </Avatar>
              {/* Name && Email  */}
              <div className="grid ">
                <p className="text-sm">Rajesh Hamal</p>
                <p className="text-sm text-muted-foreground">
                  test123@gmail.com
                </p>
              </div>
              {/* price */}
              <p className="ml-auto font-medium">+$1,999.00</p>
            </div>
            {/* Card Content 2 */}
            <div className="flex items-center gap-4">
              {/* USER Avatar */}
              <Avatar className="hidden sm:flex size-9">
                <AvatarFallback>NP</AvatarFallback>
              </Avatar>
              {/* Name && Email  */}
              <div className="grid ">
                <p className="text-sm">Rajesh Hamal</p>
                <p className="text-sm text-muted-foreground">
                  test123@gmail.com
                </p>
              </div>
              {/* price */}
              <p className="ml-auto font-medium">+$1,999.00</p>
            </div>
            {/* Card Content 3 */}
            <div className="flex items-center gap-4">
              {/* USER Avatar */}
              <Avatar className="hidden sm:flex size-9">
                <AvatarFallback>NP</AvatarFallback>
              </Avatar>
              {/* Name && Email  */}
              <div className="grid ">
                <p className="text-sm">Rajesh Hamal</p>
                <p className="text-sm text-muted-foreground">
                  test123@gmail.com
                </p>
              </div>
              {/* price */}
              <p className="ml-auto font-medium">+$1,999.00</p>
            </div>
            {/* Card Content 4 */}
            <div className="flex items-center gap-4">
              {/* USER Avatar */}
              <Avatar className="hidden sm:flex size-9">
                <AvatarFallback>NP</AvatarFallback>
              </Avatar>
              {/* Name && Email  */}
              <div className="grid ">
                <p className="text-sm">Rajesh Hamal</p>
                <p className="text-sm text-muted-foreground">
                  test123@gmail.com
                </p>
              </div>
              {/* price */}
              <p className="ml-auto font-medium">+$1,999.00</p>
            </div>
            {/* Card Content 5 */}
            <div className="flex items-center gap-4">
              {/* USER Avatar */}
              <Avatar className="hidden sm:flex size-9">
                <AvatarFallback>NP</AvatarFallback>
              </Avatar>
              {/* Name && Email  */}
              <div className="grid ">
                <p className="text-sm">Rajesh Hamal</p>
                <p className="text-sm text-muted-foreground">
                  test123@gmail.com
                </p>
              </div>
              {/* price */}
              <p className="ml-auto font-medium">+$1,999.00</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Dashboard;
