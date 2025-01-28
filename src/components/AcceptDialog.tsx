import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface AcceptDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AcceptDialog({ open, onOpenChange }: AcceptDialogProps) {
  const { toast } = useToast();

  const handleAccept = () => {
    toast({
      title: "Proposal Accepted",
      description: "A confirmation email has been sent to your inbox.",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Accept Proposal</DialogTitle>
          <DialogDescription>
            By accepting this proposal, you agree to the terms and conditions
            outlined in the document. A confirmation email will be sent to your
            registered email address.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 mt-4">
          <Button onClick={handleAccept}>
            Confirm Acceptance
          </Button>
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