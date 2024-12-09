import { useState, useEffect } from "react";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Shield, Calendar, Users, UserRound, Home } from "lucide-react";

type UserRole = 'admin' | 'provider' | 'client' | null;

export const Navigation = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState<UserRole>(() => {
    // Initialize from localStorage if available
    const cachedRole = localStorage.getItem('userRole');
    return (cachedRole as UserRole) || null;
  });

  useEffect(() => {
    checkUserRole();

    // Subscribe to auth changes to update role when needed
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') {
        setUserRole(null);
        localStorage.removeItem('userRole');
      } else if (event === 'SIGNED_IN') {
        checkUserRole();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const checkUserRole = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setUserRole(null);
        localStorage.removeItem('userRole');
        return;
      }

      const { data: providers } = await supabase
        .from('provider_applications')
        .select('id')
        .eq('user_id', user.id)
        .eq('status', 'approved');

      let newRole: UserRole;
      if (providers && providers.length > 0) {
        newRole = 'provider';
      } else if (import.meta.env.DEV || await checkIsAdmin()) {
        newRole = 'admin';
      } else {
        newRole = 'client';
      }

      // Update state and cache
      setUserRole(newRole);
      localStorage.setItem('userRole', newRole);
      
    } catch (error) {
      console.error('Error checking user role:', error);
      setUserRole('client');
      localStorage.setItem('userRole', 'client');
    }
  };

  const checkIsAdmin = async () => {
    try {
      const { data, error } = await supabase.rpc('is_admin');
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error checking admin status:', error);
      return false;
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('userRole');
    navigate("/login");
  };

  return (
    <header className="w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                onClick={() => navigate("/")}
              >
                <Home className="mr-2 h-4 w-4" />
                Home
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* Admin Navigation */}
            {userRole === 'admin' && (
              <>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                    onClick={() => navigate("/admin/dashboard")}
                  >
                    <Shield className="mr-2 h-4 w-4" />
                    Admin Dashboard
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                    onClick={() => navigate("/admin/applications")}
                  >
                    <Users className="mr-2 h-4 w-4" />
                    Provider Applications
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </>
            )}

            {/* Provider Navigation */}
            {userRole === 'provider' && (
              <>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                    onClick={() => navigate("/provider/dashboard")}
                  >
                    <UserRound className="mr-2 h-4 w-4" />
                    Provider Dashboard
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </>
            )}

            {/* Client Navigation */}
            {(userRole === 'client' || !userRole) && (
              <>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                    onClick={() => navigate("/create-event")}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    Create Event
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                    onClick={() => navigate("/provider-application")}
                  >
                    <UserRound className="mr-2 h-4 w-4" />
                    Become a Provider
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </>
            )}
          </NavigationMenuList>
        </NavigationMenu>
        <div className="ml-auto">
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};