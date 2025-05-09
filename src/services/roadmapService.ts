import { RoadmapData } from '@/components/Roadmap';

interface FormData {
  name: string;
  goal: string;
  language: string;
  currentSkill: number;
  learningStyle: string;
  timeCommitment: string;
  additionalInfo: string;
}

// This would normally be an API call to an AI service
// For demo purposes, we're generating mock data based on user input
export async function generateRoadmap(formData: FormData): Promise<RoadmapData> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // Generate roadmap based on language and skill level
  const result: RoadmapData = {
    title: `${formData.language} Learning Roadmap`,
    overview: generateOverview(formData),
    milestones: generateMilestones(formData)
  };
  
  return result;
}

function generateOverview(formData: FormData): string {
  const { language, goal, currentSkill, learningStyle, timeCommitment } = formData;
  
  // Create personalized overview based on user choices
  let overview = `This personalized ${language} roadmap is designed to help you ${goal}. `;
  
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
  if (timeCommitment === "1-3 hours/week") {
    overview += `The milestones are sized appropriately for your limited weekly time commitment of 1-3 hours.`;
  } else if (timeCommitment === "4-6 hours/week") {
    overview += `Each milestone is designed to fit within your moderate weekly time commitment of 4-6 hours.`;
  } else if (timeCommitment === "7+ hours/week") {
    overview += `The comprehensive milestones take advantage of your significant time commitment of 7+ hours per week.`;
  } else {
    overview += `The pace is flexible to adapt to your available study time.`;
  }
  
  return overview;
}

function generateMilestones(formData: FormData): any[] {
  const { language, currentSkill, learningStyle, timeCommitment } = formData;
  let milestones = [];
  
  // Generate language-specific milestones
  const languageMilestones = generateLanguageSpecificMilestones(language, currentSkill);
  
  // Adjust milestones based on learning style
  adaptMilestonesToLearningStyle(languageMilestones, learningStyle);
  
  // Adjust milestones based on time commitment
  adaptMilestonesToTimeCommitment(languageMilestones, timeCommitment);
  
  return languageMilestones;
}

