
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock, Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useIsMobile } from "@/hooks/use-mobile";

// Define form schema with Zod
const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormValues = z.infer<typeof formSchema>;

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const isMobile = useIsMobile();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: FormValues) {
    try {
      setIsLoading(true);
      await login(values.email, values.password);
      navigate("/dashboard");
    } catch (error) {
      setIsLoading(false);
      // Error already handled in AuthContext
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-100 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-4 animate-fade-in">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <div className={`w-full max-w-4xl shadow-lg overflow-hidden rounded-lg flex ${isMobile ? 'flex-col' : 'flex-row'}`}>
        {/* Image Section */}
        <div className={`${isMobile ? 'w-full' : 'w-1/2'} bg-gradient-to-br from-primary/80 to-blue-600`}>
          <AspectRatio ratio={isMobile ? 16/9 : 3/4} className="h-full">
            <div className="w-full h-full relative">
              <img 
                src="/placeholder.svg" 
                alt="Employee Time Tracking" 
                className="w-full h-full object-cover opacity-90 mix-blend-overlay"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-8">
                <h1 className="text-2xl md:text-3xl font-bold text-white">Track your work hours efficiently</h1>
              </div>
            </div>
          </AspectRatio>
        </div>
        
        {/* Login Form Section */}
        <Card className={`${isMobile ? 'w-full' : 'w-1/2'} border-0 rounded-none dark:bg-gray-800/50 bg-white`}>
          <CardHeader className="space-y-1 pb-2">
            <CardTitle className="text-2xl font-bold text-center">Employee Time Tracking</CardTitle>
            <CardDescription className="text-center">
              Log in to manage your work hours
            </CardDescription>
          </CardHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <FormControl>
                          <Input
                            placeholder="name@example.com"
                            className="pl-9"
                            {...field}
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="••••••••"
                            className="pl-9"
                            {...field}
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Button
                      type="button"
                      variant="link"
                      className="px-0 text-sm text-primary hover:text-primary/90"
                    >
                      Forgot password?
                    </Button>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="pt-0">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign in"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Form>
          
          <div className="px-8 pb-6 text-center text-sm">
            <div className="mt-2 text-xs text-muted-foreground">
              <p>Demo credentials:</p>
              <p>Admin: admin@example.com / password</p>
              <p>Employee: employee@example.com / password</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
