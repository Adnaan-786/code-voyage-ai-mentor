import { RoadmapData } from '@/components/Roadmap';

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

// This would normally be an API call to an AI service
// For demo purposes, we're generating mock data based on user input
export async function generateRoadmap(formData: FormData): Promise<RoadmapData> {
  console.log("Generating roadmap for:", formData.topic || formData.language);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // Generate roadmap based on topic or language and skill level
  const result: RoadmapData = {
    title: formData.topic 
      ? `${formData.topic} Learning Roadmap` 
      : `${formData.language} Learning Roadmap`,
    overview: generateOverview(formData),
    milestones: generateMilestones(formData)
  };
  
  return result;
}

function generateOverview(formData: FormData): string {
  const { language, topic, goal, currentSkill, learningStyle, timeCommitment } = formData;
  const primaryFocus = topic || language;
  
  // Create personalized overview based on user choices
  let overview = `This personalized ${primaryFocus} roadmap is designed to help you ${goal}. `;
  
  // Add skill level context
  if (currentSkill <= 1) {
    overview += `Starting from the absolute basics, `;
  } else if (currentSkill <= 3) {
    overview += `Building on your foundational knowledge, `;
  } else {
    overview += `Expanding your advanced expertise, `;
  }
  
  // Add learning style context
  if (learningStyle === "visual") {
    overview += `this path emphasizes video tutorials and visual resources to match your visual learning preference. `;
  } else if (learningStyle === "reading") {
    overview += `this path features comprehensive documentation and articles to suit your reading-based learning style. `;
  } else if (learningStyle === "interactive") {
    overview += `this path focuses on interactive exercises and projects for your hands-on learning style. `;
  } else {
    overview += `this path includes a balanced mix of resources to accommodate your learning preferences. `;
  }
  
  // Add time commitment context
  if (timeCommitment === "minimal") {
    overview += `The milestones are sized appropriately for your limited weekly time commitment of a few hours per week.`;
  } else if (timeCommitment === "moderate") {
    overview += `Each milestone is designed to fit within your moderate weekly time commitment of 5-10 hours.`;
  } else if (timeCommitment === "significant") {
    overview += `The comprehensive milestones take advantage of your significant time commitment of 10-20 hours per week.`;
  } else if (timeCommitment === "fulltime") {
    overview += `The intensive learning path is designed for your full-time dedication to mastering ${primaryFocus}.`;
  } else {
    overview += `The pace is flexible to adapt to your available study time.`;
  }
  
  return overview;
}

function generateMilestones(formData: FormData): any[] {
  const { language, topic, currentSkill, learningStyle, timeCommitment } = formData;
  
  // Determine which content to generate based on priority
  // Use topic first, fall back to language if no topic is specified
  if (topic) {
    const topicMilestones = generateTopicSpecificMilestones(topic, currentSkill);
    adaptMilestonesToLearningStyle(topicMilestones, learningStyle);
    adaptMilestonesToTimeCommitment(topicMilestones, timeCommitment);
    return topicMilestones;
  } else if (language) {
    const languageMilestones = generateLanguageSpecificMilestones(language, currentSkill);
    adaptMilestonesToLearningStyle(languageMilestones, learningStyle);
    adaptMilestonesToTimeCommitment(languageMilestones, timeCommitment);
    return languageMilestones;
  } else {
    // Fallback for generic milestones
    return generateGenericMilestones("Learning", currentSkill);
  }
}

function generateTopicSpecificMilestones(topic: string, skillLevel: number): any[] {
  console.log(`Generating milestones for ${topic} topic at skill level ${skillLevel}`);
  
  // Generate different milestone sets based on topic
  if (topic === "Web Development") {
    return generateWebDevelopmentMilestones(skillLevel);
  } else if (topic === "Data Science") {
    return generateDataScienceMilestones(skillLevel);
  } else if (topic === "Mobile Development") {
    return generateMobileDevelopmentMilestones(skillLevel);
  } else if (topic === "DevOps") {
    return generateDevOpsMilestones(skillLevel);
  } else if (topic === "Machine Learning") {
    return generateMachineLearningMilestones(skillLevel);
  } else {
    // For any other topics, generate a generic milestone set
    return generateGenericTopicMilestones(topic, skillLevel);
  }
}

