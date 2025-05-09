
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { BookOpen, Code, PlusCircle } from "lucide-react";

const NavbarAuth = () => {
  const { user } = useAuth();
  
  return (
    <div className="flex items-center gap-4">
      {user && (
        <>
          <Link to="/roadmaps" className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary">
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline">My Roadmaps</span>
          </Link>
          <Link to="/" className="flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary">
            <PlusCircle className="h-4 w-4" />
            <span className="hidden sm:inline">Create</span>
          </Link>
        </>
      )}
    </div>
  );
};

export default NavbarAuth;
