
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { saveRoadmap } from "@/services/userRoadmapService";
import { RoadmapData } from "@/components/Roadmap";
import { Save } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface SaveRoadmapButtonProps {
  roadmapData: RoadmapData;
  title: string;
  language: string;
  topic: string;
  description: string;
}

const SaveRoadmapButton = ({ 
  roadmapData, 
  title, 
  language,
  topic,
  description 
}: SaveRoadmapButtonProps) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to save roadmaps",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    setSaving(true);
    try {
      const id = await saveRoadmap(title, language, topic, description, roadmapData);
      
      if (id) {
        toast({
          title: "Roadmap saved",
          description: "Your roadmap has been saved to your account",
          variant: "default",
        });
      } else {
        throw new Error("Failed to save roadmap");
      }
    } catch (error: any) {
      toast({
        title: "Error saving roadmap",
        description: error.message || "There was an error saving your roadmap",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Button 
      onClick={handleSave} 
      disabled={saving} 
      className="flex items-center gap-2"
      variant="outline"
    >
      <Save size={16} />
      {saving ? "Saving..." : "Save Roadmap"}
    </Button>
  );
};

export default SaveRoadmapButton;
