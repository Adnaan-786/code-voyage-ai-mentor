
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getRoadmapById, UserRoadmap } from "@/services/userRoadmapService";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoadingSpinner from "@/components/LoadingSpinner";
import Roadmap from "@/components/Roadmap";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const RoadmapDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [roadmap, setRoadmap] = useState<UserRoadmap | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRoadmap = async () => {
      if (!id) {
        setError("Roadmap ID not provided");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await getRoadmapById(id);
        
        if (!data) {
          setError("Roadmap not found");
        } else {
          setRoadmap(data);
        }
      } catch (err) {
        setError("Failed to load roadmap");
      } finally {
        setLoading(false);
      }
    };

    loadRoadmap();
  }, [id]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="container py-8 flex-grow">
        <Button variant="ghost" className="mb-6" asChild>
          <Link to="/roadmaps">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to My Roadmaps
          </Link>
        </Button>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <LoadingSpinner size={40} message="Loading your roadmap..." />
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-4">Error</h2>
            <p className="text-muted-foreground mb-6">{error}</p>
            <Button asChild>
              <Link to="/roadmaps">Go to My Roadmaps</Link>
            </Button>
          </div>
        ) : roadmap ? (
          <Roadmap 
            data={roadmap.content} 
            userName="You"
            languageName={roadmap.language} 
          />
        ) : null}
      </main>
      <Footer />
    </div>
  );
};

export default RoadmapDetailsPage;
