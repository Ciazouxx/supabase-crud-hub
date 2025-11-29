import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Plus, Trash2, Edit } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Opportunity {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  duration: string;
  people_needed: number;
  emoji: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [myOpportunities, setMyOpportunities] = useState<Opportunity[]>([]);
  const [myApplications, setMyApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Education",
    location: "",
    duration: "",
    people_needed: 1,
    emoji: "🤝",
  });

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/auth");
      return;
    }
    setSession(session);
    fetchMyData(session.user.id);
  };

  const fetchMyData = async (userId: string) => {
    try {
      const [oppsRes, appsRes] = await Promise.all([
        supabase
          .from("opportunities")
          .select("*")
          .eq("created_by", userId)
          .order("created_at", { ascending: false }),
        supabase
          .from("applications")
          .select("*, opportunities(*)")
          .eq("user_id", userId)
          .order("created_at", { ascending: false }),
      ]);

      if (oppsRes.error) throw oppsRes.error;
      if (appsRes.error) throw appsRes.error;

      setMyOpportunities(oppsRes.data || []);
      setMyApplications(appsRes.data || []);
    } catch (error: any) {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) return;

    try {
      if (editingId) {
        const { error } = await supabase
          .from("opportunities")
          .update(formData)
          .eq("id", editingId);
        if (error) throw error;
        toast.success("Opportunity updated!");
      } else {
        const { error } = await supabase.from("opportunities").insert({
          ...formData,
          created_by: session.user.id,
        });
        if (error) throw error;
        toast.success("Opportunity created!");
      }

      setDialogOpen(false);
      resetForm();
      fetchMyData(session.user.id);
    } catch (error: any) {
      toast.error("Failed to save opportunity");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this opportunity?")) return;

    try {
      const { error } = await supabase.from("opportunities").delete().eq("id", id);
      if (error) throw error;
      toast.success("Opportunity deleted");
      fetchMyData(session.user.id);
    } catch (error: any) {
      toast.error("Failed to delete opportunity");
    }
  };

  const handleEdit = (opp: Opportunity) => {
    setFormData({
      title: opp.title,
      description: opp.description,
      category: opp.category,
      location: opp.location,
      duration: opp.duration,
      people_needed: opp.people_needed,
      emoji: opp.emoji,
    });
    setEditingId(opp.id);
    setDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "Education",
      location: "",
      duration: "",
      people_needed: 1,
      emoji: "🤝",
    });
    setEditingId(null);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold">Dashboard</h1>
          <Dialog open={dialogOpen} onOpenChange={(open) => {
            setDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Opportunity
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <form onSubmit={handleSubmit}>
                <DialogHeader>
                  <DialogTitle>{editingId ? "Edit" : "Create"} Opportunity</DialogTitle>
                  <DialogDescription>
                    {editingId ? "Update" : "Fill out"} the details for the volunteer opportunity.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => setFormData({ ...formData, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Education">Education</SelectItem>
                          <SelectItem value="Environment">Environment</SelectItem>
                          <SelectItem value="Event Safety">Event Safety</SelectItem>
                          <SelectItem value="Community">Community</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emoji">Emoji</Label>
                      <Input
                        id="emoji"
                        value={formData.emoji}
                        onChange={(e) => setFormData({ ...formData, emoji: e.target.value })}
                        placeholder="🤝"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration</Label>
                      <Input
                        id="duration"
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        placeholder="3 hours"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="people">People Needed</Label>
                      <Input
                        id="people"
                        type="number"
                        min="1"
                        value={formData.people_needed}
                        onChange={(e) =>
                          setFormData({ ...formData, people_needed: parseInt(e.target.value) })
                        }
                        required
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">{editingId ? "Update" : "Create"} Opportunity</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="opportunities" className="space-y-6">
          <TabsList>
            <TabsTrigger value="opportunities">My Opportunities</TabsTrigger>
            <TabsTrigger value="applications">My Applications</TabsTrigger>
          </TabsList>

          <TabsContent value="opportunities" className="space-y-4">
            {myOpportunities.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center text-muted-foreground">
                  No opportunities created yet. Click "Create Opportunity" to get started!
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {myOpportunities.map((opp) => (
                  <Card key={opp.id}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        {opp.title} {opp.emoji}
                      </CardTitle>
                      <CardDescription>{opp.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="text-sm space-y-1">
                      <p>📍 {opp.location}</p>
                      <p>⏰ {opp.duration}</p>
                      <p>👥 {opp.people_needed} needed</p>
                    </CardContent>
                    <CardFooter className="gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(opp)}>
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(opp.id)}>
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="applications" className="space-y-4">
            {myApplications.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center text-muted-foreground">
                  No applications yet. Browse opportunities to get started!
                </CardContent>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {myApplications.map((app: any) => (
                  <Card key={app.id}>
                    <CardHeader>
                      <CardTitle>
                        {app.opportunities.title} {app.opportunities.emoji}
                      </CardTitle>
                      <CardDescription>{app.opportunities.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="text-sm space-y-1">
                      <p>Status: <span className="font-semibold text-primary">{app.status}</span></p>
                      <p>📍 {app.opportunities.location}</p>
                      <p>⏰ {app.opportunities.duration}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
