
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from "@/hooks/use-toast";

interface LoginFormProps {
  selectedRole?: 'manufacturer' | 'distributor' | 'wholesaler' | 'retailer' | null;
}

const LoginForm = ({ selectedRole }: LoginFormProps) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Log the login attempt for debugging
    console.info('Login submitted:', formData);
    
    // This would normally make an API call and handle auth
    toast({
      title: "Login Successful",
      description: "Welcome back to NexQ!",
    });
    
    // Redirect to the appropriate dashboard based on role
    if (selectedRole) {
      // Small delay to ensure the toast is visible before redirecting
      setTimeout(() => {
        navigate(`/${selectedRole}`);
      }, 500);
    } else {
      // If no role is selected, redirect to home
      setTimeout(() => {
        navigate('/');
      }, 500);
    }
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-nexq-blue mb-6">Sign In</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email ID</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="yourname@company.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="rememberMe" 
              name="rememberMe"
              checked={formData.rememberMe}
              onCheckedChange={(checked) => 
                setFormData({...formData, rememberMe: checked as boolean})
              }
            />
            <Label htmlFor="rememberMe" className="text-sm">Remember Me</Label>
          </div>
          
          <a href="#" className="text-sm text-nexq-orange hover:underline">
            Forgot Password?
          </a>
        </div>
        
        <Button type="submit" className="w-full bg-nexq-blue hover:bg-nexq-blue/90">
          Sign In
        </Button>
        
        <p className="text-center text-sm text-gray-500">
          New to NexQ? <a href="#" className="text-nexq-orange hover:underline">Register</a>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
