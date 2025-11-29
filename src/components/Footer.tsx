import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-5 h-5 text-primary" />
              <span className="text-xl font-bold">VolunteerHub</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Connecting volunteers with those who need help. Building stronger
              communities through meaningful action.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Platform</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/opportunities" className="hover:text-foreground transition">
                  Browse Tasks
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-foreground transition">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-foreground transition">
                  Become a Volunteer
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-foreground transition">
                  Request Help
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/" className="hover:text-foreground transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-foreground transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-foreground transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-foreground transition">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          © 2024 VolunteerHub. Made with <Heart className="w-4 h-4 inline text-primary" />{" "}
          for communities everywhere.
        </div>
      </div>
    </footer>
  );
};
