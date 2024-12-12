import { Card, CardContent } from "@/components/ui/card";
import { Users, Target, Heart } from "lucide-react";

const AboutUs = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-accent">About F&B Connect</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <Card className="bg-card p-6">
          <CardContent className="space-y-4">
            <Users className="w-12 h-12 text-accent" />
            <h3 className="text-xl font-semibold">Our Mission</h3>
            <p className="text-gray-300">
              To connect event organizers with top-tier F&B service providers, making exceptional event experiences accessible to all.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card p-6">
          <CardContent className="space-y-4">
            <Target className="w-12 h-12 text-accent" />
            <h3 className="text-xl font-semibold">Our Vision</h3>
            <p className="text-gray-300">
              To become the leading platform for F&B event planning, known for quality, reliability, and innovation.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card p-6">
          <CardContent className="space-y-4">
            <Heart className="w-12 h-12 text-accent" />
            <h3 className="text-xl font-semibold">Our Values</h3>
            <p className="text-gray-300">
              Excellence, transparency, and customer satisfaction drive everything we do.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="prose prose-invert max-w-none">
        <h2 className="text-3xl font-semibold mb-6">Our Story</h2>
        <p className="text-gray-300 mb-6">
          F&B Connect was founded with a simple yet powerful idea: to revolutionize how food and beverage services are organized for events. We recognized the challenges faced by event planners in finding reliable service providers, and by talented F&B professionals in reaching their target market.
        </p>
        <p className="text-gray-300">
          Today, we're proud to facilitate connections that create memorable events, support local businesses, and contribute to the vibrant F&B industry. Our platform continues to grow, driven by the success stories of our users and the passionate team behind F&B Connect.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;