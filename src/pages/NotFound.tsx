
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-16">
        <div className="text-center max-w-md px-4">
          <div className="mb-6 text-voyage-600 flex justify-center">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.9 17a.7.7 0 0 1-.7-.7v-2.6a.7.7 0 0 1 .7-.7h.2a.7.7 0 0 1 .7.7v2.6a.7.7 0 0 1-.7.7h-.2Z" fill="currentColor" />
              <path d="M14.1 17a.7.7 0 0 1-.7-.7v-2.6a.7.7 0 0 1 .7-.7h.2a.7.7 0 0 1 .7.7v2.6a.7.7 0 0 1-.7.7h-.2Z" fill="currentColor" />
              <path d="M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm0 14.5a6.5 6.5 0 1 1 0-13 6.5 6.5 0 0 1 0 13Z" fill="currentColor" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-xl text-muted-foreground mb-6">
            Oops! This page has wandered off the map.
          </p>
          <Button asChild className="bg-gradient-to-r from-voyage-600 to-insight-600 hover:from-voyage-700 hover:to-insight-700">
            <a href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Home
            </a>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
