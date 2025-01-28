import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { FilePlus } from "lucide-react";

const NewProposal = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [googleDocUrl, setGoogleDocUrl] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically create the new proposal
    toast({
      title: "Proposal created",
      description: "Your new proposal has been created successfully.",
    });
    navigate("/");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl animate-fadeIn">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-semibold">New Proposal</h1>
          <p className="text-muted-foreground mt-1">
            Create a new proposal for your client
          </p>
        </div>
      </div>

      <div className="glass-panel rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter proposal title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="googleDocUrl">Google Doc URL</Label>
            <Input
              id="googleDocUrl"
              value={googleDocUrl}
              onChange={(e) => setGoogleDocUrl(e.target.value)}
              placeholder="Paste your Google Doc URL"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter a brief description"
              className="min-h-[100px]"
            />
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <Button
              variant="outline"
              onClick={() => navigate("/")}
            >
              Cancel
            </Button>
            <Button type="submit">
              <FilePlus className="mr-2 h-4 w-4" />
              Create Proposal
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewProposal;