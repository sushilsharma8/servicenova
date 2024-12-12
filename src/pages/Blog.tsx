import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, User } from "lucide-react";

const blogPosts = [
  {
    title: "Essential Tips for Planning Your F&B Event",
    author: "Sarah Johnson",
    date: "March 15, 2024",
    description: "Learn the key factors that make food and beverage events successful, from menu planning to staff coordination.",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3"
  },
  {
    title: "Trends in Corporate Catering for 2024",
    author: "Michael Chen",
    date: "March 10, 2024",
    description: "Discover the latest trends shaping corporate events and how to incorporate them into your planning.",
    image: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?ixlib=rb-4.0.3"
  },
  {
    title: "Sustainable Practices in Event Catering",
    author: "Emma Wilson",
    date: "March 5, 2024",
    description: "Explore eco-friendly approaches to event catering and how they can benefit your business.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3"
  }
];

export default function Blog() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">F&B Connect Blog</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Stay updated with the latest insights, tips, and trends in the food and beverage service industry.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <Card key={index} className="bg-card hover:bg-card/90 transition-colors">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <CardHeader>
                <CardTitle className="text-xl">{post.title}</CardTitle>
                <CardDescription>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {post.author}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.date}
                    </span>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400 mb-4">{post.description}</p>
                <Button variant="outline" className="w-full">
                  Read More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}