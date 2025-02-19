import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format, subDays, isWithinInterval } from "date-fns";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { UserPlus, Link2, BarChart } from "lucide-react";

// Sample data - in a real app, this would come from an API
const sampleTransactions = [
  {
    id: 1,
    username: "john_doe",
    creatorName: "techmaster",
    purchaseDate: new Date("2024-03-15"),
    totalAmount: 1000,
    commissionRate: 0.05,
    commissionAmount: 50,
    status: "confirmed" as const,
  },
  {
    id: 2,
    username: "sarah_smith",
    creatorName: "artcreator",
    purchaseDate: new Date("2024-03-16"),
    totalAmount: 2000,
    commissionRate: 0.05,
    commissionAmount: 100,
    status: "pending" as const,
  },
  {
    id: 3,
    username: "mike_johnson",
    creatorName: "gamingpro",
    purchaseDate: new Date("2024-03-14"),
    totalAmount: 5000,
    commissionRate: 0.05,
    commissionAmount: 250,
    status: "confirmed" as const,
  },
  {
    id: 4,
    username: "emma_wilson",
    creatorName: "techmaster",
    purchaseDate: new Date("2024-03-13"),
    totalAmount: 3000,
    commissionRate: 0.05,
    commissionAmount: 150,
    status: "confirmed" as const,
  },
  {
    id: 5,
    username: "alex_brown",
    creatorName: "artcreator",
    purchaseDate: new Date("2024-03-12"),
    totalAmount: 1500,
    commissionRate: 0.05,
    commissionAmount: 75,
    status: "pending" as const,
  },
  {
    id: 6,
    username: "lisa_garcia",
    creatorName: "gamingpro",
    purchaseDate: new Date("2024-03-11"),
    totalAmount: 4000,
    commissionRate: 0.05,
    commissionAmount: 200,
    status: "confirmed" as const,
  },
  {
    id: 7,
    username: "david_martinez",
    creatorName: "techmaster",
    purchaseDate: new Date("2024-03-10"),
    totalAmount: 2500,
    commissionRate: 0.05,
    commissionAmount: 125,
    status: "confirmed" as const,
  },
  {
    id: 8,
    username: "sophia_lee",
    creatorName: "artcreator",
    purchaseDate: new Date("2024-03-09"),
    totalAmount: 1800,
    commissionRate: 0.05,
    commissionAmount: 90,
    status: "pending" as const,
  },
  {
    id: 9,
    username: "james_taylor",
    creatorName: "gamingpro",
    purchaseDate: new Date("2024-03-08"),
    totalAmount: 3500,
    commissionRate: 0.05,
    commissionAmount: 175,
    status: "confirmed" as const,
  },
  {
    id: 10,
    username: "olivia_white",
    creatorName: "techmaster",
    purchaseDate: new Date("2024-03-07"),
    totalAmount: 2200,
    commissionRate: 0.05,
    commissionAmount: 110,
    status: "confirmed" as const,
  }
];

const COIN_TO_USD_RATE = 0.01;