function generateLanguageSpecificMilestones(language: string, skillLevel: number): any[] {
  console.log(`Generating milestones for ${language} at skill level ${skillLevel}`);
  
  // Base milestones by language and skill level
  if (language === "JavaScript") {
    return generateJavaScriptMilestones(skillLevel);
  } else if (language === "Python") {
    return generatePythonMilestones(skillLevel);
  } else if (language === "React") {
    return generateReactMilestones(skillLevel);
  } else if (language === "Java") {
    return generateJavaMilestones(skillLevel);
  } else {
    // Generic milestones for other languages
    return generateGenericMilestones(language, skillLevel);
  }
}

// Web Development milestones
function generateWebDevelopmentMilestones(skillLevel: number): any[] {
  if (skillLevel <= 2) {
    // Beginner Web Development milestones
    return [
      {
        title: "HTML and CSS Fundamentals",
        description: "Learn the building blocks of web development with HTML and CSS.",
        skills: ["HTML5", "CSS3", "Responsive Design", "Flexbox", "CSS Grid"],
        resources: [
          {
            title: "MDN Web Docs - HTML",
            url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
            type: "documentation",
            description: "Comprehensive guide to HTML."
          },
          {
            title: "CSS Tricks",
            url: "https://css-tricks.com/",
            type: "blog",
            description: "Excellent resource for CSS techniques and tutorials."
          }
        ],
        videoSuggestions: [
          {
            title: "HTML & CSS Full Course - Beginner to Pro",
            url: "https://www.youtube.com/watch?v=G3e-cpL7ofc",
            thumbnail: "https://i.ytimg.com/vi/G3e-cpL7ofc/mqdefault.jpg",
            duration: "6:23:43",
            source: "SuperSimpleDev"
          },
          {
            title: "CSS Crash Course For Absolute Beginners",
            url: "https://www.youtube.com/watch?v=yfoY53QXEnI",
            thumbnail: "https://i.ytimg.com/vi/yfoY53QXEnI/mqdefault.jpg",
            duration: "1:25:10",
            source: "Traversy Media"
          }
        ],
        exercises: [
          {
            title: "Build a Personal Portfolio Page",
            description: "Create a simple portfolio page showcasing your projects and skills.",
            difficulty: "easy"
          },
          {
            title: "Responsive Product Landing Page",
            description: "Build a responsive product landing page with multiple sections.",
            difficulty: "medium"
          }
        ],
        notes: [
          {
            id: "note-1",
            content: "Always use semantic HTML elements for better accessibility and SEO.",
            createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
          },
          {
            id: "note-2",
            content: "CSS Flexbox and Grid are powerful for layouts, but start with the basics before diving in.",
            createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
          }
        ],
        estimatedTime: "3-4 weeks"
      },
      {
        title: "JavaScript Basics",
        description: "Learn core JavaScript concepts to make your websites interactive.",
        skills: ["Variables", "Functions", "DOM Manipulation", "Events", "Conditionals"],
        resources: [
          {
            title: "JavaScript.info",
            url: "https://javascript.info/",
            type: "tutorial",
            description: "Modern JavaScript tutorial with exercises."
          },
          {
            title: "Eloquent JavaScript",
            url: "https://eloquentjavascript.net/",
            type: "book",
            description: "Free book covering JavaScript fundamentals."
          }
        ],
        videoSuggestions: [
          {
            title: "JavaScript Crash Course for Beginners",
            url: "https://www.youtube.com/watch?v=hdI2bqOjy3c",
            thumbnail: "https://i.ytimg.com/vi/hdI2bqOjy3c/mqdefault.jpg",
            duration: "1:40:29",
            source: "Traversy Media"
          }
        ],
        exercises: [
          {
            title: "Interactive Form Validation",
            description: "Create a form with client-side validation using JavaScript.",
            difficulty: "medium"
          },
          {
            title: "Simple Todo List Application",
            description: "Build a todo list with add, delete, and mark complete functionality.",
            difficulty: "medium"
          }
        ],
        notes: [],
        estimatedTime: "4-6 weeks"
      },
      {
        title: "Responsive Web Design",
        description: "Learn techniques for creating websites that work on all device sizes.",
        skills: ["Media Queries", "Viewport", "Responsive Images", "Mobile-First Design"],
        resources: [
          {
            title: "Responsive Web Design Fundamentals",
            url: "https://web.dev/responsive-web-design-basics/",
            type: "tutorial",
            description: "Google's guide to responsive design."
          }
        ],
        videoSuggestions: [],
        exercises: [
          {
            title: "Responsive Restaurant Website",
            description: "Create a fully responsive restaurant website with menu and contact form.",
            difficulty: "medium"
          }
        ],
        notes: [],
        estimatedTime: "2-3 weeks"
      }
    ];
  } else {
    // Advanced Web Development milestones
    return [
      {
        title: "Front-End Frameworks",
        description: "Learn modern JavaScript frameworks for building complex web applications.",
        skills: ["React", "Vue.js", "State Management", "Component Architecture"],
        resources: [
          {
            title: "React Documentation",
            url: "https://reactjs.org/docs/getting-started.html",
            type: "documentation",
            description: "Official React documentation."
          },
          {
            title: "Vue.js Guide",
            url: "https://vuejs.org/guide/introduction.html",
            type: "documentation",
            description: "Comprehensive Vue.js guide."
          }
        ],
        videoSuggestions: [
          {
            title: "React Course - Beginner's Tutorial for React JavaScript Library",
            url: "https://www.youtube.com/watch?v=bMknfKXIFA8",
            thumbnail: "https://i.ytimg.com/vi/bMknfKXIFA8/mqdefault.jpg",
            duration: "11:55:27",
            source: "freeCodeCamp.org"
          }
        ],
        exercises: [
          {
            title: "Build a React Dashboard",
            description: "Create a dashboard with multiple components and data visualization.",
            difficulty: "hard"
          }
        ],
        notes: [],
        estimatedTime: "8-10 weeks"
      },
      {
        title: "Back-End Development",
        description: "Learn server-side programming and API development.",
        skills: ["Node.js", "Express", "RESTful APIs", "Authentication"],
        resources: [],
        videoSuggestions: [],
        exercises: [
          {
            title: "Build a RESTful API",
            description: "Create a complete API with CRUD operations.",
            difficulty: "hard"
          }
        ],
        notes: [],
        estimatedTime: "6-8 weeks"
      },
      {
        title: "Database Integration",
        description: "Learn to work with databases in web applications.",
        skills: ["SQL", "MongoDB", "Database Design", "ORM/ODM"],
        resources: [],
        videoSuggestions: [],
        exercises: [],
        notes: [],
        estimatedTime: "4-6 weeks"
      },
      {
        title: "Deployment and DevOps",
        description: "Learn to deploy and maintain web applications.",
        skills: ["Git", "CI/CD", "Cloud Services", "Docker"],
        resources: [],
        videoSuggestions: [],
        exercises: [],
        notes: [],
        estimatedTime: "3-4 weeks"
      }
    ];
  }
}

