import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const ApplicationSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-2xl mx-auto p-6 text-center space-y-6">
      <h1 className="text-3xl font-bold">Application Submitted!</h1>
      <p className="text-gray-500">
        Thank you for applying to be a service provider. We will review your application
        and contact you soon to schedule an interview.
      </p>
      <Button onClick={() => navigate("/")}>Return to Home</Button>
    </div>
  );
};

export default ApplicationSuccess;