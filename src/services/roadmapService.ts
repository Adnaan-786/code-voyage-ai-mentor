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
  const { language, goal, currentSkill } = formData;
  
  if (language === "JavaScript") {
    if (currentSkill <= 2) {
      return `This roadmap will guide you from the basics of ${language} to becoming proficient enough to ${goal}. Starting with fundamentals, you'll progress through interactive exercises and projects tailored to your ${formData.learningStyle} learning style.`;
    } else {
      return `Building on your existing knowledge of ${language}, this advanced roadmap will help you ${goal}. You'll deepen your expertise through specialized topics and increasingly complex projects aligned with your ${formData.learningStyle} learning preferences.`;
    }
  } else if (language === "Python") {
    if (currentSkill <= 2) {
      return `This personalized roadmap introduces you to Python from the ground up, focusing on helping you ${goal}. Each milestone includes resources and exercises chosen for your ${formData.learningStyle} learning style.`;
    } else {
      return `As an experienced Python developer, this roadmap will expand your capabilities to help you ${goal}. The path focuses on advanced concepts and real-world applications that match your ${formData.learningStyle} learning preferences.`;
    }
  } else {
    if (currentSkill <= 2) {
      return `This roadmap provides a structured path to learn ${language} from scratch and achieve your goal to ${goal}. Each step includes carefully selected resources that match your ${formData.learningStyle} learning style.`;
    } else {
      return `This advanced ${language} roadmap will refine your existing skills and help you ${goal}. The curriculum builds on your current knowledge with specialized topics and projects tailored to your ${formData.learningStyle} learning approach.`;
    }
  }
}