// Data Science milestones
function generateDataScienceMilestones(skillLevel: number): any[] {
  if (skillLevel <= 2) {
    // Beginner Data Science milestones
    return [
      {
        title: "Python for Data Science",
        description: "Learn Python programming with a focus on data manipulation and analysis.",
        skills: ["Python Basics", "NumPy", "Pandas", "Data Structures"],
        resources: [
          {
            title: "Python Data Science Handbook",
            url: "https://jakevdp.github.io/PythonDataScienceHandbook/",
            type: "book",
            description: "Comprehensive guide to Python for data science."
          },
          {
            title: "Pandas Documentation",
            url: "https://pandas.pydata.org/docs/",
            type: "documentation",
            description: "Official documentation for the Pandas library."
          }
        ],
        videoSuggestions: [
          {
            title: "Python for Data Science - Course for Beginners",
            url: "https://www.youtube.com/watch?v=LHBE6Q9XlzI",
            thumbnail: "https://i.ytimg.com/vi/LHBE6Q9XlzI/mqdefault.jpg",
            duration: "4:02:28",
            source: "freeCodeCamp.org"
          }
        ],
        exercises: [
          {
            title: "Data Cleaning and Preparation",
            description: "Practice cleaning and preparing messy datasets using Pandas.",
            difficulty: "medium"
          },
          {
            title: "Exploratory Data Analysis",
            description: "Analyze and visualize a dataset to extract insights.",
            difficulty: "medium"
          }
        ],
        notes: [
          {
            id: "note-1",
            content: "NumPy arrays are more efficient than Python lists for numerical computations.",
            createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
          }
        ],
        estimatedTime: "4-6 weeks"
      },
      {
        title: "Data Visualization",
        description: "Learn to create effective visualizations to communicate insights.",
        skills: ["Matplotlib", "Seaborn", "Visualization Principles", "Interactive Charts"],
        resources: [
          {
            title: "Seaborn Tutorial",
            url: "https://seaborn.pydata.org/tutorial.html",
            type: "tutorial",
            description: "Official tutorial for the Seaborn visualization library."
          }
        ],
        videoSuggestions: [
          {
            title: "Data Visualization with Python and Matplotlib",
            url: "https://www.youtube.com/watch?v=DAQNHzOcO5A",
            thumbnail: "https://i.ytimg.com/vi/DAQNHzOcO5A/mqdefault.jpg",
            duration: "2:51:23",
            source: "freeCodeCamp.org"
          }
        ],
        exercises: [
          {
            title: "Multi-dimensional Data Visualization",
            description: "Create visualizations for complex datasets with multiple variables.",
            difficulty: "medium"
          }
        ],
        notes: [],
        estimatedTime: "3-4 weeks"
      },
      {
        title: "Statistics for Data Science",
        description: "Learn essential statistical concepts for data analysis.",
        skills: ["Descriptive Statistics", "Probability", "Hypothesis Testing", "Confidence Intervals"],
        resources: [
          {
            title: "Think Stats: Exploratory Data Analysis in Python",
            url: "https://greenteapress.com/wp/think-stats-2e/",
            type: "book",
            description: "Free book on statistics with Python."
          }
        ],
        videoSuggestions: [
          {
            title: "Statistics for Data Science Full Course",
            url: "https://www.youtube.com/watch?v=Vfo5le26IhY",
            thumbnail: "https://i.ytimg.com/vi/Vfo5le26IhY/mqdefault.jpg",
            duration: "11:26:45",
            source: "Great Learning"
          }
        ],
        exercises: [
          {
            title: "Statistical Analysis Project",
            description: "Apply statistical methods to analyze a real-world dataset.",
            difficulty: "medium"
          }
        ],
        notes: [],
        estimatedTime: "5-7 weeks"
      }
    ];
  } else {
    // Advanced Data Science milestones
    return [
      {
        title: "Machine Learning Fundamentals",
        description: "Learn the core concepts and algorithms of machine learning.",
        skills: ["Supervised Learning", "Unsupervised Learning", "Model Evaluation", "Scikit-Learn"],
        resources: [
          {
            title: "Machine Learning Crash Course",
            url: "https://developers.google.com/machine-learning/crash-course",
            type: "course",
            description: "Google's machine learning course for beginners."
          },
          {
            title: "Hands-On Machine Learning with Scikit-Learn & TensorFlow",
            url: "https://www.oreilly.com/library/view/hands-on-machine-learning/9781492032632/",
            type: "book",
            description: "Comprehensive book on practical machine learning."
          }
        ],
        videoSuggestions: [
          {
            title: "Machine Learning Full Course",
            url: "https://www.youtube.com/watch?v=NWONeJKn6kc",
            thumbnail: "https://i.ytimg.com/vi/NWONeJKn6kc/mqdefault.jpg",
            duration: "7:22:25",
            source: "Edureka"
          }
        ],
        exercises: [
          {
            title: "Classification Project",
            description: "Build a machine learning model to solve a classification problem.",
            difficulty: "hard"
          },
          {
            title: "Regression Analysis",
            description: "Implement and evaluate regression models on real data.",
            difficulty: "hard"
          }
        ],
        notes: [],
        estimatedTime: "8-10 weeks"
      },
      {
        title: "Deep Learning",
        description: "Explore neural networks and deep learning techniques.",
        skills: ["Neural Networks", "TensorFlow", "PyTorch", "Computer Vision", "NLP"],
        resources: [
          {
            title: "Deep Learning Book",
            url: "https://www.deeplearningbook.org/",
            type: "book",
            description: "Comprehensive deep learning textbook."
          }
        ],
        videoSuggestions: [
          {
            title: "Deep Learning Crash Course",
            url: "https://www.youtube.com/watch?v=VyWAvY2CF9c",
            thumbnail: "https://i.ytimg.com/vi/VyWAvY2CF9c/mqdefault.jpg",
            duration: "1:23:40",
            source: "Krish Naik"
          }
        ],
        exercises: [
          {
            title: "Image Classification with CNNs",
            description: "Build a convolutional neural network for image classification.",
            difficulty: "hard"
          }
        ],
        notes: [],
        estimatedTime: "10-12 weeks"
      },
      {
        title: "Big Data Technologies",
        description: "Learn to process and analyze large-scale datasets.",
        skills: ["Hadoop", "Spark", "Distributed Computing", "Data Pipelines"],
        resources: [],
        videoSuggestions: [],
        exercises: [],
        notes: [],
        estimatedTime: "6-8 weeks"
      },
      {
        title: "Data Science in Production",
        description: "Learn how to deploy and maintain data science models.",
        skills: ["Model Deployment", "MLOps", "Monitoring", "Docker"],
        resources: [],
        videoSuggestions: [],
        exercises: [],
        notes: [],
        estimatedTime: "4-6 weeks"
      }
    ];
  }
}

