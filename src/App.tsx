import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Navigation } from "@/components/layout/Navigation";
import Index from "./pages/Index";
import Login from "./pages/Login";
import SuccessPage from "./components/SuccessPage";
import CreateEvent from "./pages/CreateEvent";
import ProviderApplication from "./pages/ProviderApplication";
import EditProviderProfile from "./pages/EditProviderProfile";
import ApplicationSuccess from "./pages/ApplicationSuccess";
import AdminReview from "./pages/AdminReview";
import ProviderDashboard from "./pages/ProviderDashboard";
import AdminDashboard from "./pages/admin/Dashboard";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import AboutUs from "./pages/AboutUs";
import FAQ from "./pages/FAQ";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Reviews from "./pages/Reviews";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children, role }: { children: React.ReactNode, role?: string }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
      if (session) {
        checkUserRole();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkUserRole = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: providers } = await supabase
        .from('provider_applications')
        .select('id')
        .eq('user_id', user.id)
        .eq('status', 'approved');

      if (providers && providers.length > 0) {
        setUserRole('provider');
        return;
      }

      setUserRole('admin');
      
    } catch (error) {
      console.error('Error checking user role:', error);
      setUserRole('client');
    }
  };

  if (isAuthenticated === null || (role && userRole === null)) {
    return <div>Loading...</div>;
  }

  if (role && userRole !== role) {
    return <Navigate to="/" replace />;
  }

  return isAuthenticated ? (
    <>
      <Navigation />
      {children}
    </>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? (
    <Navigate to="/" replace />
  ) : (
    children
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Index />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/reviews" element={<Reviews />} />
          
          {/* Login route */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          {/* Protected routes */}     
          <Route
            path="/success"
            element={
              <ProtectedRoute>
                <SuccessPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create/event"
            element={
              <ProtectedRoute>
                <CreateEvent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/provider/application"
            element={
              <ProtectedRoute>
                <ProviderApplication />
              </ProtectedRoute>
            }
          />
          <Route
            path="/provider/profile/edit"
            element={
              <ProtectedRoute>
                <EditProviderProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/application-success"
            element={
              <ProtectedRoute>
                <ApplicationSuccess />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/applications"
            element={
              <ProtectedRoute role="admin">
                <AdminReview />
              </ProtectedRoute>
            }
          />
          <Route
            path="/provider/dashboard"
            element={
              <ProtectedRoute>
                <ProviderDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/contact"
            element={
              <ProtectedRoute>
                <Contact />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;