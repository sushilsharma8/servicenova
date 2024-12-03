import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Welcome to Event Staff Pro</h1>
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
        </div>
        
        <div className="grid gap-6">
          <div className="p-6 border rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Service Provider</h2>
            <p className="text-gray-600 mb-4">
              Create or manage your service provider profile to start receiving event requests.
            </p>
            <Button onClick={() => navigate("/provider-profile")}>
              Manage Profile
            </Button>
          </div>

          <div className="p-6 border rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Event Organizer</h2>
            <p className="text-gray-600 mb-4">
              Create a new event and find the perfect staff for your needs.
            </p>
            <Button onClick={() => navigate("/create-event")}>
              Create Event
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;