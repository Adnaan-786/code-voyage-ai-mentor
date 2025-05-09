
import { Card } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { VideoSuggestion as VideoSuggestionType } from "./Roadmap";

interface VideoSuggestionProps {
  video: VideoSuggestionType;
}

const VideoSuggestion = ({ video }: VideoSuggestionProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <a 
        href={video.url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block"
      >
        <div className="relative pb-[56.25%] bg-muted">
          {video.thumbnail ? (
            <img 
              src={video.thumbnail} 
              alt={video.title} 
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
              <span className="text-gray-500">No thumbnail</span>
            </div>
          )}
          {video.duration && (
            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1 py-0.5 rounded">
              {video.duration}
            </div>
          )}
        </div>
        <div className="p-3">
          <div className="flex justify-between items-start">
            <h5 className="font-medium text-sm line-clamp-2">{video.title}</h5>
            <ExternalLink className="h-3 w-3 flex-shrink-0 text-gray-500 mt-0.5" />
          </div>
          {video.source && (
            <p className="text-xs text-muted-foreground mt-1">{video.source}</p>
          )}
        </div>
      </a>
    </Card>
  );
};

export default VideoSuggestion;