// Mobile Development milestones
function generateMobileDevelopmentMilestones(skillLevel: number): any[] {
  if (skillLevel <= 2) {
    return [
      {
        title: "Mobile Development Fundamentals",
        description: "Learn the basics of mobile app development and design.",
        skills: ["Mobile UI Design", "App Architecture", "Platform Basics"],
        resources: [],
        videoSuggestions: [],
        exercises: [],
        notes: [],
        estimatedTime: "3-4 weeks"
      },
      {
        title: "React Native Basics",
        description: "Learn to build cross-platform mobile apps with React Native.",
        skills: ["React Native", "JavaScript", "Component Design", "Navigation"],
        resources: [],
        videoSuggestions: [],
        exercises: [],
        notes: [],
        estimatedTime: "5-7 weeks"
      }
    ];
  } else {
    return [
      {
        title: "Advanced Mobile Development",
        description: "Master complex mobile app development techniques.",
        skills: ["State Management", "Native Modules", "Performance Optimization"],
        resources: [],
        videoSuggestions: [],
        exercises: [],
        notes: [],
        estimatedTime: "8-10 weeks"
      }
    ];
  }
}

// DevOps milestones
function generateDevOpsMilestones(skillLevel: number): any[] {
  if (skillLevel <= 2) {
    return [
      {
        title: "DevOps Fundamentals",
        description: "Learn the core concepts and practices of DevOps.",
        skills: ["Linux Basics", "Version Control", "CI/CD Concepts"],
        resources: [],
        videoSuggestions: [],
        exercises: [],
        notes: [],
        estimatedTime: "4-5 weeks"
      }
    ];
  } else {
    return [
      {
        title: "Advanced DevOps",
        description: "Master advanced DevOps tools and practices.",
        skills: ["Kubernetes", "Infrastructure as Code", "Monitoring", "Security"],
        resources: [],
        videoSuggestions: [],
        exercises: [],
        notes: [],
        estimatedTime: "8-10 weeks"
      }
    ];
  }
}

