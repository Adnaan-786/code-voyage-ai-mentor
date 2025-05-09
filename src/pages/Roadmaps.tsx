
import { useState, useEffect } from "react";
import { getUserRoadmaps, UserRoadmap, deleteRoadmap } from "@/services/userRoadmapService";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Code, Trash2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const RoadmapsPage = () => {
  const { user } = useAuth();
  const [roadmaps, setRoadmaps] = useState<UserRoadmap[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadRoadmaps = async () => {
      if (user) {
        setLoading(true);
        const data = await getUserRoadmaps();
        setRoadmaps(data);
        setLoading(false);
      }
    };

    loadRoadmaps();
  }, [user]);

  const handleDelete = async (id: string) => {
    const success = await deleteRoadmap(id);
    
    if (success) {
      setRoadmaps(roadmaps.filter(roadmap => roadmap.id !== id));
      toast({
        title: "Roadmap deleted",
        description: "The roadmap has been removed from your account",
      });
    } else {
      toast({
        title: "Error deleting roadmap",
        description: "There was an error deleting the roadmap",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="container py-12 flex-grow">
        <h1 className="text-3xl font-bold mb-8">My Saved Roadmaps</h1>
        
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <LoadingSpinner size={40} message="Loading your roadmaps..." />
          </div>
        ) : roadmaps.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-4">No roadmaps saved yet</h2>
            <p className="text-muted-foreground mb-6">
              Generate a learning roadmap and save it to your account to see it here.
            </p>
            <Button asChild>
              <Link to="/">
                <Code className="mr-2 h-4 w-4" />
                Create a Roadmap
              </Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roadmaps.map(roadmap => (
              <Card key={roadmap.id} className="overflow-hidden">
                <CardHeader className="pb-4">
                  <CardTitle className="line-clamp-1">{roadmap.title}</CardTitle>
                  <CardDescription>
                    {roadmap.language} • {formatDistanceToNow(new Date(roadmap.created_at), { addSuffix: true })}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-6">
                  <div className="text-sm">
                    <p className="line-clamp-3">
                      A personalized learning path for {roadmap.language} with {roadmap.content.milestones?.length || 0} milestones.
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button asChild variant="outline">
                    <Link to={`/roadmap/${roadmap.id}`}>
                      View Roadmap
                    </Link>
                  </Button>
                  
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                        <Trash2 size={18} />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Roadmap</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this roadmap? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                          onClick={() => handleDelete(roadmap.id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default RoadmapsPage;
