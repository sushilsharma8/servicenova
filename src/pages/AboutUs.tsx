import { Card, CardContent } from "@/components/ui/card";
import { Award, Users, Target, Sparkles } from "lucide-react";

export default function AboutUs() {
  const values = [
    {
      icon: Award,
      title: "Excellence",
      description: "We strive for excellence in every service connection we facilitate."
    },
    {
      icon: Users,
      title: "Community",
      description: "Building strong relationships between service providers and clients."
    },
    {
      icon: Target,
      title: "Reliability",
      description: "Ensuring dependable and professional service delivery every time."
    },
    {
      icon: Sparkles,
      title: "Innovation",
      description: "Continuously improving our platform to serve you better."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">About F&B Connect</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Connecting exceptional food and beverage service professionals with clients who value quality and reliability.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="bg-card p-6">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-400">
              To revolutionize the F&B service industry by creating seamless connections between skilled professionals and event organizers, ensuring exceptional service delivery for every occasion.
            </p>
          </Card>
          <Card className="bg-card p-6">
            <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
            <p className="text-gray-400">
              To become the leading platform for F&B service professionals and clients, setting new standards for quality, reliability, and professionalism in the industry.
            </p>
          </Card>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-8">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="bg-card p-6 text-center">
                  <Icon className="w-12 h-12 mx-auto mb-4 text-accent" />
                  <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-gray-400">{value.description}</p>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Team Section
        <div>
          <h2 className="text-2xl font-bold text-center mb-8">Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Founder & CEO",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3"
              },
              {
                name: "Michael Chen",
                role: "Head of Operations",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3"
              },
              {
                name: "Emma Wilson",
                role: "Customer Success Manager",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3"
              }
            ].map((member, index) => (
              <Card key={index} className="bg-card overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <CardContent className="text-center p-6">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-gray-400">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
}