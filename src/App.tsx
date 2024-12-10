import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import ProviderDashboard from "./pages/ProviderDashboard";
import ProviderApplication from "./pages/ProviderApplication";
import EditProviderProfile from "./pages/EditProviderProfile";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Toaster />
        <Routes>
          <Route path="/provider/dashboard" element={<ProviderDashboard />} />
          <Route path="/provider/application" element={<ProviderApplication />} />
          <Route path="/provider/profile/edit" element={<EditProviderProfile />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;