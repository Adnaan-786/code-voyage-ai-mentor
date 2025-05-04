
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, Loader2 } from "lucide-react";

interface UserFormProps {
  onSubmit: (formData: FormData) => void;
  isGenerating: boolean;
}

interface FormData {
  name: string;
  goal: string;
  language: string;
  currentSkill: number;
  learningStyle: string;
  timeCommitment: string;
  additionalInfo: string;
}

const LANGUAGES = [
  "JavaScript", "Python", "Java", "C#", "Ruby", 
  "Go", "Swift", "Rust", "TypeScript", "PHP",
  "C++", "Kotlin", "SQL", "HTML/CSS", "React",
  "Angular", "Vue.js", "Node.js", "Django", "Flutter"
];

const LEARNING_STYLES = [
  "Visual", "Hands-on", "Reading/Writing", "Project-based", "Video tutorials"
];

const UserForm = ({ onSubmit, isGenerating }: UserFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    goal: "",
    language: "",
    currentSkill: 1,
    learningStyle: "",
    timeCommitment: "",
    additionalInfo: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSkillChange = (value: number[]) => {
    setFormData({
      ...formData,
      currentSkill: value[0]
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.goal || !formData.language || !formData.learningStyle || !formData.timeCommitment) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields",
        variant: "destructive"
      });
      return;
    }
    
    onSubmit(formData);
  };

  const getSkillLevelText = (level: number) => {
    switch (level) {
      case 1: return "Beginner";
      case 2: return "Novice";
      case 3: return "Intermediate";
      case 4: return "Advanced";
      case 5: return "Expert";
      default: return "Beginner";
    }
  };

  return (
    <div id="user-form" className="container py-16">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Create Your Learning Journey</h2>
          <p className="text-muted-foreground">
            Tell us about your goals and preferences so we can build a customized roadmap for you
          </p>
        </div>

        <Card className="border-2 border-muted bg-card">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Your Name (Optional)</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="How should we address you?"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <Label htmlFor="goal" className="required">What do you want to achieve?</Label>
                  <Textarea
                    id="goal"
                    name="goal"
                    placeholder="E.g., Build a web application, Become a data scientist, Learn mobile development..."
                    className="min-h-[100px]"
                    value={formData.goal}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="language" className="required">Programming Language or Technology</Label>
                  <Select 
                    value={formData.language} 
                    onValueChange={(value) => handleSelectChange("language", value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a language or technology" />
                    </SelectTrigger>
                    <SelectContent>
                      {LANGUAGES.map(lang => (
                        <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Current Skill Level</Label>
                  <div className="pt-6 pb-2">
                    <Slider
                      defaultValue={[1]}
                      max={5}
                      step={1}
                      value={[formData.currentSkill]}
                      onValueChange={handleSkillChange}
                      className="py-4"
                    />
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Beginner</span>
                    <span>Expert</span>
                  </div>
                  <p className="text-center mt-2 text-sm font-medium">
                    {getSkillLevelText(formData.currentSkill)}
                  </p>
                </div>

                <div>
                  <Label className="required">Preferred Learning Style</Label>
                  <RadioGroup 
                    value={formData.learningStyle} 
                    onValueChange={(value) => handleSelectChange("learningStyle", value)}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2"
                    required
                  >
                    {LEARNING_STYLES.map(style => (
                      <div key={style} className="flex items-center space-x-2">
                        <RadioGroupItem value={style} id={`style-${style}`} />
                        <Label htmlFor={`style-${style}`} className="cursor-pointer">{style}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div>
                  <Label className="required">Time Commitment</Label>
                  <RadioGroup 
                    value={formData.timeCommitment} 
                    onValueChange={(value) => handleSelectChange("timeCommitment", value)}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2"
                    required
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="minimal" id="time-minimal" />
                      <Label htmlFor="time-minimal" className="cursor-pointer">A few hours a week</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="moderate" id="time-moderate" />
                      <Label htmlFor="time-moderate" className="cursor-pointer">5-10 hours a week</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="significant" id="time-significant" />
                      <Label htmlFor="time-significant" className="cursor-pointer">10-20 hours a week</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="fulltime" id="time-fulltime" />
                      <Label htmlFor="time-fulltime" className="cursor-pointer">Full-time dedication</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label htmlFor="additionalInfo">Additional Information (Optional)</Label>
                  <Textarea
                    id="additionalInfo"
                    name="additionalInfo"
                    placeholder="Any specific areas of interest, learning challenges, or preferences..."
                    value={formData.additionalInfo}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-voyage-600 to-insight-600 hover:from-voyage-700 hover:to-insight-700 text-white"
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating Your Roadmap...
                  </>
                ) : (
                  <>
                    Generate My Roadmap <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserForm;
