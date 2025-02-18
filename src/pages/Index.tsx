
import { AffiliateTable } from "@/components/AffiliateTable";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Link2, BarChart } from "lucide-react";

// Sample data - in a real app, this would come from an API
const sampleAffiliates = [
  {
    id: 1,
    username: "john_doe",
    link: "affiliate.com/ref/john_doe",
    shortUrl: "short.ly/abc123",
    signupDate: new Date("2024-03-01"),
  },
  {
    id: 2,
    username: "sarah_smith",
    link: "affiliate.com/ref/sarah_smith",
    shortUrl: "short.ly/xyz789",
    signupDate: new Date("2024-03-05"),
  },
  {
    id: 3,
    username: "tech_master",
    link: "affiliate.com/ref/tech_master",
    shortUrl: "short.ly/def456",
    signupDate: new Date("2024-03-10"),
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-16">
        <div className="space-y-2 text-center animate-fade-up">
          <div className="inline-block rounded-full bg-gray-900 px-3 py-1 text-sm text-white mb-4">
            Affiliate Dashboard
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Affiliate Signups
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Track your affiliate program performance and monitor new customer signups in real-time.
          </p>
        </div>

        <div className="mt-8 flex justify-center gap-4 animate-fade-up">
          <Button asChild variant="outline" className="group">
            <Link to="/">
              <Home className="mr-2 h-5 w-5 group-hover:text-blue-500" />
              Dashboard
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
        
        <div className="mt-16">
          <AffiliateTable affiliates={sampleAffiliates} />
        </div>
      </div>
    </div>
  );
};

export default Index;
