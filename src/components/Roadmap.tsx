import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink, ChevronDown, ChevronUp, FileVideo, FileText } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import VideoSuggestion from "./VideoSuggestion";
import MilestoneNotes from "./MilestoneNotes";

// Mockup roadmap data structure
export interface Resource {
  title: string;
  url: string;
  type: string;
  description: string;
}

export interface VideoSuggestion {
  title: string;
  url: string;
  thumbnail?: string;
  duration?: string;
  source?: string;
}

export interface Exercise {
  title: string;
  description: string;
  difficulty: string;
}

export interface MilestoneNote {
  id: string;
  content: string;
  createdAt: Date;
}

export interface Milestone {
  title: string;
  description: string;
  skills: string[];
  resources: Resource[];
  exercises: Exercise[];
  estimatedTime: string;
  videoSuggestions?: VideoSuggestion[];
  notes?: MilestoneNote[];
}

export interface RoadmapData {
  title: string;
  overview: string;
  milestones: Milestone[];
}

interface RoadmapProps {
  data: RoadmapData | null;
  userName: string;
  languageName: string;
}

const Roadmap = ({ data, userName, languageName }: RoadmapProps) => {
  const [flowchartSvg, setFlowchartSvg] = useState<string | null>(null);
  const flowchartRef = useRef<HTMLDivElement>(null);
  const [expandedMilestones, setExpandedMilestones] = useState<{[key: number]: boolean}>({});
  const [newNotes, setNewNotes] = useState<{[key: number]: string}>({});

  useEffect(() => {
    if (data) {
      // In a real implementation, we would generate SVG flowchart here
      // For now, we'll use a mockup SVG string
      const mockupSvg = generateMockupFlowchart(data);
      setFlowchartSvg(mockupSvg);
      
      // Initialize all milestones as collapsed except the first one
      const initial = data.milestones.reduce((acc, _, index) => {
        acc[index] = index === 0;
        return acc;
      }, {} as {[key: number]: boolean});
      
      setExpandedMilestones(initial);

      // Initialize empty notes for each milestone
      const initialNotes = data.milestones.reduce((acc, _, index) => {
        acc[index] = "";
        return acc;
      }, {} as {[key: number]: string});
      
      setNewNotes(initialNotes);
    }
  }, [data]);

  const toggleMilestone = (index: number) => {
    setExpandedMilestones(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const downloadFlowchart = () => {
    if (!flowchartSvg) return;
    
    const blob = new Blob([flowchartSvg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${languageName.toLowerCase().replace(/\s+/g, "-")}-learning-roadmap.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleNoteChange = (index: number, value: string) => {
    setNewNotes(prev => ({
      ...prev,
      [index]: value
    }));
  };

  const addNote = (milestoneIndex: number) => {
    if (!data || !newNotes[milestoneIndex].trim()) return;

    // In a real app, this would save to the database
    const newNote = {
      id: `note-${Date.now()}`,
      content: newNotes[milestoneIndex],
      createdAt: new Date()
    };

    // Update the milestone with the new note
    const updatedMilestones = [...data.milestones];
    if (!updatedMilestones[milestoneIndex].notes) {
      updatedMilestones[milestoneIndex].notes = [];
    }
    updatedMilestones[milestoneIndex].notes?.push(newNote);

    // Clear the input field
    setNewNotes(prev => ({
      ...prev,
      [milestoneIndex]: ""
    }));

    // This would typically update the state through a proper data management system
    // For now we just log it
    console.log("Added note:", newNote, "to milestone:", milestoneIndex);
  };

  if (!data) return null;

  return (
    <div className="container py-16 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">Your Personalized Learning Roadmap</h2>
          <p className="text-muted-foreground">
            {userName ? `${userName}, here's` : "Here's"} your customized path to mastering {languageName}
          </p>
        </div>

        <Card className="mb-8 border bg-card">
          <CardHeader>
            <CardTitle>{data.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">{data.overview}</p>

            <Tabs defaultValue="flowchart">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="flowchart">Visual Flowchart</TabsTrigger>
                <TabsTrigger value="list">Detailed List</TabsTrigger>
              </TabsList>
              
              <TabsContent value="flowchart" className="pt-4">
                <div className="bg-white p-4 rounded-lg border overflow-auto">
                  <div className="flex justify-end mb-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={downloadFlowchart} 
                      className="text-xs"
                    >
                      <Download className="h-3 w-3 mr-1" /> Download Flowchart
                    </Button>
                  </div>
                  <div 
                    ref={flowchartRef} 
                    className="overflow-auto min-h-[400px] flex items-center justify-center"
                    dangerouslySetInnerHTML={{ __html: flowchartSvg || "" }} 
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="list" className="pt-4 space-y-6">
                {data.milestones.map((milestone, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardHeader 
                      className="py-4 px-6 bg-muted/50 cursor-pointer flex flex-row items-center justify-between"
                      onClick={() => toggleMilestone(index)}
                    >
                      <CardTitle className="text-lg flex items-center">
                        <div className="h-6 w-6 rounded-full bg-voyage-100 text-voyage-700 flex items-center justify-center mr-3 text-sm font-bold">
                          {index + 1}
                        </div>
                        {milestone.title}
                      </CardTitle>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        {expandedMilestones[index] ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                    </CardHeader>
                    
                    {expandedMilestones[index] && (
                      <CardContent className="py-4">
                        <p className="mb-4">{milestone.description}</p>
                        
                        <div className="mb-4">
                          <h4 className="font-medium mb-2">Key Skills:</h4>
                          <div className="flex flex-wrap gap-2">
                            {milestone.skills.map((skill, i) => (
                              <span 
                                key={i} 
                                className="bg-accent text-accent-foreground px-2 py-1 rounded-md text-sm"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Video Suggestions Section */}
                        {milestone.videoSuggestions && milestone.videoSuggestions.length > 0 && (
                          <div className="mb-6">
                            <h4 className="font-medium mb-3 flex items-center">
                              <FileVideo className="h-4 w-4 mr-1 text-voyage-600" /> 
                              Video Resources:
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {milestone.videoSuggestions.map((video, i) => (
                                <VideoSuggestion key={i} video={video} />
                              ))}
                            </div>
                          </div>
                        )}
                        
                        <div className="mb-4">
                          <h4 className="font-medium mb-2">Recommended Resources:</h4>
                          <ul className="space-y-2">
                            {milestone.resources.map((resource, i) => (
                              <li key={i} className="flex items-start">
                                <div className={`h-5 w-5 rounded-full mr-2 flex-shrink-0 flex items-center justify-center text-xs font-medium
                                  ${resource.type === 'video' ? 'bg-red-100 text-red-700' : 
                                    resource.type === 'course' ? 'bg-blue-100 text-blue-700' : 
                                    resource.type === 'article' ? 'bg-green-100 text-green-700' : 
                                    'bg-gray-100 text-gray-700'}`
                                }>
                                  {resource.type.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                  <div className="flex items-center">
                                    <span className="font-medium">{resource.title}</span>
                                    <a 
                                      href={resource.url} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="ml-1 text-voyage-600 hover:text-voyage-800"
                                    >
                                      <ExternalLink className="h-3 w-3" />
                                    </a>
                                  </div>
                                  <p className="text-sm text-muted-foreground">{resource.description}</p>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2">Practice Exercises:</h4>
                          <ul className="space-y-3">
                            {milestone.exercises.map((exercise, i) => (
                              <li key={i} className="bg-muted/50 p-3 rounded-md">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="font-medium">{exercise.title}</span>
                                  <span className={`text-xs px-2 py-0.5 rounded-full
                                    ${exercise.difficulty === 'easy' ? 'bg-green-100 text-green-800' : 
                                      exercise.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
                                      'bg-red-100 text-red-800'}`
                                  }>
                                    {exercise.difficulty}
                                  </span>
                                </div>
                                <p className="text-sm">{exercise.description}</p>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        {/* Notes Section */}
                        <div className="mt-6">
                          <h4 className="font-medium mb-3 flex items-center">
                            <FileText className="h-4 w-4 mr-1 text-voyage-600" /> 
                            Your Notes:
                          </h4>
                          
                          {/* Display existing notes */}
                          {milestone.notes && milestone.notes.length > 0 && (
                            <MilestoneNotes notes={milestone.notes} />
                          )}
                          
                          {/* Add new note form */}
                          <div className="mt-3">
                            <Textarea 
                              placeholder="Add your notes about this milestone here..."
                              value={newNotes[index] || ''}
                              onChange={e => handleNoteChange(index, e.target.value)}
                              className="mb-2"
                            />
                            <Button 
                              size="sm" 
                              onClick={() => addNote(index)}
                              disabled={!newNotes[index]?.trim()}
                              className="bg-voyage-600 hover:bg-voyage-700 text-white"
                            >
                              Add Note
                            </Button>
                          </div>
                        </div>
                        
                        <div className="mt-4 text-sm text-muted-foreground">
                          Estimated time: {milestone.estimatedTime}
                        </div>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// This function would normally generate a real SVG based on the roadmap data
// For now, we're using a mockup SVG for demonstration purposes
function generateMockupFlowchart(data: RoadmapData): string {
  // ... keep existing code (generateMockupFlowchart implementation)
  return `
  <svg width="800" height="${Math.max(120 + data.milestones.length * 100, 400)}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="#4B7BF5" />
      </marker>
    </defs>
    
    <!-- Start node -->
    <rect x="350" y="20" width="100" height="50" rx="8" fill="#EEF2FF" stroke="#818CF8" stroke-width="2" />
    <text x="400" y="50" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#4F46E5">Start</text>
    
    <!-- Path lines -->
    ${data.milestones.map((_, i) => {
      const y = 100 + i * 100;
      return `
      <line x1="400" y1="${i === 0 ? 70 : y - 30}" x2="400" y2="${y - 10}" stroke="#4B7BF5" stroke-width="2" marker-end="url(#arrowhead)" />
      
      <!-- Milestone node -->
      <rect x="250" y="${y}" width="300" height="60" rx="8" fill="#F0F9FF" stroke="#93C5FD" stroke-width="2" />
      <text x="400" y="${y + 35}" text-anchor="middle" font-family="sans-serif" font-size="14" font-weight="bold" fill="#1E40AF">${data.milestones[i].title}</text>`;
    }).join('')}
    
    <!-- Final node -->
    <line x1="400" y1="${100 + data.milestones.length * 100 + 10}" x2="400" y2="${100 + data.milestones.length * 100 + 40}" stroke="#4B7BF5" stroke-width="2" marker-end="url(#arrowhead)" />
    
    <!-- End node -->
    <rect x="350" y="${100 + data.milestones.length * 100 + 50}" width="100" height="50" rx="8" fill="#ECFDF5" stroke="#6EE7B7" stroke-width="2" />
    <text x="400" y="${100 + data.milestones.length * 100 + 80}" text-anchor="middle" font-family="sans-serif" font-size="14" fill="#047857">Mastery!</text>
  </svg>`;
}

export default Roadmap;