function generateLanguageSpecificMilestones(language: string, skillLevel: number): any[] {
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

function adaptMilestonesToLearningStyle(milestones: any[], learningStyle: string): void {
  milestones.forEach(milestone => {
    // Adjust resources based on learning style
    if (learningStyle === "visual") {
      // Add more video content
      expandVideoSuggestions(milestone);
      // Ensure each milestone has video resources
      if (!milestone.videoSuggestions) {
        milestone.videoSuggestions = generateVideoSuggestions(2, milestone.title);
      }
    } else if (learningStyle === "reading") {
      // Add more text-based resources
      milestone.resources = milestone.resources.filter(r => r.type !== "video").concat(
        generateReadingResources(2, milestone.title)
      );
    } else if (learningStyle === "interactive") {
      // Add more exercises
      milestone.exercises = milestone.exercises.concat(
        generateInteractiveExercises(1, milestone.title)
      );
    }
    
    // Make sure each milestone has at least sample notes
    if (!milestone.notes) {
      milestone.notes = [];
    }
    
    // Add sample notes if there are none
    if (milestone.notes.length === 0) {
      milestone.notes = generateSampleNotes(milestone.title);
    }
  });
}

function adaptMilestonesToTimeCommitment(milestones: any[], timeCommitment: string): void {
  // Adjust milestone scope based on time commitment
  if (timeCommitment === "1-3 hours/week") {
    // Simplify milestones for limited time
    milestones.forEach(milestone => {
      milestone.exercises = milestone.exercises.slice(0, Math.max(1, milestone.exercises.length - 1));
      milestone.estimatedTime = adjustEstimatedTime(milestone.estimatedTime, 0.7); // Reduce time by 30%
    });
  } else if (timeCommitment === "7+ hours/week") {
    // Expand milestones for more time
    milestones.forEach(milestone => {
      if (milestone.exercises.length < 4) {
        milestone.exercises.push(...generateInteractiveExercises(1, milestone.title));
      }
      milestone.estimatedTime = adjustEstimatedTime(milestone.estimatedTime, 1.3); // Increase time by 30%
    });
  }
}

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
      // ... keep existing code (remaining JavaScript milestones)
    ];
  } else {
    // Advanced JavaScript milestones
    // ... keep existing code (Advanced JavaScript milestones)
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
            thumbnail: "https://i.ytimg.com/vi/R9I85RhI7Cg/mqdefault.jpg",
            duration: "30:22:07",
            source: "Zero To Mastery"
          },
          {
            title: "JavaScript Under The Hood",
            url: "https://www.youtube.com/watch?v=8aGhZQkoFbQ",
            thumbnail: "https://i.ytimg.com/vi/8aGhZQkoFbQ/mqdefault.jpg",
            duration: "26:52",
            source: "JSConf"
          },
          {
            title: "Closures in JavaScript: A Complete Guide",
            url: "https://www.youtube.com/watch?v=vKJpN5FAeF4",
            thumbnail: "https://i.ytimg.com/vi/vKJpN5FAeF4/mqdefault.jpg",
            duration: "22:16",
            source: "Web Dev Simplified"
          }
        ],
        exercises: [
          {
            title: "Closure Implementations",
            description: "Create practical examples demonstrating closures and their uses.",
            difficulty: "medium"
          },
          {
            title: "Prototype Chain Exploration",
            description: "Build a complex inheritance system using prototypes.",
            difficulty: "hard"
          },
          {
            title: "Context Binding Challenges",
            description: "Practice managing 'this' context in various scenarios.",
            difficulty: "hard"
          }
        ],
        notes: [
          {
            id: "note-1",
            content: "The 'this' keyword behavior changes based on how a function is called. In arrow functions, 'this' is lexically bound.",
            createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
          },
          {
            id: "note-2",
            content: "Closures are functions that remember their lexical environment. They're useful for data encapsulation and creating private variables.",
            createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
          }
        ],
        estimatedTime: "3-4 weeks"
      },
      {
        title: "Modern JavaScript Development",
        description: "Master the modern JavaScript ecosystem including ES6+ features, modules, and build tools.",
        skills: ["ES6+ Features", "Modules", "Async/Await", "Babel", "Webpack"],
        resources: [
          {
            title: "Modern JavaScript Features - MDN",
            url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide",
            type: "documentation",
            description: "Guide to modern JavaScript features and best practices."
          },
          {
            title: "JavaScript Modules - A Complete Guide",
            url: "https://www.freecodecamp.org/news/javascript-modules-a-beginner-s-guide-783f7d7a5fcc/",
            type: "article",
            description: "Comprehensive guide to JavaScript modules."
          }
        ],
        videoSuggestions: [
          {
            title: "ES6 Tutorial: Learn Modern JavaScript",
            url: "https://www.youtube.com/watch?v=NCwa_xi0Uuc",
            thumbnail: "https://i.ytimg.com/vi/NCwa_xi0Uuc/mqdefault.jpg",
            duration: "1:13:42",
            source: "freeCodeCamp.org"
          },
          {
            title: "Webpack Crash Course",
            url: "https://www.youtube.com/watch?v=MpGLUVbqoYQ",
            thumbnail: "https://i.ytimg.com/vi/MpGLUVbqoYQ/mqdefault.jpg",
            duration: "38:55",
            source: "Traversy Media"
          }
        ],
        exercises: [
          {
            title: "ES6 Feature Implementation",
            description: "Refactor legacy JavaScript code using modern ES6+ features.",
            difficulty: "medium"
          },
          {
            title: "Module Bundler Setup",
            description: "Set up a complete build system using Webpack and Babel.",
            difficulty: "hard"
          }
        ],
        notes: [
          {
            id: "note-1",
            content: "ES6 introduced many features that make JavaScript more powerful and expressive: arrow functions, destructuring, spread operator, and more.",
            createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000)
          }
        ],
        estimatedTime: "2-3 weeks"
      }
    ];
  }
}