function generateMilestones(formData: FormData): any[] {
  const { language, currentSkill } = formData;
  let milestones = [];
  
  // Generate milestones based on language and skill level
  if (language === "JavaScript") {
    if (currentSkill <= 2) {
      milestones = [
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
          notes: [],
          estimatedTime: "2-3 weeks"
        },
        {
          title: "DOM Manipulation",
          description: "Learn how to interact with HTML using JavaScript by manipulating the Document Object Model.",
          skills: ["DOM Selection", "Event Handling", "DOM Traversal", "DOM Manipulation"],
          resources: [
            {
              title: "DOM Manipulation - JavaScript.info",
              url: "https://javascript.info/document",
              type: "documentation",
              description: "Comprehensive guide on working with the Document Object Model."
            },
            {
              title: "JavaScript DOM Manipulation Course",
              url: "https://www.udemy.com/course/javascript-dom-manipulation/",
              type: "course",
              description: "Hands-on course covering all aspects of DOM manipulation."
            },
            {
              title: "DOM Manipulation in JavaScript",
              url: "https://www.youtube.com/watch?v=y17RuWkWdn8",
              type: "video",
              description: "Visual guide to DOM manipulation techniques."
            }
          ],
          videoSuggestions: [
            {
              title: "JavaScript DOM Manipulation – Full Course for Beginners",
              url: "https://www.youtube.com/watch?v=5fb2aPlgoys",
              thumbnail: "https://i.ytimg.com/vi/5fb2aPlgoys/mqdefault.jpg",
              duration: "3:38:45",
              source: "freeCodeCamp.org"
            },
            {
              title: "JavaScript DOM Traversal Made Easy",
              url: "https://www.youtube.com/watch?v=v7rSSy8CaYE",
              thumbnail: "https://i.ytimg.com/vi/v7rSSy8CaYE/mqdefault.jpg",
              duration: "12:45",
              source: "Web Dev Simplified"
            }
          ],
          exercises: [
            {
              title: "Element Selector",
              description: "Practice selecting and modifying elements from an HTML page.",
              difficulty: "easy"
            },
            {
              title: "Event Listener Workshop",
              description: "Create various event listeners to respond to user interactions.",
              difficulty: "medium"
            },
            {
              title: "Dynamic Content Creator",
              description: "Build a script that dynamically creates and modifies page content.",
              difficulty: "medium"
            }
          ],
          notes: [],
          estimatedTime: "2-3 weeks"
        },
        {
          title: "Asynchronous JavaScript",
          description: "Master asynchronous programming concepts including callbacks, promises, and async/await.",
          skills: ["Callbacks", "Promises", "Async/Await", "Fetch API"],
          resources: [
            {
              title: "Asynchronous JavaScript - MDN",
              url: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous",
              type: "documentation",
              description: "Official Mozilla guide to asynchronous JavaScript concepts."
            },
            {
              title: "JavaScript Promises, Async/Await - freeCodeCamp",
              url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/",
              type: "course",
              description: "Interactive lessons on promises and async functions."
            },
            {
              title: "Asynchronous JavaScript Tutorial",
              url: "https://www.youtube.com/watch?v=PoRJizFvM7s",
              type: "video",
              description: "Comprehensive video on handling asynchronous operations."
            }
          ],
          videoSuggestions: [
            {
              title: "Async JavaScript Crash Course - Callbacks, Promises, Async Await",
              url: "https://www.youtube.com/watch?v=PoRJizFvM7s",
              thumbnail: "https://i.ytimg.com/vi/PoRJizFvM7s/mqdefault.jpg",
              duration: "38:52",
              source: "Traversy Media"
            },
            {
              title: "JavaScript Promises In 10 Minutes",
              url: "https://www.youtube.com/watch?v=DHvZLI7Db8E",
              thumbnail: "https://i.ytimg.com/vi/DHvZLI7Db8E/mqdefault.jpg",
              duration: "10:25",
              source: "Web Dev Simplified"
            }
          ],
          exercises: [
            {
              title: "Promise Chain",
              description: "Create a series of promises that depend on each other's results.",
              difficulty: "medium"
            },
            {
              title: "Async Data Fetcher",
              description: "Build an application that fetches and displays data from an API.",
              difficulty: "medium"
            },
            {
              title: "Error Handler",
              description: "Implement proper error handling in asynchronous code.",
              difficulty: "hard"
            }
          ],
          notes: [],
          estimatedTime: "3-4 weeks"
        },
        {
          title: "Project: Interactive Web Application",
          description: "Apply your JavaScript knowledge by building a complete interactive web application.",
          skills: ["Project Planning", "Application Architecture", "Debugging", "Performance Optimization"],
          resources: [
            {
              title: "JavaScript Project Structure Best Practices",
              url: "https://github.com/elsewhencode/project-guidelines",
              type: "article",
              description: "Guidelines for structuring JavaScript projects."
            },
            {
              title: "Building a JavaScript Application From Scratch",
              url: "https://www.udemy.com/course/javascript-web-projects/",
              type: "course",
              description: "Step-by-step guide to building complete web applications."
            },
            {
              title: "JavaScript Debugging Techniques",
              url: "https://www.youtube.com/watch?v=H0XScE08hy8",
              type: "video",
              description: "Essential debugging strategies for JavaScript developers."
            }
          ],
          videoSuggestions: [
            {
              title: "Build 15 JavaScript Projects - Vanilla JavaScript Course",
              url: "https://www.youtube.com/watch?v=3PHXvlpOkf4",
              thumbnail: "https://i.ytimg.com/vi/3PHXvlpOkf4/mqdefault.jpg",
              duration: "8:18:29",
              source: "freeCodeCamp.org"
            },
            {
              title: "How to Plan a JavaScript Project",
              url: "https://www.youtube.com/watch?v=lGnG-yrWQvk",
              thumbnail: "https://i.ytimg.com/vi/lGnG-yrWQvk/mqdefault.jpg",
              duration: "14:37",
              source: "Coding Garden"
            }
          ],
          exercises: [
            {
              title: "Project Wireframing",
              description: "Create a detailed plan and wireframe for your web application.",
              difficulty: "easy"
            },
            {
              title: "Basic Application Setup",
              description: "Set up the project structure and implement core functionality.",
              difficulty: "medium"
            },
            {
              title: "Complete Interactive Application",
              description: "Finish your application with all planned features and polish the user experience.",
              difficulty: "hard"
            }
          ],
          notes: [],
          estimatedTime: "4-6 weeks"
        }
      ];
    } else {
      // Advanced JavaScript milestones
      milestones = [
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
          notes: [],
          estimatedTime: "3-4 weeks"
        },
        // More advanced milestones would follow
      ];
    }
  } else if (language === "Python") {
    if (currentSkill <= 2) {
      milestones = [
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
          notes: [],
          estimatedTime: "2-3 weeks"
        },
        // More Python milestones would follow
      ];
    }
    // More advanced Python milestones would go here
  } else {
    // Generic milestones for other languages
    if (currentSkill <= 2) {
      milestones = [
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
            },
            {
              title: `${language} Beginner Course`,
              url: "#",
              type: "course",
              description: `Comprehensive introduction to ${language}.`
            },
            {
              title: `${language} Crash Course`,
              url: "#",
              type: "video",
              description: `Quick introduction to ${language} fundamentals.`
            }
          ],
          videoSuggestions: [
            {
              title: `${language} Programming Course for Beginners`,
              url: "#",
              thumbnail: "",
              duration: "1:30:00",
              source: "Learning Platform"
            },
            {
              title: `${language} Tutorial: Basic Concepts`,
              url: "#",
              thumbnail: "",
              duration: "45:22",
              source: "Programming Mentor"
            }
          ],
          exercises: [
            {
              title: "Syntax Practice",
              description: `Write basic programs using ${language} syntax.`,
              difficulty: "easy"
            },
            {
              title: "Logic Implementation",
              description: `Implement simple algorithms in ${language}.`,
              difficulty: "medium"
            },
            {
              title: "Function Workshop",
              description: `Create reusable functions to solve various problems.`,
              difficulty: "medium"
            }
          ],
          notes: [],
          estimatedTime: "2-3 weeks"
        },
        // More generic milestones would follow
      ];
    }
    // More advanced generic milestones would go here
  }
  
  // For demo purposes, ensure we have at least 4 milestones
  while (milestones.length < 4) {
    const index = milestones.length + 1;
    milestones.push({
      title: `${language} Advanced Topic ${index}`,
      description: `Explore advanced concepts and techniques in ${language}.`,
      skills: ["Advanced Concept 1", "Advanced Concept 2", "Advanced Concept 3"],
      resources: [
        {
          title: `${language} Advanced Documentation`,
          url: "#",
          type: "documentation",
          description: `Detailed guide on advanced ${language} features.`
        },
        {
          title: `Advanced ${language} Course`,
          url: "#",
          type: "course",
          description: `In-depth course on ${language} mastery.`
        },
        {
          title: `${language} Deep Dive`,
          url: "#",
          type: "video",
          description: `Detailed video series on advanced ${language} topics.`
        }
      ],
      videoSuggestions: [
        {
          title: `Advanced ${language} Techniques`,
          url: "#",
          thumbnail: "",
          duration: "1:15:00",
          source: "Expert Academy"
        },
        {
          title: `${language} Performance Optimization`,
          url: "#",
          thumbnail: "",
          duration: "52:18",
          source: "Pro Coder Channel"
        }
      ],
      exercises: [
        {
          title: "Advanced Challenge 1",
          description: `Apply advanced ${language} concepts to solve a complex problem.`,
          difficulty: "medium"
        },
        {
          title: "Advanced Project",
          description: `Build a sophisticated application using ${language}.`,
          difficulty: "hard"
        }
      ],
      notes: [],
      estimatedTime: "3-4 weeks"
    });
  }
  
  return milestones;
}
