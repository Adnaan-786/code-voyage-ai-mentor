
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, LineChart, Book } from "lucide-react";

const Hero = () => {
  const scrollToForm = () => {
    document.getElementById("user-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="container px-4 py-16 md:py-24 flex flex-col items-center text-center">
      <div className="animate-fade-in space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Your AI-Powered <span className="text-gradient">Coding Mentor</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Create a personalized roadmap for mastering any programming language or concept. 
          Get a visual learning path tailored to your goals, skill level, and learning style.
        </p>
        <div className="pt-4">
          <Button 
            onClick={scrollToForm} 
            size="lg" 
            className="bg-gradient-to-r from-voyage-600 to-insight-600 hover:from-voyage-700 hover:to-insight-700 text-white"
          >
            Create Your Roadmap <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 w-full max-w-5xl">
        <FeatureCard 
          icon={<Code className="h-6 w-6 text-voyage-600" />} 
          title="Custom Learning Paths" 
          description="Get a roadmap tailored to your specific goals, skill level, and learning preferences."
        />
        <FeatureCard 
          icon={<LineChart className="h-6 w-6 text-insight-600" />} 
          title="Visual Flowcharts" 
          description="Visualize your learning journey with interactive flowcharts showing clear milestones."
        />
        <FeatureCard 
          icon={<Book className="h-6 w-6 text-voyage-600" />} 
          title="Curated Resources" 
          description="Access hand-picked tutorials, courses, and exercises for each step of your journey."
        />
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => {
  return (
    <div className="bg-card border rounded-xl p-6 hover:shadow-md transition-shadow">
      <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default Hero;
