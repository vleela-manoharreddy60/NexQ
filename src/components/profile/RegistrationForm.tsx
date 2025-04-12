
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

type Role = 'manufacturer' | 'distributor' | 'wholesaler' | 'retailer';

interface RegistrationFormProps {
  role: Role;
}

const RegistrationForm = ({ role }: RegistrationFormProps) => {
  const { toast } = useToast();
  const [acceptTerms, setAcceptTerms] = useState(false);
  
  // Simplified form for the initial prototype
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    gstNumber: '',
    panNumber: '',
    companyType: '',
    productTypes: '',
    categories: '',
    region: '',
    address: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!acceptTerms) {
      toast({
        title: "Terms Required",
        description: "Please accept the terms and conditions to register.",
        variant: "destructive"
      });
      return;
    }
    
    // This would normally make an API call and handle registration
    toast({
      title: "Registration Successful",
      description: `You have registered as a ${role}. Please check your email to verify your account.`,
    });
    
    console.log('Registration submitted:', { role, ...formData });
    // Redirect would happen here in a real app
  };

  // Get form fields based on role
  const getRoleSpecificFields = () => {
    switch (role) {
      case 'manufacturer':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="companyType">Type of Company</Label>
              <Select onValueChange={(value) => handleSelectChange('companyType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select company type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="soleProprietor">Sole Proprietorship</SelectItem>
                  <SelectItem value="pvtLtd">Private Limited</SelectItem>
                  <SelectItem value="llp">LLP</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="productTypes">Number of Product Types</Label>
              <Select onValueChange={(value) => handleSelectChange('productTypes', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select product range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-5">1-5</SelectItem>
                  <SelectItem value="6-10">6-10</SelectItem>
                  <SelectItem value="20+">20+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        );
      
      case 'distributor':
      case 'wholesaler':
      case 'retailer':
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="region">Region</Label>
              <Select onValueChange={(value) => handleSelectChange('region', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="north">North India</SelectItem>
                  <SelectItem value="south">South India</SelectItem>
                  <SelectItem value="east">East India</SelectItem>
                  <SelectItem value="west">West India</SelectItem>
                  <SelectItem value="central">Central India</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                placeholder="Full address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
          </>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold text-nexq-blue mb-6">
        Register as {role.charAt(0).toUpperCase() + role.slice(1)}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Common Fields */}
        <div className="space-y-2">
          <Label htmlFor="companyName">
            {role === 'manufacturer' ? 'Company Name' : 
             role.charAt(0).toUpperCase() + role.slice(1) + ' Name'}
          </Label>
          <Input
            id="companyName"
            name="companyName"
            placeholder="Your business name"
            value={formData.companyName}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="contactPerson">Contact Person</Label>
          <Input
            id="contactPerson"
            name="contactPerson"
            placeholder="Full name"
            value={formData.contactPerson}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="contact@company.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              placeholder="10-digit number"
              pattern="[0-9]{10}"
              title="Please enter a 10-digit phone number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="gstNumber">
              GST Number {role === 'retailer' && '(Optional)'}
            </Label>
            <Input
              id="gstNumber"
              name="gstNumber"
              placeholder="15-digit GST number"
              pattern="\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}"
              title="Please enter a valid 15-digit GST number"
              value={formData.gstNumber}
              onChange={handleChange}
              required={role !== 'retailer'}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="panNumber">PAN Number</Label>
            <Input
              id="panNumber"
              name="panNumber"
              placeholder="10-digit PAN number"
              pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
              title="Please enter a valid 10-digit PAN number"
              value={formData.panNumber}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="categories">Primary Categories</Label>
          <Select onValueChange={(value) => handleSelectChange('categories', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select your business category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="electronics">Electronics</SelectItem>
              <SelectItem value="fmcg">FMCG</SelectItem>
              <SelectItem value="textiles">Textiles</SelectItem>
              <SelectItem value="automotive">Automotive</SelectItem>
              <SelectItem value="pharmaceuticals">Pharmaceuticals</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Role Specific Fields */}
        {getRoleSpecificFields()}
        
        {/* Password Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="terms" 
            checked={acceptTerms}
            onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
          />
          <Label htmlFor="terms" className="text-sm">
            I accept the <a href="#" className="text-nexq-orange hover:underline">Terms and Conditions</a>
          </Label>
        </div>
        
        <Button type="submit" className="w-full bg-nexq-blue hover:bg-nexq-blue/90">
          Register as {role.charAt(0).toUpperCase() + role.slice(1)}
        </Button>
      </form>
    </div>
  );
};

export default RegistrationForm;
