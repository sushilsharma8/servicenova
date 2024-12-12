import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const blogPosts = [
  {
    title: "Essential Tips for Planning Your F&B Event",
    date: "March 15, 2024",
    description: "Learn the key factors that make food and beverage events successful.",
    category: "Planning",
  },
  {
    title: "Trending Food Service Styles for Corporate Events",
    date: "March 10, 2024",
    description: "Discover the latest trends in corporate food service and catering.",
    category: "Trends",
  },
  {
    title: "Sustainable Catering: A Guide for Event Planners",
    date: "March 5, 2024",
    description: "How to make your F&B events more environmentally friendly.",
    category: "Sustainability",
  },
];

const Blog = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-accent">F&B Connect Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post, index) => (
          <Card key={index} className="bg-card hover:bg-card/80 transition-colors">
            <CardHeader>
              <div className="text-sm text-accent mb-2">{post.category}</div>
              <CardTitle className="text-xl mb-2">{post.title}</CardTitle>
              <CardDescription className="text-sm text-gray-400">
                {post.date}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300">{post.description}</p>
              <button className="text-accent mt-4 hover:underline">
                Read more →
              </button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Blog;