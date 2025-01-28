import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, X, FileText, Printer } from "lucide-react";
import { AcceptDialog } from "@/components/AcceptDialog";
import { DeclineDialog } from "@/components/DeclineDialog";
import { useToast } from "@/hooks/use-toast";

const ProposalView = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [showAcceptDialog, setShowAcceptDialog] = useState(false);
  const [showDeclineDialog, setShowDeclineDialog] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handlePDF = () => {
    toast({
      title: "Generating PDF",
      description: "Your PDF is being generated and will download shortly.",
    });
    // PDF generation logic would go here
  };

  return (
    <div className="min-h-screen bg-background animate-fadeIn">
      <div className="fixed top-0 left-0 right-0 z-10 bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4 max-w-5xl">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">Proposal #{id}</h1>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAcceptDialog(true)}
                className="slide-up"
              >
                <Check className="mr-2 h-4 w-4" />
                Accept
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowDeclineDialog(true)}
                className="slide-up"
              >
                <X className="mr-2 h-4 w-4" />
                Decline
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handlePDF}
                className="slide-up"
              >
                <FileText className="mr-2 h-4 w-4" />
                PDF
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrint}
                className="slide-up"
              >
                <Printer className="mr-2 h-4 w-4" />
                Print
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-24 max-w-5xl">
        <div className="glass-panel rounded-lg p-8">
          <div className="prose max-w-none">
            <h2>Website Redesign Proposal</h2>
            <p className="text-muted-foreground">Prepared for Acme Corporation</p>
            <hr className="my-8" />
            <h3>Project Overview</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
              ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat.
            </p>
            {/* Add more proposal content here */}
          </div>
        </div>
      </div>

      <AcceptDialog open={showAcceptDialog} onOpenChange={setShowAcceptDialog} />
      <DeclineDialog open={showDeclineDialog} onOpenChange={setShowDeclineDialog} />
    </div>
  );
};

export default ProposalView;