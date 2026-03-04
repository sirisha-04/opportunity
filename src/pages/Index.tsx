import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Opportunity {
  id: number;
  title: string;
  description: string;
  required_skills: string[];
  duration: string;
  location: string;
  status: "open" | "closed";
}

const sampleOpportunities: Opportunity[] = [
  {
    id: 1,
    title: "Website Redesign for Local Shelter",
    description:
      "Help us redesign our website to improve our online presence and reach more potential adopters.",
    required_skills: ["Web Development", "UI/UX Design"],
    duration: "2-3 weeks",
    location: "New York, NY",
    status: "open",
  },
  {
    id: 2,
    title: "Translation of Educational Materials",
    description:
      "Translate educational materials from English to Spanish, French, or Arabic to support our global literacy programs.",
    required_skills: ["Translation", "Language Skills"],
    duration: "Ongoing",
    location: "Remote",
    status: "open",
  },
  {
    id: 3,
    title: "Fundraising Gala Event Coordinator",
    description:
      "Help plan and coordinate our annual fundraising gala to support children's medical research.",
    required_skills: ["Event Planning", "Marketing"],
    duration: "3 months",
    location: "Chicago, IL",
    status: "closed",
  },
];

const Index = () => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>(sampleOpportunities);
  const [activeTab, setActiveTab] = useState("all");

  const openCount = opportunities.filter((o) => o.status === "open").length;
  const closedCount = opportunities.filter((o) => o.status === "closed").length;

  const filtered =
    activeTab === "all"
      ? opportunities
      : opportunities.filter((o) => o.status === activeTab);

  const handleDelete = (id: number) => {
    const opp = opportunities.find((o) => o.id === id);
    setOpportunities((prev) => prev.filter((o) => o.id !== id));
    toast({
      title: "Opportunity Deleted",
      description: `"${opp?.title}" has been removed.`,
    });
  };

  const handleEdit = (id: number) => {
    // Navigate to edit page when implemented
    toast({
      title: "Edit",
      description: `Edit page for opportunity #${id} coming soon.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card px-6 py-4">
        <div className="mx-auto flex max-w-5xl items-center gap-4">
          <h1 className="text-xl font-bold text-foreground">SkillBridge</h1>
          <nav className="ml-4 flex gap-4 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Opportunities</span>
            <span>Applications</span>
            <span>Messages</span>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-foreground">Your Opportunities</h2>
            <p className="text-sm text-muted-foreground">Manage your volunteering opportunities</p>
          </div>
          <Link to="/opportunities/create">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create New Opportunity
            </Button>
          </Link>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All ({opportunities.length})</TabsTrigger>
            <TabsTrigger value="open">Open ({openCount})</TabsTrigger>
            <TabsTrigger value="closed">Closed ({closedCount})</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-4">
            {filtered.length === 0 ? (
              <div className="rounded-lg border border-border bg-card p-12 text-center">
                <p className="text-muted-foreground">No opportunities found.</p>
                <Link to="/opportunities/create">
                  <Button variant="outline" className="mt-4">
                    Create your first opportunity
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="rounded-lg border border-border bg-card overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[220px]">Opportunity</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="hidden md:table-cell">Skills</TableHead>
                      <TableHead className="hidden lg:table-cell">Location</TableHead>
                      <TableHead className="hidden lg:table-cell">Duration</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.map((opp) => (
                      <TableRow key={opp.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium text-foreground">{opp.title}</p>
                            <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                              {opp.description}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={opp.status === "open" ? "default" : "secondary"}
                            className={
                              opp.status === "open"
                                ? "bg-accent text-accent-foreground"
                                : ""
                            }
                          >
                            {opp.status === "open" ? "Open" : "Closed"}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div className="flex flex-wrap gap-1">
                            {opp.required_skills.map((skill) => (
                              <Badge key={skill} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                          {opp.location}
                        </TableCell>
                        <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                          {opp.duration}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEdit(opp.id)}
                              aria-label={`Edit ${opp.title}`}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>

                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  aria-label={`Delete ${opp.title}`}
                                >
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Opportunity</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete "{opp.title}"? This action
                                    cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDelete(opp.id)}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
