
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
          <div>
            <div className="mb-4">
              <h1 className="text-3xl font-bold mb-2">{roadmap.title}</h1>
              {roadmap.description && (
                <p className="text-muted-foreground">{roadmap.description}</p>
              )}
              <div className="flex gap-2 mt-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                  {roadmap.language}
                </span>
                {roadmap.topic && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary/10 text-secondary">
                    {roadmap.topic}
                  </span>
                )}
              </div>
            </div>
            <Roadmap 
              data={roadmap.content} 
              userName="You"
              languageName={roadmap.language} 
            />
          </div>
        ) : null}
      </main>
      <Footer />
    </div>
  );
};

export default RoadmapDetailsPage;
