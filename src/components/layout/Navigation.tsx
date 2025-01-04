import { useState, useEffect } from "react";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Shield, Calendar, Users, UserRound, Home } from "lucide-react";

const isAdmin = (email: string) => {
  return email === "sushilsharma8oct2001@gmail.com";
};

export const Navigation = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState<'admin' | 'provider' | 'client' | null>(null);

const [adminemail, setadminemail] = useState("")
  

  const checkUserRole = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      console.log("fetching user role", user);
      console.log("fetching user role email", user?.email);
      setadminemail(user?.email);
      if (!user) return;


      const { data: providers } = await supabase
        .from('provider_applications')
        .select('id')
        .eq('user_id', user.id)
        .eq('status', 'approved');


        console.log("providers", providers);
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


  useEffect(() => {
    checkUserRole();

    console.log("adminemail", adminemail);
    console.log("userrole", userRole);
  }, [userRole , adminemail]);

  const handleLogout = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user && isAdmin(user.email)) {

      console.log("result of and" , user && isAdmin(user.email))
      // Perform admin-specific actions
    } else {
      // Perform non-admin actions
    }
    await supabase.auth.signOut();
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
            {adminemail === 'sushilsharma8oct2001@gmail.com' && (
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