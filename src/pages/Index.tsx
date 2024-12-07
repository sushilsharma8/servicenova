import { Button } from "@/components/ui/button";
import { CalendarDays, Users, CheckCircle, Star, ChefHat, Calendar, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 space-y-8">
        <div className="space-y-4 max-w-2xl animate-fade-in">
          <h1 className="text-5xl font-bold">
            Elevate Your Event
          </h1>
          <h2 className="text-3xl font-semibold text-accent">
            Professional Staff, Exceptional Service
          </h2>
          <p className="text-lg text-gray-400">
            Find skilled bartenders, chefs, and F&B staff for your next event in just a few clicks.
          </p>
          <div className="flex gap-4 pt-4">
            <Button 
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90"
              onClick={() => navigate("/create-event")}
            >
              I'm Hosting an Event
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => navigate("/provider-application")}
            >
              I'm a Service Provider
            </Button>
          </div>
          <Button 
            variant="ghost" 
            className="flex items-center gap-2"
            onClick={() => navigate("/callback-request")}
          >
            <CalendarDays className="w-4 h-4" />
            Request a Call Back
          </Button>
        </div>

        {/* For Event Hosts Section */}
        <div className="py-16 space-y-8">
          <h3 className="text-2xl font-semibold">For Event Hosts</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <Users className="w-8 h-8 text-accent" />
              <h4 className="text-xl font-semibold">Easy Planning</h4>
              <p className="text-gray-400">Plan your perfect event by providing essential details.</p>
            </div>
            <div className="space-y-4">
              <CheckCircle className="w-8 h-8 text-accent" />
              <h4 className="text-xl font-semibold">Perfect Matches</h4>
              <p className="text-gray-400">Match with skilled professionals who fit your requirements.</p>
            </div>
            <div className="space-y-4">
              <Calendar className="w-8 h-8 text-accent" />
              <h4 className="text-xl font-semibold">Hassle-free Booking</h4>
              <p className="text-gray-400">Simple confirmation and payment process.</p>
            </div>
          </div>
        </div>

        {/* For Service Providers Section */}
        <div className="py-16 space-y-8">
          <h3 className="text-2xl font-semibold">For Service Providers</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <ChefHat className="w-8 h-8 text-accent" />
              <h4 className="text-xl font-semibold">Showcase Your Skills</h4>
              <p className="text-gray-400">Present your expertise to the right audience.</p>
            </div>
            <div className="space-y-4">
              <Calendar className="w-8 h-8 text-accent" />
              <h4 className="text-xl font-semibold">Flexible Schedule</h4>
              <p className="text-gray-400">Accept opportunities that match your availability.</p>
            </div>
            <div className="space-y-4">
              <TrendingUp className="w-8 h-8 text-accent" />
              <h4 className="text-xl font-semibold">Grow Your Career</h4>
              <p className="text-gray-400">Build your reputation and expand your network.</p>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="py-16 space-y-8">
          <h3 className="text-2xl font-semibold">What People Say</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg space-y-4">
              <div className="flex text-accent">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-gray-400">"The quality of service providers exceeded our expectations. Our event was flawless."</p>
              <div>
                <p className="font-semibold">Sarah Mitchell</p>
                <p className="text-sm text-gray-400">Event Organizer</p>
              </div>
            </div>
            <div className="bg-card p-6 rounded-lg space-y-4">
              <div className="flex text-accent">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-gray-400">"As a chef, this platform has connected me with amazing opportunities. Highly recommended!"</p>
              <div>
                <p className="font-semibold">James Chen</p>
                <p className="text-sm text-gray-400">Professional Chef</p>
              </div>
            </div>
            <div className="bg-card p-6 rounded-lg space-y-4">
              <div className="flex text-accent">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-gray-400">"Streamlined booking process and exceptional staff. Will definitely use again!"</p>
              <div>
                <p className="font-semibold">Michael Rodriguez</p>
                <p className="text-sm text-gray-400">Corporate Event Manager</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}