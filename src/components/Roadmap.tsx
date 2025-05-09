
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
  const flowchartKey = useRef<number>(0);

  useEffect(() => {
    if (data) {
      // Increment the key to force re-rendering of the flowchart
      flowchartKey.current += 1;
      
      // Generate flowchart based on the current data
      const mockupSvg = generateMockupFlowchart(data, languageName);
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
  }, [data, languageName]); // Added languageName dependency to ensure flowchart updates when language changes

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
                    key={flowchartKey.current} // Add key to force re-render when flowchart changes
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

// This function generates a modern SVG flowchart based on the roadmap data
function generateMockupFlowchart(data: RoadmapData, language: string): string {
  console.log(`Generating flowchart for ${language}`, data);
  
  const milestones = data.milestones;
  const height = Math.max(150 + milestones.length * 120, 500);
  
  // Define colors for a modern looking chart - customize based on language
  let colors = {
    background: "#f8fafc",
    startNode: {
      fill: "#eff6ff",
      stroke: "#3b82f6",
      text: "#1e40af"
    },
    milestoneNode: {
      fill: "#f0f9ff",
      stroke: "#0ea5e9",
      text: "#0c4a6e"
    },
    endNode: {
      fill: "#ecfdf5",
      stroke: "#10b981",
      text: "#065f46"
    },
    connectionLine: "#6366f1",
    shadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"
  };
  
  // Customize colors based on language
  if (language === "Python") {
    colors = {
      background: "#f7fafc",
      startNode: {
        fill: "#e6f4ff",
        stroke: "#4a9df3",
        text: "#174d8c"
      },
      milestoneNode: {
        fill: "#eef7ff",
        stroke: "#3b82f6",
        text: "#1e3a8a"
      },
      endNode: {
        fill: "#dcfce7",
        stroke: "#22c55e",
        text: "#166534"
      },
      connectionLine: "#6366f1",
      shadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"
    };
  } else if (language === "JavaScript") {
    colors = {
      background: "#fffef7",
      startNode: {
        fill: "#fffbeb",
        stroke: "#f59e0b",
        text: "#92400e"
      },
      milestoneNode: {
        fill: "#fef9c3",
        stroke: "#eab308",
        text: "#854d0e"
      },
      endNode: {
        fill: "#ecfdf5",
        stroke: "#10b981",
        text: "#065f46"
      },
      connectionLine: "#f59e0b",
      shadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"
    };
  } else if (language === "Java") {
    colors = {
      background: "#f8f9fa",
      startNode: {
        fill: "#ffe2e2",
        stroke: "#ef4444",
        text: "#7f1d1d"
      },
      milestoneNode: {
        fill: "#ffedd5",
        stroke: "#f97316",
        text: "#9a3412"
      },
      endNode: {
        fill: "#ecfdf5",
        stroke: "#10b981",
        text: "#065f46"
      },
      connectionLine: "#ef4444",
      shadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"
    };
  } else if (language === "React") {
    colors = {
      background: "#f6f8fa",
      startNode: {
        fill: "#e0f2fe",
        stroke: "#0ea5e9",
        text: "#075985"
      },
      milestoneNode: {
        fill: "#dbeafe",
        stroke: "#3b82f6",
        text: "#1e40af"
      },
      endNode: {
        fill: "#c7d2fe",
        stroke: "#4f46e5",
        text: "#3730a3"
      },
      connectionLine: "#0ea5e9",
      shadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"
    };
  }
  
  // SVG defs with modern markers and filters
  const defs = `
    <defs>
      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
        <polygon points="0 0, 10 3.5, 0 7" fill="${colors.connectionLine}" />
      </marker>
      
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="rgb(0 0 0 / 0.3)" flood-opacity="0.3" />
      </filter>
    </defs>
  `;
  
  // Generate the start node
  const startNode = `
    <g filter="url(#shadow)">
      <rect x="350" y="30" width="120" height="60" rx="12" fill="${colors.startNode.fill}" stroke="${colors.startNode.stroke}" stroke-width="2" />
      <text x="410" y="65" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="14" font-weight="600" fill="${colors.startNode.text}">
        Start ${language}
      </text>
    </g>
  `;
  
  // Generate milestone nodes and connections
  const milestoneNodes = milestones.map((milestone, i) => {
    const y = 130 + i * 120;
    
    // Calculate skills to display (limit to 3 with ellipsis if more)
    const displaySkills = milestone.skills.length > 3 
      ? milestone.skills.slice(0, 3).join(", ") + "..." 
      : milestone.skills.join(", ");
    
    // Calculate estimated time to display
    const timeDisplay = milestone.estimatedTime;
    
    // Connection line from previous node
    const connectionLine = `
      <line 
        x1="410" y1="${i === 0 ? 90 : y - 60}" 
        x2="410" y2="${y - 10}" 
        stroke="${colors.connectionLine}" 
        stroke-width="2" 
        stroke-dasharray="${i % 2 === 0 ? "" : "6,3"}"
        marker-end="url(#arrowhead)" 
      />
    `;
    
    // Generate the milestone node
    const milestoneNode = `
      <g filter="url(#shadow)">
        <rect 
          x="250" y="${y}" 
          width="320" height="80" 
          rx="12" 
          fill="${colors.milestoneNode.fill}" 
          stroke="${colors.milestoneNode.stroke}" 
          stroke-width="2" 
        />
        <text x="270" y="${y + 30}" font-family="Inter, system-ui, sans-serif" font-size="15" font-weight="600" fill="${colors.milestoneNode.text}">
          ${milestone.title}
        </text>
        <text x="270" y="${y + 50}" font-family="Inter, system-ui, sans-serif" font-size="12" fill="${colors.milestoneNode.text}">
          Skills: ${displaySkills}
        </text>
        <text x="270" y="${y + 70}" font-family="Inter, system-ui, sans-serif" font-size="12" fill="${colors.milestoneNode.text}" opacity="0.8">
          ${timeDisplay}
        </text>
        
        <!-- Resource count indicator -->
        <circle cx="530" cy="${y + 30}" r="12" fill="#e0e7ff" stroke="#6366f1" stroke-width="1.5" />
        <text x="530" y="${y + 34}" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="11" font-weight="600" fill="#4338ca">
          ${milestone.resources.length}
        </text>
        
        <!-- Video indicator -->
        ${milestone.videoSuggestions && milestone.videoSuggestions.length > 0 ? `
          <circle cx="530" cy="${y + 60}" r="12" fill="#fee2e2" stroke="#ef4444" stroke-width="1.5" />
          <text x="530" y="${y + 64}" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="11" font-weight="600" fill="#b91c1c">
            ${milestone.videoSuggestions.length}
          </text>
        ` : ''}
      </g>
    `;
    
    return connectionLine + milestoneNode;
  }).join("");
  
  // Generate the end node
  const finalConnectionY = 130 + milestones.length * 120;
  const finalConnection = `
    <line 
      x1="410" y1="${finalConnectionY + 20}" 
      x2="410" y2="${finalConnectionY + 60}" 
      stroke="${colors.connectionLine}" 
      stroke-width="2" 
      marker-end="url(#arrowhead)" 
    />
  `;
  
  const endNode = `
    <g filter="url(#shadow)">
      <rect 
        x="350" y="${finalConnectionY + 70}" 
        width="120" height="60" 
        rx="12" 
        fill="${colors.endNode.fill}" 
        stroke="${colors.endNode.stroke}" 
        stroke-width="2" 
      />
      <text x="410" y="${finalConnectionY + 105}" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="14" font-weight="600" fill="${colors.endNode.text}">
        ${language} Mastery!
      </text>
    </g>
  `;
  
  // Combine all SVG elements
  return `
  <svg width="800" height="${height}" xmlns="http://www.w3.org/2000/svg">
    ${defs}
    
    <!-- Background pattern for visual interest -->
    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
      <circle cx="10" cy="10" r="1" fill="#e2e8f0" fill-opacity="0.6" />
    </pattern>
    <rect width="800" height="${height}" fill="${colors.background}" />
    <rect width="800" height="${height}" fill="url(#grid)" />
    
    <!-- Roadmap elements -->
    ${startNode}
    ${milestoneNodes}
    ${finalConnection}
    ${endNode}
  </svg>`;
}

export default Roadmap;
