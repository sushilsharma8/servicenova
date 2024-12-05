import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const FeatureItem = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="flex gap-3 items-start">
    {icon}
    <div>
      <h3 className="text-white text-sm font-semibold mb-1">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  </div>
);

const TestimonialCard = ({ quote, author, role }: { quote: string; author: string; role: string }) => (
  <div className="bg-card p-4 rounded-lg mb-4">
    <div className="flex gap-1 text-accent mb-2">
      ★★★★★
    </div>
    <p className="text-gray-300 text-sm mb-3">"{quote}"</p>
    <div>
      <p className="text-white text-sm font-semibold">{author}</p>
      <p className="text-gray-400 text-xs">{role}</p>
    </div>
  </div>
);

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-white">
      <div className="container max-w-3xl mx-auto px-4 py-8 space-y-16">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold">
            Elevate Your Event
          </h1>
          <p className="text-2xl font-semibold">
            <span className="text-accent">Professional Staff,</span><br />
            <span className="text-accent">Exceptional Service</span>
          </p>
          <p className="text-gray-400">
            Find skilled bartenders, chefs, and F&B staff for your next event in just a few clicks.
          </p>
          <div className="flex flex-col gap-3 max-w-xs mx-auto">
            <Button 
              className="w-full bg-accent text-black hover:bg-accent/90"
              onClick={() => navigate("/create-event")}
            >
              I'm Hosting an Event
            </Button>
            <Button 
              variant="outline" 
              className="w-full border-accent text-accent hover:bg-accent hover:text-black"
              onClick={() => navigate("/provider-profile")}
            >
              I'm a Service Provider
            </Button>
            <button className="text-gray-400 text-sm flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Request a Call Back
            </button>
          </div>
        </div>

        {/* For Event Hosts Section */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">For Event Hosts</h2>
          <div className="space-y-6">
            <FeatureItem
              icon={<svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>}
              title="Easy Planning"
              description="Plan your perfect event by providing essential details."
            />
            <FeatureItem
              icon={<svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>}
              title="Perfect Matches"
              description="Match with skilled professionals who fit your requirements."
            />
            <FeatureItem
              icon={<svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>}
              title="Hassle-free Booking"
              description="Simple confirmation and payment process."
            />
          </div>
        </div>

        {/* For Service Providers Section */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">For Service Providers</h2>
          <div className="space-y-6">
            <FeatureItem
              icon={<svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>}
              title="Showcase Your Skills"
              description="Present your expertise to the right audience."
            />
            <FeatureItem
              icon={<svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>}
              title="Flexible Schedule"
              description="Accept opportunities that match your availability."
            />
            <FeatureItem
              icon={<svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>}
              title="Grow Your Career"
              description="Build your reputation and expand your network."
            />
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">What People Say</h2>
          <div>
            <TestimonialCard
              quote="The quality of service providers exceeded our expectations. Our event was flawless!"
              author="Sarah Mitchell"
              role="Event Organizer"
            />
            <TestimonialCard
              quote="As a chef, this platform has connected me with amazing opportunities. Highly recommended!"
              author="James Chen"
              role="Professional Chef"
            />
            <TestimonialCard
              quote="Streamlined booking process and exceptional staff. Will definitely use again!"
              author="Michael Rodriguez"
              role="Corporate Event Manager"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;