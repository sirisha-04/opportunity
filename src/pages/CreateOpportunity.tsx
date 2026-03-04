import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Plus, X, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const CreateOpportunity = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [duration, setDuration] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("open");

  const addSkill = () => {
    const trimmed = skillInput.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills([...skills, trimmed]);
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast({ title: "Validation Error", description: "Title is required.", variant: "destructive" });
      return;
    }
    if (!description.trim()) {
      toast({ title: "Validation Error", description: "Description is required.", variant: "destructive" });
      return;
    }
    if (skills.length === 0) {
      toast({ title: "Validation Error", description: "Add at least one required skill.", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);

    try {
      // POST /api/opportunities — connect to your backend here
      // const response = await opportunityService.create({
      //   title: title.trim(),
      //   description: description.trim(),
      //   required_skills: skills,
      //   duration: duration.trim(),
      //   location: location.trim(),
      //   status,
      // });

      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1200));

      toast({
        title: "Opportunity Created",
        description: `"${title}" has been posted successfully.`,
      });

      navigate("/");
    } catch {
      toast({
        title: "Error",
        description: "Failed to create opportunity. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navigation Bar */}
      <header className="border-b border-border bg-card px-6 py-4">
        <div className="mx-auto flex max-w-4xl items-center gap-4">
          <h1 className="text-xl font-bold text-foreground">SkillBridge</h1>
          <span className="text-sm text-muted-foreground">Dashboard</span>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-8">
        {/* Back Button + Page Title */}
        <div className="mb-6 flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={handleCancel} aria-label="Go back">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h2 className="text-2xl font-semibold text-foreground">Create New Opportunity</h2>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Opportunity Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="e.g. Website Redesign"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength={255}
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Provide details about the opportunity"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  maxLength={2000}
                />
              </div>

              {/* Required Skills */}
              <div className="space-y-2">
                <Label htmlFor="skills">Required Skills</Label>
                <div className="flex gap-2">
                  <Input
                    id="skills"
                    placeholder="e.g. Web Development"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  <Button type="button" variant="outline" onClick={addSkill} className="shrink-0">
                    <Plus className="mr-1 h-4 w-4" />
                    Add
                  </Button>
                </div>
                {skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="gap-1 py-1 pl-3 pr-1.5 text-sm">
                        {skill}
                        <button
                          type="button"
                          onClick={() => removeSkill(skill)}
                          className="rounded-full p-0.5 hover:bg-muted"
                          aria-label={`Remove ${skill}`}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              {/* Duration */}
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  placeholder="e.g. 2-3 weeks, Ongoing"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  maxLength={100}
                />
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="e.g. New York, NY, Remote"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  maxLength={100}
                />
              </div>

              {/* Status */}
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t border-border">
                <Button type="button" variant="outline" onClick={handleCancel} disabled={isSubmitting}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default CreateOpportunity;
