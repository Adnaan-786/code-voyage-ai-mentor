
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import UserForm from "@/components/UserForm";
import Roadmap, { RoadmapData } from "@/components/Roadmap";
import Footer from "@/components/Footer";
import { generateRoadmap } from "@/services/roadmapService";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  name: string;
  goal: string;
  language: string;
  currentSkill: number;
  learningStyle: string;
  timeCommitment: string;
  additionalInfo: string;
}

const Index = () => {
  const { toast } = useToast();
  const [roadmapData, setRoadmapData] = useState<RoadmapData | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [userData, setUserData] = useState<{ name: string, language: string } | null>(null);

  const handleFormSubmit = async (formData: FormData) => {
    try {
      setIsGenerating(true);
      
      // Store user name and language for display purposes
      setUserData({
        name: formData.name,
        language: formData.language
      });
      
      // Generate roadmap (this would normally call an AI API)
      const roadmap = await generateRoadmap(formData);
      
      setRoadmapData(roadmap);
      
      // Scroll to roadmap section
      setTimeout(() => {
        document.getElementById("roadmap-section")?.scrollIntoView({ behavior: "smooth" });
      }, 100);
      
      toast({
        title: "Roadmap generated successfully",
        description: `Your personalized ${formData.language} learning path is ready!`,
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
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <UserForm onSubmit={handleFormSubmit} isGenerating={isGenerating} />
        <div id="roadmap-section">
          {roadmapData && userData && (
            <Roadmap 
              data={roadmapData} 
              userName={userData.name} 
              languageName={userData.language} 
            />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
