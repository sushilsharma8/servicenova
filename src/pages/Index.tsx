import { Button } from "@/components/ui/button";
import { CalendarDays, Users, CheckCircle, Star, ChefHat, Calendar, TrendingUp, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { testimonials } from "@/data/testimonials";
import { useAuth } from "@/hooks/auth"; // Import the useAuth hook

export default function Index() {
  const navigate = useNavigate();
  const { user } = useAuth(); // Access the user state

  const handleNavigation = (path: string) => {
    if (user) {
      navigate(path);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-[#0A0A0A]" />
          <img
            src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3"
            alt="Elegant event service"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            <div className="space-y-6">
              <h1 className="text-6xl font-bold tracking-tight">
                Elevate Your Event
              </h1>
              <div className="space-y-2">
                <h2 className="text-5xl font-bold bg-gradient-to-r from-[#9FE860] to-[#2AD168] text-transparent bg-clip-text">
                  Professional Staff,
                </h2>
                <h2 className="text-5xl font-bold bg-gradient-to-r from-[#9FE860] to-[#2AD168] text-transparent bg-clip-text">
                  Exceptional Service
                </h2>
              </div>
              <p className="text-xl text-gray-300">
                Find skilled bartenders, chefs, and F&B staff for your next event in just a few clicks.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 justify-center pt-8">
              <Button 
                size="lg" 
                className="bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90 text-lg px-8 flex items-center"
                onClick={() => handleNavigation("/create-event")}
              >
                I'm Hosting an Event
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-[#CCFF00] text-[#CCFF00] hover:bg-[#CCFF00]/10 text-lg px-8"
                onClick={() => handleNavigation("/provider-application")}
              >
                I'm a Service Provider
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-white/10 text-white hover:bg-white/20 text-lg px-8"
                onClick={() => handleNavigation("/contact")}
              >
                Request a Call Back
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - clean design */}
      <section className="py-24 bg-gradient-to-b from-[#0A0A0A] to-[#111]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16">
            <div className="space-y-12">
              <h2 className="text-3xl font-bold text-white">For Event Hosts</h2>
              <div className="space-y-8">
                <FeatureItem 
                  icon={Calendar} 
                  title="Easy Planning"
                  description="Plan your perfect event by providing essential details."
                />
                <FeatureItem 
                  icon={Users} 
                  title="Perfect Matches"
                  description="Match with skilled professionals who fit your requirements."
                />
                <FeatureItem 
                  icon={CheckCircle} 
                  title="Hassle-free Booking"
                  description="Simple confirmation and payment process."
                />
              </div>
            </div>

            <div className="space-y-12">
              <h2 className="text-3xl font-bold text-white">For Service Providers</h2>
              <div className="space-y-8">
                <FeatureItem 
                  icon={Star} 
                  title="Showcase Your Skills"
                  description="Present your expertise to the right audience."
                />
                <FeatureItem 
                  icon={Calendar} 
                  title="Flexible Schedule"
                  description="Accept opportunities that match your availability."
                />
                <FeatureItem 
                  icon={ChefHat} 
                  title="Grow Your Career"
                  description="Build your reputation and expand your network."
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - clean design */}
      <section className="py-24 bg-gradient-to-b from-[#111] to-[#0A0A0A]">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-white mb-16">
            What People Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-white/5 backdrop-blur-lg p-8 rounded-xl ring-1 ring-white/10 transition-all hover:bg-white/10"
              >
                <div className="flex mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="w-5 h-5 text-[#CCFF00]" 
                      fill="#CCFF00" 
                    />
                  ))}
                </div>
                <blockquote className="text-gray-300 mb-6">
                  "{testimonial.quote}"
                </blockquote>
                <div>
                  <div className="font-semibold text-white">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-gray-400">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// Clean FeatureItem component
const FeatureItem = ({ icon: Icon, title, description }) => (
  <div className="flex gap-4">
    <Icon className="w-8 h-8 text-[#CCFF00]" />
    <div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  </div>
);
