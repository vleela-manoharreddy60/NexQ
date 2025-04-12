
import { useEffect, useState } from 'react';
import { 
  Search,
  Clock, 
  Percent, 
  ShoppingBag, 
  BarChart3,
  Package,
  QrCode
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import FeatureCard from '@/components/home/FeatureCard';

interface DashboardProps {
  role: 'manufacturer' | 'distributor' | 'wholesaler' | 'retailer';
}

const Dashboard = ({ role }: DashboardProps) => {
  const { toast } = useToast();
  const [userName, setUserName] = useState('User');
  const [isFirstLogin, setIsFirstLogin] = useState(true);
  
  useEffect(() => {
    // Demo purpose only - would be from API in real app
    switch(role) {
      case 'manufacturer':
        setUserName('ABC Electronics');
        break;
      case 'distributor':
        setUserName('Sri Traders');
        break;
      case 'wholesaler':
        setUserName('Vijay Wholesalers');
        break;
      case 'retailer':
        setUserName('Kumar Stores');
        break;
      default:
        setUserName('User');
    }
    
    // Show welcome toast for first login - would check from API
    if (isFirstLogin) {
      toast({
        title: `Welcome, ${userName}!`,
        description: "Thank you for joining NexQ.",
      });
      setIsFirstLogin(false);
    }
  }, [role, userName, isFirstLogin, toast]);

  const getSearchPlaceholder = () => {
    switch(role) {
      case 'manufacturer':
        return "Search other manufacturers' products...";
      case 'distributor':
        return "Search manufacturers or products...";
      case 'wholesaler':
        return "Search manufacturers or distributors...";
      case 'retailer':
        return "Search products or suppliers...";
      default:
        return "Search...";
    }
  };

  const getRecommendations = () => {
    switch(role) {
      case 'manufacturer':
        return [
          { id: 1, name: "Battery by XYZ Ltd.", category: "Electronics" },
          { id: 2, name: "Display Panel by Punjab Tech", category: "Electronics" },
          { id: 3, name: "Memory Chips by Xipstar", category: "Electronics" }
        ];
      case 'distributor':
        return [
          { id: 1, name: "ABC Electronics", category: "Phones", type: "Manufacturer" },
          { id: 2, name: "Relion Power", category: "Batteries", type: "Manufacturer" },
          { id: 3, name: "TechCore India", category: "Chargers", type: "Manufacturer" }
        ];
      case 'wholesaler':
        return [
          { id: 1, name: "ABC Electronics", category: "Phones", type: "Manufacturer" },
          { id: 2, name: "Sri Traders", category: "Chargers", type: "Distributor" },
          { id: 3, name: "Galaxy Trading Co.", category: "Accessories", type: "Distributor" }
        ];
      case 'retailer':
        return [
          { id: 1, name: "Smartphone X1", price: "₹450", supplier: "Vijay Wholesalers" },
          { id: 2, name: "Fast Charger C1", price: "₹120", supplier: "Sri Traders" },
          { id: 3, name: "Premium Case", price: "₹80", supplier: "Galaxy Trading" }
        ];
      default:
        return [];
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-nexq-blue mb-4">
          Hello, {userName}!
        </h1>
        
        {/* Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center mb-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input 
              placeholder={getSearchPlaceholder()}
              className="pl-10 w-full"
            />
          </div>
          <Button className="bg-nexq-blue hover:bg-nexq-blue/90 whitespace-nowrap">
            Search
          </Button>
        </div>
        
        {/* Recommendations */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-8">
          <h2 className="text-xl font-semibold text-nexq-blue mb-4">
            {role === 'retailer' ? 'Recommended Products' : 
             role === 'manufacturer' ? 'Recommended Products' : 
             'Recommended Suppliers'}
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {getRecommendations().map((item) => (
              <div 
                key={item.id} 
                className="border rounded-lg p-4 hover:border-nexq-orange transition-colors"
              >
                {role === 'retailer' ? (
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-nexq-orange font-semibold">{item.price}</p>
                    <p className="text-sm text-gray-500">Supplier: {item.supplier}</p>
                    <Button size="sm" className="mt-2 bg-nexq-blue hover:bg-nexq-blue/90">
                      Add to Cart
                    </Button>
                  </div>
                ) : (
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500">
                      {item.category}
                      {item.type && ` • ${item.type}`}
                    </p>
                    <Button size="sm" className="mt-2 bg-nexq-blue hover:bg-nexq-blue/90">
                      {role === 'manufacturer' ? 'View' : 'View Profile'}
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FeatureCard 
            title="Real-Time Inventory" 
            description="Track your entire inventory with live updates"
            icon={<Clock size={32} />}
          />
          <FeatureCard 
            title="Dynamic Discounts" 
            description={role === 'manufacturer' ? "Create custom discounts to boost sales" : "Access volume-based discounts from suppliers"}
            icon={<Percent size={32} />}
          />
          <FeatureCard 
            title="Order Management" 
            description="Track and manage all your orders in one place"
            icon={<ShoppingBag size={32} />}
          />
          <FeatureCard 
            title="Analytics Dashboard" 
            description="Data-driven insights to optimize your business"
            icon={<BarChart3 size={32} />}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
