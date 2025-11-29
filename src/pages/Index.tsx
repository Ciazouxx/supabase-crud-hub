import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, MapPin, Bell, Filter, Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const features = [
    {
      icon: Heart,
      title: "Browse Tasks",
      description: "Discover meaningful volunteer opportunities in your area that match your skills and interests.",
    },
    {
      icon: Users,
      title: "Apply to Help",
      description: "Connect directly with people who need assistance and make a real impact in your community.",
    },
    {
      icon: Bell,
      title: "Real-time Notifications",
      description: "Get instant alerts when someone needs help or when your application is accepted.",
    },
    {
      icon: Filter,
      title: "Smart Filtering",
      description: "Filter opportunities by category, location, time commitment, and skills required.",
    },
    {
      icon: MapPin,
      title: "Location-based",
      description: "Find volunteer opportunities near you and see where you can make a difference.",
    },
    {
      icon: Calendar,
      title: "Flexible Scheduling",
      description: "Choose tasks that fit your schedule and availability, from one-time to recurring commitments.",
    },
  ];

  const steps = [
    {
      number: 1,
      title: "Sign Up",
      description: "Create your free account and tell us about your interests and availability.",
    },
    {
      number: 2,
      title: "Find Tasks",
      description: "Browse volunteer opportunities that match your skills and location.",
    },
    {
      number: 3,
      title: "Help Out",
      description: "Apply to tasks, connect with those in need, and make a difference.",
    },
    {
      number: 4,
      title: "Build Impact",
      description: "Track your contributions and see the positive change you're creating.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-background">
      <Header />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-32 pb-20 text-center">
        <div className="inline-block px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-6">
          <span className="text-sm font-medium text-primary">Powered by Community</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Make a Difference,{" "}
          <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            One Task at a Time
          </span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          Connect volunteers with those who need help. Build stronger communities through meaningful
          action and shared purpose.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button size="lg" asChild className="shadow-lg shadow-primary/20">
            <Link to="/opportunities">
              Get Started <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link to="/opportunities">Learn More</Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mt-20 max-w-4xl mx-auto">
          {[
            { value: "10K+", label: "Volunteers" },
            { value: "25K+", label: "Tasks Completed" },
            { value: "100+", label: "Communities" },
          ].map((stat) => (
            <Card key={stat.label} className="bg-card/50 backdrop-blur border-border/50">
              <CardContent className="pt-6 text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Make an Impact
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Simple, powerful tools to connect volunteers with those who need help most.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card key={feature.title} className="bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition">
              <CardContent className="pt-6">
                <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How It <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Works</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Getting started is simple. Follow these four easy steps to begin making a difference.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="relative mb-4 inline-block">
                <div className="w-20 h-20 rounded-full bg-secondary border-2 border-primary/20 flex items-center justify-center">
                  <div className="text-3xl font-bold text-primary">{step.number}</div>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  {step.number}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>

        <Card className="bg-card/50 backdrop-blur border-border/50 text-center">
          <CardContent className="py-12">
            <h3 className="text-2xl font-bold mb-4">
              Ready to make a difference in your community?
            </h3>
            <Button size="lg" asChild>
              <Link to="/auth">
                Join Now - It's Free
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