// Machine Learning milestones
function generateMachineLearningMilestones(skillLevel: number): any[] {
  if (skillLevel <= 2) {
    return [
      {
        title: "Introduction to Machine Learning",
        description: "Learn the fundamentals of machine learning algorithms and concepts.",
        skills: ["Supervised Learning", "Unsupervised Learning", "Model Evaluation"],
        resources: [],
        videoSuggestions: [],
        exercises: [],
        notes: [],
        estimatedTime: "6-8 weeks"
      }
    ];
  } else {
    return [
      {
        title: "Advanced Machine Learning",
        description: "Explore advanced ML techniques and applications.",
        skills: ["Deep Learning", "Reinforcement Learning", "Model Deployment"],
        resources: [],
        videoSuggestions: [],
        exercises: [],
        notes: [],
        estimatedTime: "10-12 weeks"
      }
    ];
  }
}

// Generic Topic milestones
function generateGenericTopicMilestones(topic: string, skillLevel: number): any[] {
  if (skillLevel <= 2) {
    return [
      {
        title: `${topic} Fundamentals`,
        description: `Learn the core concepts and principles of ${topic}.`,
        skills: [`${topic} Basics`, "Core Principles", "Foundational Tools"],
        resources: [
          {
            title: `Introduction to ${topic}`,
            url: "#",
            type: "course",
            description: `Comprehensive introduction to ${topic}.`
          }
        ],
        videoSuggestions: [
          {
            title: `${topic} for Beginners`,
            url: "#",
            thumbnail: `https://picsum.photos/seed/${topic.replace(/\s+/g, "")}/320/180`,
            duration: "1:45:30",
            source: "Learning Academy"
          }
        ],
        exercises: [
          {
            title: `${topic} Starter Project`,
            description: `Build a simple project to practice ${topic} fundamentals.`,
            difficulty: "easy"
          }
        ],
        notes: [],
        estimatedTime: "4-6 weeks"
      },
      {
        title: `Intermediate ${topic}`,
        description: `Deepen your understanding of ${topic} with more advanced concepts.`,
        skills: ["Intermediate Techniques", "Best Practices", "Problem Solving"],
        resources: [],
        videoSuggestions: [],
        exercises: [],
        notes: [],
        estimatedTime: "6-8 weeks"
      }
    ];
  } else {
    return [
      {
        title: `Advanced ${topic}`,
        description: `Master complex ${topic} concepts and techniques.`,
        skills: ["Advanced Methodologies", "Optimization", "Expert Techniques"],
        resources: [
          {
            title: `Advanced ${topic} Techniques`,
            url: "#",
            type: "course",
            description: `In-depth coverage of advanced ${topic} concepts.`
          }
        ],
        videoSuggestions: [],
        exercises: [
          {
            title: `${topic} Capstone Project`,
            description: `Build a comprehensive project demonstrating mastery of ${topic}.`,
            difficulty: "hard"
          }
        ],
        notes: [],
        estimatedTime: "8-12 weeks"
      },
      {
        title: `${topic} in Production`,
        description: `Learn to apply ${topic} in real-world professional contexts.`,
        skills: ["Industry Standards", "Best Practices", "Professional Tools"],
        resources: [],
        videoSuggestions: [],
        exercises: [],
        notes: [],
        estimatedTime: "6-8 weeks"
      }
    ];
  }
}

