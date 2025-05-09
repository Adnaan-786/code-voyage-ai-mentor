
import { MilestoneNote } from "./Roadmap";
import { Card } from "./ui/card";
import { formatDistanceToNow } from "date-fns";

interface MilestoneNotesProps {
  notes: MilestoneNote[];
}

const MilestoneNotes = ({ notes }: MilestoneNotesProps) => {
  return (
    <div className="space-y-3 mb-4">
      {notes.map((note) => (
        <Card key={note.id} className="p-3 bg-muted/30">
          <p className="text-sm whitespace-pre-wrap">{note.content}</p>
          <div className="flex items-center justify-between mt-1">
            <p className="text-xs text-muted-foreground">
              {new Date(note.createdAt).toLocaleDateString()} at {new Date(note.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
            <p className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(note.createdAt), { addSuffix: true })}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default MilestoneNotes;
