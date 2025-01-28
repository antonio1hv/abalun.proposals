import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface DeclineDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeclineDialog({ open, onOpenChange }: DeclineDialogProps) {
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState<number | null>(null);
  const { toast } = useToast();

  const handleSubmit = () => {
    toast({
      title: "Feedback Submitted",
      description: "Thank you for your feedback. We'll use it to improve our services.",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Decline Proposal</DialogTitle>
          <DialogDescription>
            We're sorry to hear you'd like to decline. Please help us improve by
            sharing your feedback.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 mt-4">
          <div>
            <label className="text-sm font-medium mb-2 block">
              How likely are you to recommend our services? (1-10)
            </label>
            <div className="flex gap-2">
              {[...Array(10)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setRating(i + 1)}
                  className={`w-8 h-8 rounded ${
                    rating === i + 1
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary hover:bg-secondary/80"
                  } transition-colors`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">
              What made you decide to decline?
            </label>
            <Textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Please share your thoughts..."
              className="min-h-[100px]"
            />
          </div>
          <Button onClick={handleSubmit}>Submit Feedback</Button>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}