import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Star } from "lucide-react";

interface Review {
  id: string;
  rating: number;
  comment: string | null;
  created_at: string;
  profiles: {
    full_name: string | null;
    avatar_url: string | null;
  } | null;
}

export default function Reviews() {
  const { data: reviews, isLoading, isError, error } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select(`
          id,
          rating,
          comment,
          created_at,
          profiles:profiles!provider_id(
            full_name,
            avatar_url
          )
        `)
        .order("created_at", { ascending: false })
        .returns<Review[]>();
    
      if (error) {
        console.error("Error fetching reviews:", error);
        throw new Error(error.message || "Failed to fetch reviews");
      }
    
      return data;
    },      
  });

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <Star
          key={index}
          className={`h-4 w-4 ${index < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-400"}`}
        />
      ));
  };

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">Failed to load reviews: {error instanceof Error ? error.message : "Unknown error"}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center">Customer Reviews</h1>
        {reviews?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <Card key={review.id} className="p-6 bg-card">
                <div className="flex items-center mb-4">
                  <Avatar className="h-10 w-10 mr-4">
                    <img
                      src={review.profiles?.avatar_url || "/placeholder.svg"}
                      alt={review.profiles?.full_name || "User"}
                      className="rounded-full"
                    />
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{review.profiles?.full_name || "Anonymous User"}</h3>
                    <div className="flex mt-1">{renderStars(review.rating)}</div>
                  </div>
                </div>
                <p className="text-gray-400">{review.comment || "No comments provided."}</p>
                <div className="mt-4 text-sm text-gray-500">
                  {new Date(review.created_at).toLocaleDateString()}
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No reviews available yet.</p>
        )}
      </div>
    </div>
  );
}