const AffiliateEarnings = () => {
  const [dateRange, setDateRange] = useState<{
    from: Date;
    to: Date;
  }>({
    from: subDays(new Date(), 30),
    to: new Date(),
  });

  const filteredTransactions = sampleTransactions.filter((transaction) =>
    isWithinInterval(new Date(transaction.purchaseDate), {
      start: dateRange.from,
      end: dateRange.to,
    })
  );

  const confirmedTransactions = filteredTransactions.filter(
    (t) => t.status === "confirmed"
  );
  const pendingTransactions = filteredTransactions.filter(
    (t) => t.status === "pending"
  );

  const totalConfirmedCoins = confirmedTransactions.reduce(
    (sum, t) => sum + t.commissionAmount,
    0
  );
  const totalPendingCoins = pendingTransactions.reduce(
    (sum, t) => sum + t.commissionAmount,
    0
  );

  // Prepare chart data
  const chartData = Array.from({ length: 30 }, (_, i) => {
    const date = subDays(new Date(), i);
    const dateStr = format(date, "MMM dd");
    const dayTransactions = filteredTransactions.filter(
      (t) => format(new Date(t.purchaseDate), "MMM dd") === dateStr
    );
    const dailyCommission = dayTransactions.reduce(
      (sum, t) => sum + t.commissionAmount,
      0
    );
    return {
      date: dateStr,
      commission: dailyCommission,
    };
  }).reverse();

  const exportToExcel = () => {
    const data = filteredTransactions.map((t) => ({
      Username: t.username,
      Creator: t.creatorName,
      Date: format(new Date(t.purchaseDate), "MMM dd, yyyy"),
      "Total Amount (COINS)": t.totalAmount,
      "Commission Rate": `${t.commissionRate * 100}%`,
      "Commission (COINS)": t.commissionAmount,
      "Commission (USD)": (t.commissionAmount * COIN_TO_USD_RATE).toFixed(2),
      Status: t.status,
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Affiliate Earnings");
    XLSX.writeFile(wb, `affiliate-earnings-${format(new Date(), "yyyy-MM-dd")}.xlsx`);
    toast.success("Excel file downloaded successfully!");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const tableData = filteredTransactions.map((t) => [
      t.username,
      t.creatorName,
      format(new Date(t.purchaseDate), "MMM dd, yyyy"),
      t.totalAmount.toString(),
      `${t.commissionRate * 100}%`,
      t.commissionAmount.toString(),
      (t.commissionAmount * COIN_TO_USD_RATE).toFixed(2),
      t.status,
    ]);

    autoTable(doc, {
      head: [["Username", "Creator", "Date", "Amount (COINS)", "Rate", "Commission (COINS)", "Commission (USD)", "Status"]],
      body: tableData,
    });

    doc.save(`affiliate-earnings-${format(new Date(), "yyyy-MM-dd")}.pdf`);
    toast.success("PDF file downloaded successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-16">
        <div className="space-y-2 text-center animate-fade-up">
          <div className="inline-block rounded-full bg-gray-900 px-3 py-1 text-sm text-white mb-4">
            Affiliate Earnings
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Sales & Commissions
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Track your affiliate sales and earned commissions
          </p>
        </div>

        <div className="mt-8 flex justify-center gap-4 animate-fade-up">
          <Button asChild variant="outline" className="group">
            <Link to="/affiliate-signups">
              <UserPlus className="mr-2 h-5 w-5 group-hover:text-blue-500" />
              Affiliate Signups
            </Link>
          </Button>
          <Button asChild variant="outline" className="group">
            <Link to="/create-links">
              <Link2 className="mr-2 h-5 w-5 group-hover:text-blue-500" />
              Create Links
            </Link>
          </Button>
          <Button asChild variant="outline" className="group">
            <Link to="/affiliate-earnings">
              <BarChart className="mr-2 h-5 w-5 group-hover:text-blue-500" />
              Earnings
            </Link>
          </Button>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Total Confirmed</CardTitle>
              <CardDescription>Available for withdrawal</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalConfirmedCoins.toLocaleString()} COINS</div>
              <div className="text-sm text-gray-500">
                ≈ ${(totalConfirmedCoins * COIN_TO_USD_RATE).toLocaleString()} USD
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pending Balance</CardTitle>
              <CardDescription>Waiting for confirmation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalPendingCoins.toLocaleString()} COINS</div>
              <div className="text-sm text-gray-500">
                ≈ ${(totalPendingCoins * COIN_TO_USD_RATE).toLocaleString()} USD
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Date Range</CardTitle>
              <CardDescription>Select period to display</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="range"
                selected={{
                  from: dateRange.from,
                  to: dateRange.to,
                }}
                onSelect={(range) => {
                  if (range?.from && range?.to) {
                    setDateRange({ from: range.from, to: range.to });
                  }
                }}
                className="rounded-md border"
              />
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Daily Commission Earnings</CardTitle>
            <CardDescription>Last 30 days performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="commission"
                    stroke="#3b82f6"
                    fill="#93c5fd"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>
                Detailed view of all affiliate purchases
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={exportToExcel}>
                Export to Excel
              </Button>
              <Button variant="outline" onClick={exportToPDF}>
                Export to PDF
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Username</TableHead>
                  <TableHead>Creator</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount (COINS)</TableHead>
                  <TableHead>Commission Rate</TableHead>
                  <TableHead>Commission (COINS)</TableHead>
                  <TableHead>Commission (USD)</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.username}</TableCell>
                    <TableCell>{transaction.creatorName}</TableCell>
                    <TableCell>
                      {format(new Date(transaction.purchaseDate), "MMM dd, yyyy")}
                    </TableCell>
                    <TableCell>{transaction.totalAmount.toLocaleString()}</TableCell>
                    <TableCell>{(transaction.commissionRate * 100)}%</TableCell>
                    <TableCell>{transaction.commissionAmount.toLocaleString()}</TableCell>
                    <TableCell>
                      ${(transaction.commissionAmount * COIN_TO_USD_RATE).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                          transaction.status === "confirmed"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {transaction.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AffiliateEarnings;