// Include the existing language-specific milestone generator functions
function generateJavaScriptMilestones(skillLevel: number): any[] {
  if (skillLevel <= 2) {
    // Beginner JavaScript milestones
    return [
      {
        title: "JavaScript Fundamentals",
        description: "Learn the core concepts of JavaScript including variables, data types, operators, and control flow.",
        skills: ["Variables", "Data Types", "Operators", "Control Flow", "Functions"],
        resources: [
          {
            title: "JavaScript Basics - MDN Web Docs",
            url: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps",
            type: "documentation",
            description: "Official Mozilla documentation on JavaScript basics."
          },
          {
            title: "JavaScript Fundamentals - The Odin Project",
            url: "https://www.theodinproject.com/paths/full-stack-javascript/courses/javascript",
            type: "course",
            description: "Free, comprehensive JavaScript fundamentals course."
          },
          {
            title: "JavaScript Crash Course For Beginners",
            url: "https://www.youtube.com/watch?v=hdI2bqOjy3c",
            type: "video",
            description: "A quick overview of JavaScript fundamentals in one video."
          }
        ],
        videoSuggestions: [
          {
            title: "JavaScript Fundamentals for Beginners",
            url: "https://www.youtube.com/watch?v=W6NZfCO5SIk",
            thumbnail: "https://i.ytimg.com/vi/W6NZfCO5SIk/mqdefault.jpg",
            duration: "48:17",
            source: "Programming with Mosh"
          },
          {
            title: "JavaScript Tutorial for Beginners: Learn JavaScript in 1 Hour",
            url: "https://www.youtube.com/watch?v=W6NZfCO5SIk",
            thumbnail: "https://i.ytimg.com/vi/W6NZfCO5SIk/mqdefault.jpg",
            duration: "1:18:56",
            source: "Programming with Mosh"
          }
        ],
        exercises: [
          {
            title: "Variable and Data Type Practice",
            description: "Create variables of each type and practice converting between types.",
            difficulty: "easy"
          },
          {
            title: "Control Flow Challenge",
            description: "Write programs using if/else statements and loops to solve simple problems.",
            difficulty: "easy"
          },
          {
            title: "Function Builder",
            description: "Create functions with parameters and return values to perform specific tasks.",
            difficulty: "medium"
          }
        ],
        notes: [
          {
            id: "note-1",
            content: "Remember to use 'const' for variables that won't change, and 'let' for variables that will.",
            createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 7 days ago
          },
          {
            id: "note-2",
            content: "JavaScript is loosely typed - variables can change types during execution. Be careful with this!",
            createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
          }
        ],
        estimatedTime: "2-3 weeks"
      },
      {
        title: "DOM Manipulation",
        description: "Learn how to manipulate the DOM to create dynamic web pages.",
        skills: ["querySelector", "addEventListener", "innerHTML", "className"],
        resources: [
          {
            title: "DOM Manipulation - MDN Web Docs",
            url: "https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model",
            type: "documentation",
            description: "Official Mozilla documentation on DOM manipulation."
          },
          {
            title: "DOM Manipulation - The Odin Project",
            url: "https://www.theodinproject.com/lessons/javascript-dom-manipulation",
            type: "course",
            description: "Free, comprehensive DOM manipulation course."
          }
        ],
        videoSuggestions: [
          {
            title: "JavaScript DOM Manipulation Crash Course",
            url: "https://www.youtube.com/watch?v=W3NGKiktjwU",
            thumbnail: "https://i.ytimg.com/vi/W3NGKiktjwU/mqdefault.jpg",
            duration: "24:45",
            source: "Traversy Media"
          }
        ],
        exercises: [
          {
            title: "Create a Dynamic List",
            description: "Create a list that dynamically adds and removes items.",
            difficulty: "easy"
          },
          {
            title: "Change Styles on Click",
            description: "Change the styles of an element when it is clicked.",
            difficulty: "easy"
          },
          {
            title: "Create a Simple Image Gallery",
            description: "Create a simple image gallery that allows users to navigate through images.",
            difficulty: "medium"
          }
        ],
        notes: [
          {
            id: "note-1",
            content: "Use event listeners to respond to user interactions.",
            createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 7 days ago
          },
          {
            id: "note-2",
            content: "Use querySelector to select elements in the DOM.",
            createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
          }
        ],
        estimatedTime: "2-3 weeks"
      }
    ];
  } else {
    // Advanced JavaScript milestones
    return [
      {
        title: "Advanced JavaScript Concepts",
        description: "Deepen your understanding of JavaScript with advanced concepts like closures, prototypes, and the this keyword.",
        skills: ["Closures", "Prototypes", "This Keyword", "Execution Context"],
        resources: [
          {
            title: "Advanced JavaScript Concepts - MDN",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures",
            type: "documentation",
            description: "In-depth documentation on advanced JavaScript concepts."
          },
          {
            title: "JavaScript: Understanding the Weird Parts",
            url: "https://www.udemy.com/course/understand-javascript/",
            type: "course",
            description: "Detailed course on JavaScript's most complex features."
          },
          {
            title: "JavaScript: The Hard Parts",
            url: "https://frontendmasters.com/courses/javascript-hard-parts/",
            type: "video",
            description: "Deep dive into challenging JavaScript concepts."
          }
        ],
        videoSuggestions: [
          {
            title: "JavaScript: The Advanced Concepts (2023)",
            url: "https://www.youtube.com/watch?v=R9I85RhI7Cg",
            thumbnail: "https://i.ytimg