function generatePythonMilestones(skillLevel: number): any[] {
  if (skillLevel <= 2) {
    // Beginner Python milestones
    return [
      {
        title: "Python Fundamentals",
        description: "Learn the core Python syntax, data types, and basic operations.",
        skills: ["Variables", "Data Types", "Control Flow", "Functions", "Lists and Dictionaries"],
        resources: [
          {
            title: "Python Official Tutorial",
            url: "https://docs.python.org/3/tutorial/",
            type: "documentation",
            description: "The official Python tutorial covering all the basics."
          },
          {
            title: "Python for Everybody - Coursera",
            url: "https://www.coursera.org/specializations/python",
            type: "course",
            description: "Popular beginner-friendly Python course series."
          },
          {
            title: "Python Crash Course For Beginners",
            url: "https://www.youtube.com/watch?v=JJmcL1N2KQs",
            type: "video",
            description: "Comprehensive overview of Python fundamentals."
          }
        ],
        videoSuggestions: [
          {
            title: "Python for Beginners - Learn Python in 1 Hour",
            url: "https://www.youtube.com/watch?v=kqtD5dpn9C8",
            thumbnail: "https://i.ytimg.com/vi/kqtD5dpn9C8/mqdefault.jpg",
            duration: "1:00:27",
            source: "Programming with Mosh"
          },
          {
            title: "Learn Python - Full Course for Beginners",
            url: "https://www.youtube.com/watch?v=rfscVS0vtbw",
            thumbnail: "https://i.ytimg.com/vi/rfscVS0vtbw/mqdefault.jpg",
            duration: "4:26:51",
            source: "freeCodeCamp.org"
          }
        ],
        exercises: [
          {
            title: "Python Calculator",
            description: "Build a simple calculator using basic Python operations.",
            difficulty: "easy"
          },
          {
            title: "List Manipulation",
            description: "Practice creating and manipulating lists with various methods.",
            difficulty: "easy"
          },
          {
            title: "Dictionary Data Storage",
            description: "Create a program that stores and retrieves data using dictionaries.",
            difficulty: "medium"
          }
        ],
        notes: [
          {
            id: "note-1",
            content: "Python uses indentation for code blocks, not curly braces like many other languages. This makes the code more readable but requires careful attention to spacing.",
            createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000)
          }
        ],
        estimatedTime: "2-3 weeks"
      },
      {
        title: "Python Data Structures",
        description: "Master Python's built-in data structures and when to use each one.",
        skills: ["Lists", "Tuples", "Sets", "Dictionaries", "Comprehensions"],
        resources: [
          {
            title: "Python Data Structures - Real Python",
            url: "https://realpython.com/python-data-structures/",
            type: "article",
            description: "In-depth guide to Python data structures."
          }
        ],
        videoSuggestions: [
          {
            title: "Python Data Structures Tutorial",
            url: "https://www.youtube.com/watch?v=R-HLU9Fl5ug",
            thumbnail: "https://i.ytimg.com/vi/R-HLU9Fl5ug/mqdefault.jpg",
            duration: "1:51:09",
            source: "freeCodeCamp.org"
          }
        ],
        exercises: [
          {
            title: "Data Structure Selection",
            description: "Solve problems by selecting the appropriate data structure.",
            difficulty: "medium"
          }
        ],
        notes: [],
        estimatedTime: "2 weeks"
      }
    ];
  } else {
    // Advanced Python milestones
    return [
      {
        title: "Advanced Python Concepts",
        description: "Deepen your understanding with advanced Python features like decorators, generators, and context managers.",
        skills: ["Decorators", "Generators", "Context Managers", "Metaclasses"],
        resources: [
          {
            title: "Advanced Python - Real Python",
            url: "https://realpython.com/tutorials/advanced/",
            type: "article",
            description: "Collection of advanced Python articles and tutorials."
          }
        ],
        videoSuggestions: [
          {
            title: "Advanced Python - Decorators, Generators, and Context Managers",
            url: "https://www.youtube.com/watch?v=WOHystYwByE",
            thumbnail: "https://i.ytimg.com/vi/WOHystYwByE/mqdefault.jpg",
            duration: "1:30:52",
            source: "Tech With Tim"
          }
        ],
        exercises: [
          {
            title: "Custom Decorator",
            description: "Create decorators to add functionality to existing functions.",
            difficulty: "hard"
          }
        ],
        notes: [],
        estimatedTime: "3-4 weeks"
      }
    ];
  }
}

