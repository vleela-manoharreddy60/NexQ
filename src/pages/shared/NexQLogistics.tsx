
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Clock, AlertTriangle, Truck, Handshake, Star, Rocket } from 'lucide-react';

const logisticsServiceOptions = [
  { name: "Same Day", description: "Delivery within 24 hours, ideal for urgent orders.", icon: Clock, eta: "24 hrs", cost: "₹500" },
  { name: "Emergency", description: "Priority delivery within 12 hours, high reliability.", icon: AlertTriangle, eta: "12 hrs", cost: "₹1000" },
  { name: "Self-Pickup", description: "Zero cost, buyer collects from warehouse.", icon: Truck, eta: "N/A", cost: "₹0" },
  { name: "Third-Party", description: "Partnered providers for flexibility.", icon: Handshake, eta: "48 hrs", cost: "₹600" }
];

const topRatedLogistics = [
  { name: "NexQ Same Day", rating: "4.8/5", reviews: 200, highlights: "99% on-time, covers 1000+ PIN codes", ideal: "Smartphone X1" },
  { name: "Blue Dart Express", rating: "4.7/5", reviews: 180, highlights: "Trusted for electronics", ideal: "All electronics" },
  { name: "Sri Logistics", rating: "4.6/5", reviews: 150, highlights: "Trusted by Kumar Stores", ideal: "Heavy goods" }
];

const fastExpressOptions = [
  { name: "NexQ Express", features: "Delivery in 12-24 hrs", coverage: "Covers Mumbai, Delhi", useCase: "Urgent Smartphone X1 orders", successRate: "98%" },
  { name: "Delhivery Next-Day", features: "Nationwide coverage", coverage: "18,000+ PIN codes", useCase: "Electronics-friendly", successRate: "95%" },
  { name: "Ecom Express", features: "72-hr guarantee", coverage: "22,000+ PIN codes", useCase: "High-value goods", successRate: "96%" }
];

