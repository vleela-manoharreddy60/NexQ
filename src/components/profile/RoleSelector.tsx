
import { useState } from 'react';
import { Factory, Store, ShoppingBag, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

type Role = 'manufacturer' | 'distributor' | 'wholesaler' | 'retailer';

interface RoleSelectorProps {
  selectedRole: Role | null;
  isLoginMode: boolean;
  onRoleSelect: (role: Role) => void;
  onModeToggle: (isLogin: boolean) => void;
}

const RoleSelector = ({ 
  selectedRole, 
  isLoginMode, 
  onRoleSelect, 
  onModeToggle 
}: RoleSelectorProps) => {
  const roles: { id: Role; label: string; icon: React.ReactNode }[] = [
    { id: 'manufacturer', label: 'Manufacturer', icon: <Factory className="h-5 w-5" /> },
    { id: 'distributor', label: 'Distributor', icon: <Building2 className="h-5 w-5" /> },
    { id: 'wholesaler', label: 'Wholesaler', icon: <ShoppingBag className="h-5 w-5" /> },
    { id: 'retailer', label: 'Retailer', icon: <Store className="h-5 w-5" /> },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-nexq-blue">Join NexQ</h2>
      
      <div className="space-y-3">
        {roles.map((role) => (
          <div 
            key={role.id} 
            className="flex items-center justify-between border p-3 rounded-lg hover:bg-gray-50"
          >
            <Button
              variant={selectedRole === role.id ? "default" : "outline"}
              className={`flex items-center justify-start px-4 py-2 w-full mr-4 ${selectedRole === role.id ? 'bg-nexq-blue hover:bg-nexq-blue/90' : ''}`}
              onClick={() => onRoleSelect(role.id)}
            >
              <span className="mr-2">{role.icon}</span>
              <span>{role.label}</span>
            </Button>
            
            <div className="flex items-center space-x-2">
              <Label 
                htmlFor={`toggle-${role.id}`} 
                className={`text-xs ${!isLoginMode ? 'text-nexq-blue' : 'text-gray-400'}`}
              >
                Register
              </Label>
              <Switch
                id={`toggle-${role.id}`}
                checked={isLoginMode}
                onCheckedChange={onModeToggle}
                className={`data-[state=checked]:bg-nexq-orange`}
              />
              <Label 
                htmlFor={`toggle-${role.id}`} 
                className={`text-xs ${isLoginMode ? 'text-nexq-orange' : 'text-gray-400'}`}
              >
                Login
              </Label>
            </div>
          </div>
        ))}
      </div>
      
      <div className="p-4 bg-nexq-light rounded-lg text-sm text-gray-600">
        <h3 className="font-medium text-nexq-blue mb-2">Why Join NexQ?</h3>
        <ul className="list-disc list-inside space-y-1">
          <li>Real-time inventory tracking across your supply chain</li>
          <li>Fast, reliable deliveries with optimized logistics</li>
          <li>Smart growth with data-driven insights and analytics</li>
          <li>Dynamic discount system to boost your sales</li>
        </ul>
      </div>
    </div>
  );
};

export default RoleSelector;
