import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DollarSign, PartyPopper, ShoppingBag, User } from "lucide-react";

const Dashboard = () => {
  return (
    <>
      {/* UPPER GRID FOR 4 CARD: Revenus || Sales || Products || Users */}
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        {/* REVENUE CARD   */}
        <Card>
          <CardHeader className="flex flex-row justify-between items-center pb-2">
            <CardTitle className="text-2xl font-bold">Total Revenue</CardTitle>
            <DollarSign className="size-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">$100.000</p>
            <p className="text-xm text-muted-foreground">
              Based on 100 charges
            </p>
          </CardContent>
        </Card>
        {/* SALES CARD   */}
        <Card>
          <CardHeader className="flex flex-row justify-between items-center pb-2">
            <CardTitle className="text-2xl font-bold">Total Sales</CardTitle>
            <ShoppingBag className="size-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">+50</p>
            <p className="text-xm text-muted-foreground">
              Total sales on SoleMate
            </p>
          </CardContent>
        </Card>
        {/* PRODUCTS  CARD   */}
        <Card>
          <CardHeader className="flex flex-row justify-between items-center pb-2">
            <CardTitle className="text-2xl font-bold">Total Products</CardTitle>
            <PartyPopper className="size-4 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">37</p>
            <p className="text-xm text-muted-foreground">
              Total Product Created
            </p>
          </CardContent>
        </Card>
        {/* USERS CARD   */}
        <Card>
          <CardHeader className="flex flex-row justify-between items-center pb-2">
            <CardTitle className="text-2xl font-bold">Total Users</CardTitle>
            <User className="size-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">120</p>
            <p className="text-xm text-muted-foreground">
              Total Users Signed Up
            </p>
          </CardContent>
        </Card>
      </div>

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
