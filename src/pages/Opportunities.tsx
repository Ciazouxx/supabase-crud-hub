import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { MapPin, Clock, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

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

const Opportunities = () => {
  const navigate = useNavigate();
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    checkSession();
    fetchOpportunities();
  }, []);

  const checkSession = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setSession(session);
  };

  const fetchOpportunities = async () => {
    try {
      const { data, error } = await supabase
        .from("opportunities")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setOpportunities(data || []);
    } catch (error: any) {
      toast.error("Failed to load opportunities");
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (opportunityId: string) => {
    if (!session) {
      toast.error("Please sign in to apply");
      navigate("/auth");
      return;
    }

    try {
      const { error } = await supabase.from("applications").insert({
        opportunity_id: opportunityId,
        user_id: session.user.id,
      });

      if (error) {
        if (error.code === "23505") {
          toast.error("You've already applied to this opportunity");
        } else {
          throw error;
        }
      } else {
        toast.success("Application submitted successfully!");
      }
    } catch (error: any) {
      toast.error("Failed to submit application");
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "Event Safety": "bg-red-500/10 text-red-500 border-red-500/20",
      Education: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      Environment: "bg-green-500/10 text-green-500 border-green-500/20",
    };
    return colors[category] || "bg-primary/10 text-primary border-primary/20";
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Recent <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Opportunities</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            See what people in your community need help with right now.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12">Loading opportunities...</div>
        ) : opportunities.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No opportunities available yet.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {opportunities.map((opp) => (
              <Card key={opp.id} className="border-border/50 hover:border-primary/50 transition">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge className={getCategoryColor(opp.category)}>{opp.category}</Badge>
                  </div>
                  <CardTitle className="flex items-center gap-2">
                    {opp.title} {opp.emoji}
                  </CardTitle>
                  <CardDescription>{opp.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    {opp.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {opp.duration}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    {opp.people_needed} needed
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={() => handleApply(opp.id)}>
                    Apply to Help
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        <div className="text-center">
          <Button variant="outline" size="lg">
            View All Opportunities
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Opportunities;