function generateReactMilestones(skillLevel: number): any[] {
  // React milestones based on skill level
  if (skillLevel <= 2) {
    return [
      {
        title: "React Fundamentals",
        description: "Learn the core concepts of React including components, props, and state.",
        skills: ["Components", "JSX", "Props", "State", "Hooks"],
        resources: [
          {
            title: "React Official Documentation",
            url: "https://reactjs.org/docs/getting-started.html",
            type: "documentation",
            description: "The official React documentation."
          }
        ],
        videoSuggestions: [
          {
            title: "React Course For Beginners",
            url: "https://www.youtube.com/watch?v=bMknfKXIFA8",
            thumbnail: "https://i.ytimg.com/vi/bMknfKXIFA8/mqdefault.jpg",
            duration: "11:55:27",
            source: "freeCodeCamp.org"
          }
        ],
        exercises: [
          {
            title: "Component Creation",
            description: "Create reusable React components with props.",
            difficulty: "easy"
          }
        ],
        notes: [],
        estimatedTime: "3-4 weeks"
      }
    ];
  } else {
    return [
      {
        title: "Advanced React Patterns",
        description: "Master advanced React patterns and optimizations.",
        skills: ["Context API", "Render Props", "HOCs", "Performance", "Suspense"],
        resources: [
          {
            title: "Advanced React Patterns",
            url: "https://kentcdodds.com/blog/advanced-react-patterns",
            type: "article",
            description: "Guide to advanced React patterns."
          }
        ],
        videoSuggestions: [
          {
            title: "Advanced React Hooks",
            url: "https://www.youtube.com/watch?v=YKmiLcXiMMo",
            thumbnail: "https://i.ytimg.com/vi/YKmiLcXiMMo/mqdefault.jpg",
            duration: "1:29:43",
            source: "Ben Awad"
          }
        ],
        exercises: [
          {
            title: "Custom Hook Creation",
            description: "Create reusable custom hooks for common functionality.",
            difficulty: "hard"
          }
        ],
        notes: [],
        estimatedTime: "4 weeks"
      }
    ];
  }
}

function generateJavaMilestones(skillLevel: number): any[] {
  // Java milestones based on skill level
  if (skillLevel <= 2) {
    return [
      {
        title: "Java Fundamentals",
        description: "Learn the core concepts of Java including classes, objects, and inheritance.",
        skills: ["Classes", "Objects", "Methods", "Inheritance", "Polymorphism"],
        resources: [
          {
            title: "Java Tutorials - Oracle",
            url: "https://docs.oracle.com/javase/tutorial/",
            type: "documentation",
            description: "Official Java tutorials from Oracle."
          }
        ],
        videoSuggestions: [
          {
            title: "Java Tutorial for Beginners",
            url: "https://www.youtube.com/watch?v=eIrMbAQSU34",
            thumbnail: "https://i.ytimg.com/vi/eIrMbAQSU34/mqdefault.jpg",
            duration: "2:30:29",
            source: "Programming with Mosh"
          }
        ],
        exercises: [
          {
            title: "Object-Oriented Design",
            description: "Design classes and objects to model a system.",
            difficulty: "medium"
          }
        ],
        notes: [],
        estimatedTime: "4 weeks"
      }
    ];
  } else {
    return [
      {
        title: "Advanced Java Development",
        description: "Master advanced Java topics like concurrency, streams, and reflection.",
        skills: ["Concurrency", "Streams API", "Reflection", "JVM Internals"],
        resources: [
          {
            title: "Java Concurrency in Practice",
            url: "https://jcip.net/",
            type: "book",
            description: "Comprehensive book on Java concurrency."
          }
        ],
        videoSuggestions: [
          {
            title: "Advanced Java Programming",
            url: "https://www.youtube.com/watch?v=Ae-r8hsbPUo",
            thumbnail: "https://i.ytimg.com/vi/Ae-r8hsbPUo/mqdefault.jpg",
            duration: "2:56:03",
            source: "Amigoscode"
          }
        ],
        exercises: [
          {
            title: "Thread-Safe Application",
            description: "Build a multi-threaded application with proper synchronization.",
            difficulty: "hard"
          }
        ],
        notes: [],
        estimatedTime: "5 weeks"
      }
    ];
  }
}