const NexQLogistics = () => {
  const [activeTab, setActiveTab] = useState("services");
  const [formData, setFormData] = useState({
    product: "Smartphone X1",
    quantity: 200,
    destination: "Mumbai, Maharashtra, 400001",
    deliveryType: "Same Day"
  });

  return (
    <div className="w-full animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">NexQ Logistics</h1>
        <p className="text-gray-500">Explore NexQ Logistics: Choose services, estimate costs, and connect with top-rated providers!</p>
      </div>

      {/* Input Form */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product</label>
            <select 
              className="w-full border border-gray-300 rounded p-2"
              value={formData.product}
              onChange={(e) => setFormData({...formData, product: e.target.value})}
            >
              <option value="Smartphone X1">Smartphone X1</option>
              <option value="Charger C1">Charger C1</option>
              <option value="Earphones E1">Earphones E1</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
            <input 
              type="number" 
              className="w-full border border-gray-300 rounded p-2"
              value={formData.quantity}
              onChange={(e) => setFormData({...formData, quantity: Number(e.target.value)})}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
            <input 
              type="text" 
              className="w-full border border-gray-300 rounded p-2"
              value={formData.destination}
              onChange={(e) => setFormData({...formData, destination: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Type</label>
            <select 
              className="w-full border border-gray-300 rounded p-2"
              value={formData.deliveryType}
              onChange={(e) => setFormData({...formData, deliveryType: e.target.value})}
            >
              <option value="Same Day">Same Day</option>
              <option value="Emergency">Emergency</option>
              <option value="Self-Pickup">Self-Pickup</option>
              <option value="Third-Party">Third-Party</option>
            </select>
          </div>
        </div>
        
        <div className="mt-4 flex justify-end">
          <Button>Get Options & Costs</Button>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="services">Service Options</TabsTrigger>
            <TabsTrigger value="costs">AI Cost Estimator</TabsTrigger>
            <TabsTrigger value="top-rated">Top-Rated Logistics</TabsTrigger>
            <TabsTrigger value="express">Fast Express</TabsTrigger>
          </TabsList>

          <TabsContent value="services" className="p-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {logisticsServiceOptions.map((service) => {
                const IconComponent = service.icon;
                return (
                  <div key={service.name} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start mb-4">
                      <div className="p-3 bg-gray-100 rounded-full mr-4">
                        <IconComponent className="h-6 w-6 text-gray-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{service.name}</h3>
                        <p className="text-gray-600 text-sm">{service.description}</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <div>
                        <span className="text-gray-500">ETA:</span> <span className="font-medium">{service.eta}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Cost:</span> <span className="font-medium">{service.cost}</span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Button className="w-full">Select</Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="costs" className="p-2">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Service</TableHead>
                  <TableHead>Distance</TableHead>
                  <TableHead>Cost</TableHead>
                  <TableHead>ETA</TableHead>
                  <TableHead>Recommendation</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="hover:bg-gray-50">
                  <TableCell className="font-medium">Same Day</TableCell>
                  <TableCell>100 km</TableCell>
                  <TableCell>₹500</TableCell>
                  <TableCell>24 hrs</TableCell>
                  <TableCell><span className="px-2 py-1 rounded bg-green-100 text-green-800 text-xs">Recommended</span></TableCell>
                </TableRow>
                <TableRow className="hover:bg-gray-50">
                  <TableCell className="font-medium">Emergency</TableCell>
                  <TableCell>100 km</TableCell>
                  <TableCell>₹1000</TableCell>
                  <TableCell>12 hrs</TableCell>
                  <TableCell></TableCell>
                </TableRow>
                <TableRow className="hover:bg-gray-50">
                  <TableCell className="font-medium">Self-Pickup</TableCell>
                  <TableCell>100 km</TableCell>
                  <TableCell>₹0</TableCell>
                  <TableCell>N/A</TableCell>
                  <TableCell></TableCell>
                </TableRow>
                <TableRow className="hover:bg-gray-50">
                  <TableCell className="font-medium">Third-Party</TableCell>
                  <TableCell>100 km</TableCell>
                  <TableCell>₹600</TableCell>
                  <TableCell>48 hrs</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <div className="mt-4 flex justify-end">
              <Button>Confirm Service</Button>
            </div>
          </TabsContent>

          <TabsContent value="top-rated" className="p-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {topRatedLogistics.map((provider) => (
                <div key={provider.name} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center mb-3">
                    <h3 className="font-semibold text-lg">{provider.name}</h3>
                  </div>
                  <div className="flex items-center mb-3">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="font-medium">{provider.rating}</span>
                    <span className="text-gray-500 text-sm ml-1">({provider.reviews} reviews)</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{provider.highlights}</p>
                  <p className="text-sm text-gray-600 mb-4">Ideal for: <span className="font-medium">{provider.ideal}</span></p>
                  <Button variant="outline" className="w-full">View Details</Button>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="express" className="p-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {fastExpressOptions.map((express) => (
                <div key={express.name} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start mb-4">
                    <div className="p-3 bg-gray-100 rounded-full mr-4">
                      <Rocket className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{express.name}</h3>
                      <p className="text-gray-600 text-sm">{express.features}</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm mb-4">
                    <div><span className="text-gray-500">Coverage:</span> <span className="font-medium">{express.coverage}</span></div>
                    <div><span className="text-gray-500">Use Case:</span> <span className="font-medium">{express.useCase}</span></div>
                    <div><span className="text-gray-500">Success Rate:</span> <span className="font-medium">{express.successRate}</span></div>
                  </div>
                  <Button className="w-full">Book Now</Button>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Results/Output Section */}
      <div className="bg-white rounded-lg shadow p-6 mt-8">
        <h3 className="font-semibold text-lg mb-4">Selected Options</h3>
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="mb-2"><span className="font-medium">Order:</span> 200 units of Smartphone X1 to Mumbai, 400001</p>
          <p className="mb-2"><span className="font-medium">Service:</span> Same Day (₹500, ETA 24 hrs)</p>
          <p><span className="font-medium">Tracking:</span> <a href="#" className="text-blue-600 hover:underline">nexq.com/track/123</a></p>
        </div>
      </div>
    </div>
  );
};

export default NexQLogistics;
