
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useState } from "react";

interface Affiliate {
  id: number;
  username: string;
  link: string;
  shortUrl: string;
  signupDate: Date;
}

interface AffiliateTableProps {
  affiliates: Affiliate[];
}

export const AffiliateTable = ({ affiliates }: AffiliateTableProps) => {
  const [date, setDate] = useState<Date | undefined>(undefined);

  const filteredAffiliates = date
    ? affiliates.filter(
        (affiliate) =>
          format(new Date(affiliate.signupDate), "yyyy-MM-dd") ===
          format(date, "yyyy-MM-dd")
      )
    : affiliates;

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border bg-white"
        />
      </div>
      <div className="w-full overflow-auto rounded-lg border bg-white/50 backdrop-blur-sm animate-fade-in">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Username</TableHead>
              <TableHead>Destination Link</TableHead>
              <TableHead>Affiliate Link</TableHead>
              <TableHead className="text-right">Sign Up Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAffiliates.map((affiliate) => (
              <TableRow key={affiliate.id} className="hover:bg-gray-50/50">
                <TableCell className="font-medium">{affiliate.username}</TableCell>
                <TableCell className="font-mono text-sm text-gray-600">
                  {affiliate.link}
                </TableCell>
                <TableCell className="font-mono text-sm text-blue-600 hover:text-blue-800">
                  <a href={affiliate.link} target="_blank" rel="noopener noreferrer">
                    {affiliate.shortUrl}
                  </a>
                </TableCell>
                <TableCell className="text-right">
                  {format(new Date(affiliate.signupDate), "MMM d, yyyy")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
