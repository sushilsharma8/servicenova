import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";

const AuthForm = () => {
  return (
    <div className="max-w-md w-full mx-auto p-8 bg-card rounded-lg shadow-lg animate-fade-in">
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">Welcome Back</h1>
          <p className="mt-2 text-lg text-gray-500">
            Sign in to your account to continue
          </p>
        </div>

        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: 'hsl(var(--accent))',
                  brandAccent: 'hsl(var(--accent))',
                  brandButtonText: 'hsl(var(--accent-foreground))',
                  defaultButtonBackground: 'hsl(var(--primary))',
                  defaultButtonBackgroundHover: 'hsl(var(--primary))',
                  inputBackground: 'hsl(0, 0%, 25%)',
                  inputText: '#FFFFFF',
                  inputPlaceholder: 'hsl(0, 0%, 60%)',
                  inputBorder: 'hsl(0, 0%, 30%)',
                  inputBorderHover: 'hsl(0, 0%, 40%)',
                  inputBorderFocus: 'hsl(var(--accent))',
                },
                borderWidths: {
                  buttonBorderWidth: '1px',
                  inputBorderWidth: '1px',
                },
                radii: {
                  borderRadiusButton: '0.5rem',
                  buttonBorderRadius: '0.5rem',
                  inputBorderRadius: '0.5rem',
                },
              },
            },
            className: {
              container: 'space-y-4',
              button: 'bg-accent text-accent-foreground hover:bg-accent/90',
              input: 'bg-[hsl(0,0%,25%)] text-white placeholder:text-gray-400',
              label: 'text-foreground',
            },
          }}
          providers={["google"]}
        />
      </div>
    </div>
  );
};

export default AuthForm;