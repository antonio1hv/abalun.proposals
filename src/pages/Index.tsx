import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

const Index = () => {
  const proposals = [
    { id: 1, title: "Website Redesign Proposal", client: "Acme Corp", status: "Pending", date: "2024-02-20" },
    { id: 2, title: "Marketing Campaign", client: "TechStart", status: "Accepted", date: "2024-02-19" },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl animate-fadeIn">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-semibold">Proposals</h1>
          <p className="text-muted-foreground mt-1">Manage and track your client proposals</p>
        </div>
        <Button className="slide-up">
          <PlusCircle className="mr-2 h-4 w-4" />
          New Proposal
        </Button>
      </div>

      <div className="glass-panel rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-4 font-medium text-muted-foreground">Title</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Client</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Date</th>
                <th className="text-right p-4 font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {proposals.map((proposal) => (
                <tr key={proposal.id} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                  <td className="p-4">
                    <Link to={`/proposal/${proposal.id}`} className="hover:text-primary transition-colors">
                      {proposal.title}
                    </Link>
                  </td>
                  <td className="p-4">{proposal.client}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      proposal.status === "Accepted" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {proposal.status}
                    </span>
                  </td>
                  <td className="p-4">{proposal.date}</td>
                  <td className="p-4 text-right">
                    <Link
                      to={`/proposal/${proposal.id}`}
                      className="text-sm text-primary hover:text-primary/80 transition-colors"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Index;