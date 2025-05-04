
import { Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted py-8 border-t">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-gradient-to-br from-voyage-500 to-insight-600 flex items-center justify-center">
                <span className="text-white text-xs font-bold">CV</span>
              </div>
              <span className="font-bold">Code Voyage</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Your AI mentor for mastering programming
            </p>
          </div>
          
          <div className="flex gap-8 text-sm">
            <div>
              <h4 className="font-medium mb-2">Site</h4>
              <ul className="space-y-1">
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Home</a></li>
                <li><a href="#user-form" className="text-muted-foreground hover:text-foreground">Create Roadmap</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Resources</h4>
              <ul className="space-y-1">
                <li><a href="#" className="text-muted-foreground hover:text-foreground">Documentation</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-foreground">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Connect</h4>
              <ul className="space-y-1">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground flex items-center gap-1">
                    <Github className="h-4 w-4" />
                    <span>GitHub</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Code Voyage. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