function generateGenericMilestones(language: string, skillLevel: number): any[] {
  // Generic milestones for any language based on skill level
  if (skillLevel <= 2) {
    return [
      {
        title: `${language} Fundamentals`,
        description: `Learn the basic syntax and concepts of ${language}.`,
        skills: ["Core Syntax", "Basic Operations", "Control Structures", "Functions"],
        resources: [
          {
            title: `${language} Official Documentation`,
            url: "#",
            type: "documentation",
            description: `The official reference for ${language} programming.`
          }
        ],
        videoSuggestions: [
          {
            title: `${language} Programming Course for Beginners`,
            url: "#",
            thumbnail: "",
            duration: "1:30:00",
            source: "Learning Platform"
          }
        ],
        exercises: [
          {
            title: "Syntax Practice",
            description: `Write basic programs using ${language} syntax.`,
            difficulty: "easy"
          }
        ],
        notes: [],
        estimatedTime: "2-3 weeks"
      },
      {
        title: `${language} Data Structures`,
        description: `Learn common data structures in ${language}.`,
        skills: ["Arrays", "Lists", "Maps", "Sets"],
        resources: [
          {
            title: `${language} Data Structures Tutorial`,
            url: "#",
            type: "documentation",
            description: `Guide to data structures in ${language}.`
          }
        ],
        videoSuggestions: [
          {
            title: `${language} Data Structures Explained`,
            url: "#",
            thumbnail: "",
            duration: "52:18",
            source: "Programming Tutorials"
          }
        ],
        exercises: [
          {
            title: "Data Structure Implementation",
            description: `Implement basic data structures in ${language}.`,
            difficulty: "medium"
          }
        ],
        notes: [],
        estimatedTime: "2 weeks"
      }
    ];
  } else {
    return [
      {
        title: `Advanced ${language}`,
        description: `Master advanced ${language} features and best practices.`,
        skills: ["Advanced Concepts", "Performance Optimization", "Design Patterns"],
        resources: [
          {
            title: `Advanced ${language} Programming`,
            url: "#",
            type: "documentation",
            description: `Deep dive into advanced ${language} features.`
          }
        ],
        videoSuggestions: [
          {
            title: `Advanced ${language} Techniques`,
            url: "#",
            thumbnail: "",
            duration: "1:42:37",
            source: "Expert Tutorials"
          }
        ],
        exercises: [
          {
            title: "Advanced Framework Project",
            description: `Build a complete application using ${language}.`,
            difficulty: "hard"
          }
        ],
        notes: [],
        estimatedTime: "4 weeks"
      },
      {
        title: `${language} Ecosystem`,
        description: `Explore the broader ${language} ecosystem and tools.`,
        skills: ["Frameworks", "Libraries", "Tools", "Best Practices"],
        resources: [
          {
            title: `${language} Ecosystem Guide`,
            url: "#",
            type: "article",
            description: `Overview of the ${language} ecosystem.`
          }
        ],
        videoSuggestions: [
          {
            title: `Modern ${language} Development`,
            url: "#",
            thumbnail: "",
            duration: "1:15:44",
            source: "Professional Developers"
          }
        ],
        exercises: [
          {
            title: "Full Stack Project",
            description: `Build a complete application using ${language} and related technologies.`,
            difficulty: "hard"
          }
        ],
        notes: [],
        estimatedTime: "5 weeks"
      }
    ];
  }
}

