import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Briefcase } from "lucide-react";
import type { ProviderProfile } from "@/types/provider";
import { useNavigate } from "react-router-dom";

interface ProfileOverviewProps {
  userData: ProviderProfile;
}

export const ProfileOverview = ({ userData }: ProfileOverviewProps) => {
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate("/provider/profile/edit");
  };

  return (
    <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-6 rounded-lg">
      <CardHeader>
        <CardTitle className="text-white">Profile Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4">
          <Users className="w-5 h-5 text-[#CCFF00]" />
          <div>
            <div className="text-white">{userData.full_name}</div>
            <div className="text-gray-400 text-sm">
              Service: {userData.service_type}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Briefcase className="w-5 h-5 text-[#CCFF00]" />
          <div>
            <div className="text-white">
              Experience: {userData.years_experience} years
            </div>
            {userData.certifications && userData.certifications.length > 0 && (
              <div className="text-gray-400 text-sm">
                Certifications: {userData.certifications.join(", ")}
              </div>
            )}
          </div>
        </div>
        <Button
          className="bg-[#CCFF00] text-black hover:bg-[#CCFF00]/90 w-full"
          onClick={handleEditProfile}
        >
          Edit Profile
        </Button>
      </CardContent>
    </Card>
  );
};