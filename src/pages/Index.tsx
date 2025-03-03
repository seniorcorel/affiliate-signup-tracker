
import { Link } from "react-router-dom";
import { UserPlus, Link2, BarChart, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-16">
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
          <Button variant="outline" className="group text-red-500 hover:text-red-600">
            <LogOut className="mr-2 h-5 w-5" />
            Logout
          </Button>
        </div>

        <div className="text-center mt-12 mb-12 animate-fade-down">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-4">
            Affiliate Dashboard
          </h1>
          <p className="text-xl text-gray-600">
            Welcome to your affiliate management platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto animate-fade-up">
          <Link 
            to="/affiliate-signups" 
            className="group p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100"
          >
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 bg-blue-50 rounded-full flex items-center justify-center group-hover:bg-blue-100 transition-colors mb-4">
                <UserPlus className="h-8 w-8 text-blue-500" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Affiliate Signups</h2>
              <p className="text-gray-600">Track new affiliate registrations and monitor signup trends</p>
            </div>
          </Link>

          <Link 
            to="/create-links" 
            className="group p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100"
          >
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 bg-green-50 rounded-full flex items-center justify-center group-hover:bg-green-100 transition-colors mb-4">
                <Link2 className="h-8 w-8 text-green-500" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Create Links</h2>
              <p className="text-gray-600">Generate and manage your affiliate tracking links</p>
            </div>
          </Link>

          <Link 
            to="/affiliate-earnings" 
            className="group p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100"
          >
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 bg-purple-50 rounded-full flex items-center justify-center group-hover:bg-purple-100 transition-colors mb-4">
                <BarChart className="h-8 w-8 text-purple-500" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Earnings</h2>
              <p className="text-gray-600">View your earnings and commission reports</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
