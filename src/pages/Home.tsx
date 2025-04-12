
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Clock, Package, QrCode, Truck, RouteIcon, BarChart3, Percent
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/layout/Header';
import FeatureCard from '@/components/home/FeatureCard';

const Home = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('supply-chain');

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 pt-16">
        <div className="container px-4 py-8 md:py-16 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mb-16">
            {/* Left Section */}
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold text-nexq-blue">
                Welcome to <span className="text-nexq-orange">NexQ</span>
              </h1>
              <h2 className="text-xl md:text-2xl font-semibold text-nexq-orange">
                Supply Chain 2.0
              </h2>
              <p className="text-gray-600 text-lg">
                Streamline your supply chain with real-time inventory, dynamic discounts, and smart logistics.
                The unified platform for Indian manufacturers, distributors, wholesalers, and retailers.
              </p>
              <Button 
                size="lg" 
                className="bg-nexq-blue hover:bg-nexq-blue/90 text-white px-8"
                onClick={() => navigate('/profile')}
              >
                Get Started
              </Button>
            </div>
            
            {/* Right Section - Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FeatureCard 
                title="Real-Time Inventory" 
                description="Track stock instantly across your supply chain"
                icon={<Clock size={32} />}
              />
              <FeatureCard 
                title="Dynamic Discounts" 
                description="Optimize pricing with volume-based discounts"
                icon={<Percent size={32} />}
              />
              <FeatureCard 
                title="QR Scanning" 
                description="Instantly update inventory with QR codes"
                icon={<QrCode size={32} />}
              />
              <FeatureCard 
                title="Emergency Delivery" 
                description="On-demand logistics when you need it most"
                icon={<Truck size={32} />}
              />
              <FeatureCard 
                title="Route Optimization" 
                description="Smart delivery routes save time and fuel"
                icon={<RouteIcon size={32} />}
              />
              <FeatureCard 
                title="Analytics Dashboard" 
                description="Data-driven insights for business growth"
                icon={<BarChart3 size={32} />}
              />
            </div>
          </div>
          
          {/* Tabs Section */}
          <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
            <Tabs defaultValue="supply-chain" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger 
                  value="supply-chain"
                  className={activeTab === 'supply-chain' ? 'text-nexq-blue' : ''}
                >
                  Supply Chain
                </TabsTrigger>
                <TabsTrigger 
                  value="logistics"
                  className={activeTab === 'logistics' ? 'text-nexq-blue' : ''}
                >
                  Logistics
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="supply-chain" className="animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold text-nexq-blue mb-4">Unified Supply Chain Management</h3>
                    <p className="text-gray-600 mb-6">
                      NexQ connects all stakeholders in your supply chain on a single platform. 
                      From manufacturers to retailers, everyone works together with real-time data.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <Package className="h-5 w-5 text-nexq-orange mr-2 mt-0.5" />
                        <span>Track inventory across multiple locations</span>
                      </li>
                      <li className="flex items-start">
                        <QrCode className="h-5 w-5 text-nexq-orange mr-2 mt-0.5" />
                        <span>Scan QR codes to update stock instantly</span>
                      </li>
                      <li className="flex items-start">
                        <Clock className="h-5 w-5 text-nexq-orange mr-2 mt-0.5" />
                        <span>Real-time updates on order status</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-nexq-light p-6 rounded-lg animate-pulse-glow">
                    <img 
                      src="/images/nexq-logo.svg" 
                      alt="Supply Chain Visualization" 
                      className="w-full h-64 object-contain animate-float" 
                    />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="logistics" className="animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold text-nexq-blue mb-4">Smart Logistics Solutions</h3>
                    <p className="text-gray-600 mb-6">
                      NexQ optimizes your deliveries with intelligent routing, emergency delivery options, 
                      and end-to-end tracking capabilities.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <Truck className="h-5 w-5 text-nexq-orange mr-2 mt-0.5" />
                        <span>Same-day and emergency delivery options</span>
                      </li>
                      <li className="flex items-start">
                        <RouteIcon className="h-5 w-5 text-nexq-orange mr-2 mt-0.5" />
                        <span>AI-powered route optimization</span>
                      </li>
                      <li className="flex items-start">
                        <BarChart3 className="h-5 w-5 text-nexq-orange mr-2 mt-0.5" />
                        <span>Detailed logistics cost analytics</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-nexq-light p-6 rounded-lg animate-pulse-glow">
                    <img 
                      src="/images/nexq-logo.svg" 
                      alt="Logistics Visualization" 
                      className="w-full h-64 object-contain animate-float" 
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <footer className="bg-white py-6 shadow-md">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <div className="flex justify-center space-x-6 mb-4">
            <a href="#" className="hover:text-nexq-blue">About Us</a>
            <a href="#" className="hover:text-nexq-blue">Contact</a>
            <a href="#" className="hover:text-nexq-blue">Terms</a>
          </div>
          <p>© 2025 NexQ. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