// Helper functions for generating content

function expandVideoSuggestions(milestone: any): void {
  if (!milestone.videoSuggestions) {
    milestone.videoSuggestions = [];
  }
  
  // Add additional video suggestions based on milestone title
  const additionalVideos = generateVideoSuggestions(2, milestone.title);
  milestone.videoSuggestions = [...milestone.videoSuggestions, ...additionalVideos];
}

function generateVideoSuggestions(count: number, topic: string): any[] {
  const videoTopics = [
    "Beginner Tutorial",
    "Complete Guide",
    "Crash Course",
    "Practical Examples",
    "Deep Dive",
    "Quick Reference",
    "Best Practices",
    "Common Mistakes"
  ];
  
  const sources = [
    "freeCodeCamp.org",
    "Traversy Media",
    "Programming with Mosh",
    "Web Dev Simplified",
    "Academind",
    "The Net Ninja",
    "Coding Train",
    "CS Dojo"
  ];
  
  const durations = [
    "10:27",
    "22:45",
    "45:18",
    "1:12:39",
    "28:53",
    "16:42",
    "53:21",
    "2:04:17"
  ];
  
  return Array.from({ length: count }, (_, i) => {
    const videoTopic = videoTopics[Math.floor(Math.random() * videoTopics.length)];
    const source = sources[Math.floor(Math.random() * sources.length)];
    const duration = durations[Math.floor(Math.random() * durations.length)];
    
    return {
      title: `${topic} ${videoTopic}`,
      url: "#",
      thumbnail: `https://picsum.photos/seed/${topic.replace(/\s+/g, "")}${i}/320/180`,
      duration: duration,
      source: source
    };
  });
}

function generateReadingResources(count: number, topic: string): any[] {
  const resourceTypes = ["article", "documentation", "book"];
  const resourceDescriptions = [
    "Comprehensive guide to",
    "Quick overview of",
    "In-depth explanation of",
    "Beginner-friendly introduction to",
    "Advanced tutorial on"
  ];
  
  return Array.from({ length: count }, () => {
    const type = resourceTypes[Math.floor(Math.random() * resourceTypes.length)];
    const description = resourceDescriptions[Math.floor(Math.random() * resourceDescriptions.length)];
    
    return {
      title: `${topic} Guide`,
      url: "#",
      type: type,
      description: `${description} ${topic}.`
    };
  });
}

function generateInteractiveExercises(count: number, topic: string): any[] {
  const difficulties = ["easy", "medium", "hard"];
  const exercisePrefixes = [
    "Build a",
    "Implement a",
    "Create a",
    "Develop a",
    "Design a"
  ];
  
  return Array.from({ length: count }, () => {
    const difficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
    const prefix = exercisePrefixes[Math.floor(Math.random() * exercisePrefixes.length)];
    
    return {
      title: `${topic} Practice Project`,
      description: `${prefix} simple application to practice ${topic} concepts.`,
      difficulty: difficulty
    };
  });
}

function generateSampleNotes(topic: string): any[] {
  const noteContents = [
    `Remember to practice ${topic} concepts regularly to reinforce learning.`,
    `Found a great resource for ${topic}: check the official documentation for examples.`,
    `Key insight for ${topic}: focus on understanding the core principles before diving into complex cases.`
  ];
  
  return noteContents.map((content, index) => ({
    id: `note-${Date.now() + index}`,
    content: content,
    createdAt: new Date(Date.now() - (Math.random() * 10) * 24 * 60 * 60 * 1000) // Random date within the last 10 days
  }));
}

function adjustEstimatedTime(timeString: string, factor: number): string {
  // Parse the time string (e.g., "2-3 weeks" -> [2, 3, "weeks"])
  const match = timeString.match(/(\d+)-(\d+)\s+(\w+)/);
  if (match) {
    const minTime = Math.round(parseInt(match[1]) * factor);
    const maxTime = Math.round(parseInt(match[2]) * factor);
    return `${minTime}-${maxTime} ${match[3]}`;
  }
  return timeString;
}
