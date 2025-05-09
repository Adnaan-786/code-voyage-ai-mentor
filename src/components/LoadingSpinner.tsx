
import { Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  size?: number;
  message?: string;
}

const LoadingSpinner = ({ 
  size = 24, 
  message = "Loading..." 
}: LoadingSpinnerProps) => {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <Loader2 className="animate-spin" size={size} />
      <p className="mt-2 text-sm text-muted-foreground">{message}</p>
    </div>
  );
};

export default LoadingSpinner;
