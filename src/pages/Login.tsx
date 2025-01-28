import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LogIn } from "lucide-react";

const Login = () => {
  const handleGoogleLogin = () => {
    // This will be implemented later when Supabase is connected
    console.log("Inicio de sesión con Google");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl">Bienvenido de nuevo</CardTitle>
          <CardDescription>
            Inicia sesión para gestionar tus propuestas
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Button
            onClick={handleGoogleLogin}
            variant="outline"
            className="w-full max-w-sm"
          >
            <LogIn className="mr-2 h-4 w-4" />
            Continuar con Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;