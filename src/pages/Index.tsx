
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import UserForm from "@/components/UserForm";
import Roadmap, { RoadmapData } from "@/components/Roadmap";
import Footer from "@/components/Footer";
import { generateRoadmap } from "@/services/roadmapService";
import { useToast } from "@/hooks/use-toast";
import LoadingSpinner from "@/components/LoadingSpinner";
import SEOHead from "@/components/SEOHead";
import { useMediaQuery } from "@/hooks/use-media-query";
import SaveRoadmapButton from "@/components/SaveRoadmapButton";

interface FormData {
  name: string;
  goal: string;
  language: string;
  topic: string;
  currentSkill: number;
  learningStyle: string;
  timeCommitment: string;
  additionalInfo: string;
}

const Index = () => {
  const { toast } = useToast();
  const [roadmapData, setRoadmapData] = useState<RoadmapData | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [userData, setUserData] = useState<{ 
    name: string, 
    language: string, 
    topic: string,
    description: string 
  } | null>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleFormSubmit = async (formData: FormData) => {
    try {
      setIsGenerating(true);
      
      // Store user name and language for display purposes
      setUserData({
        name: formData.name,
        language: formData.language,
        topic: formData.topic || "General Learning",
        description: `A personalized ${formData.topic || formData.language} learning path for ${formData.name || "a learner"} with ${formData.goal} as the main goal.`
      });
      
      // Generate roadmap (this would normally call an AI API)
      const roadmap = await generateRoadmap(formData);
      
      setRoadmapData(roadmap);
      
      // Scroll to roadmap section
      setTimeout(() => {
        document.getElementById("roadmap-section")?.scrollIntoView({ 
          behavior: "smooth", 
          block: isMobile ? "start" : "center" 
        });
      }, 100);
      
      toast({
        title: "Roadmap generated successfully",
        description: `Your personalized ${formData.topic || formData.language} learning path is ready!`,
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Failed to generate roadmap",
        description: "There was an error generating your roadmap. Please try again.",
        variant: "destructive",
      });
      console.error("Error generating roadmap:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <SEOHead 
        title={roadmapData ? `${userData?.topic} Learning Roadmap - CodeVoyage AI` : undefined}
        description={userData?.description || undefined}
      />
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <UserForm onSubmit={handleFormSubmit} isGenerating={isGenerating} />
        <div id="roadmap-section" className="scroll-mt-16">
          {isGenerating ? (
            <div className="container py-16">
              <div className="max-w-4xl mx-auto">
                <div className="flex flex-col items-center justify-center p-10 border rounded-lg bg-card">
                  <LoadingSpinner size={40} message={`Creating your personalized ${userData?.topic || userData?.language} roadmap...`} />
                </div>
              </div>
            </div>
          ) : (
            roadmapData && userData && (
              <div className="container">
                <div className="flex justify-end mb-4">
                  <SaveRoadmapButton 
                    roadmapData={roadmapData} 
                    title={`${userData.topic} Learning Roadmap`}
                    language={userData.language}
                    topic={userData.topic}
                    description={userData.description}
                  />
                </div>
                <Roadmap 
                  data={roadmapData} 
                  userName={userData.name} 
                  languageName={userData.language} 
                />
              </div>
            )
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
