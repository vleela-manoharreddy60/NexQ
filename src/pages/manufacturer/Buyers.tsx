
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MessageCircle, Eye, Percent } from 'lucide-react';

const frequentBuyers = [
  { name: "Sri Traders", region: "Maharashtra", orders: 60, units: 5000, lastOrder: "10-Apr-2025", products: ["Smartphone X1", "Charger C1"] },
  { name: "Ravi Distributors", region: "Delhi", orders: 45, units: 3000, lastOrder: "9-Apr-2025", products: ["Smartphone X1"] },
  { name: "Vijay Wholesalers", region: "Gujarat", orders: 30, units: 2000, lastOrder: "8-Apr-2025", products: ["Charger C1"] }
];

const newDistributors = [
  { name: "Kumar Distributors", region: "Tamil Nadu", joinDate: "1-Apr-2025", orders: 2, units: 200, products: ["Smartphone X1"] },
  { name: "Anand Traders", region: "Gujarat", joinDate: "5-Apr-2025", orders: 1, units: 100, products: ["Charger C1"] },
  { name: "Bharat Supplies", region: "Karnataka", joinDate: "7-Apr-2025", orders: 0, units: 0, products: [] }
];

const Buyers = () => {
  const [activeTab, setActiveTab] = useState("frequent");

  return (
    <div className="w-full animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Buyers</h1>
        <p className="text-gray-500">Connect with your buyers on NexQ: Track frequent and new distributors to grow your business.</p>
      </div>

      {/* Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <h3 className="text-lg font-semibold text-green-600">Frequent Buyers</h3>
          <p className="text-2xl font-bold">{frequentBuyers.length} distributors</p>
          <p className="text-gray-500">{frequentBuyers.reduce((sum, buyer) => sum + buyer.orders, 0)}+ orders</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <h3 className="text-lg font-semibold text-purple-600">New Distributors</h3>
          <p className="text-2xl font-bold">{newDistributors.length} distributors</p>
          <p className="text-gray-500">joined Apr 2025</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <h3 className="text-lg font-semibold text-green-600">Recent Orders</h3>
          <p className="text-2xl font-bold">10 orders</p>
          <p className="text-gray-500">2,000 units</p>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="frequent">Frequent Buyers</TabsTrigger>
            <TabsTrigger value="new">New Distributors</TabsTrigger>
          </TabsList>

          <TabsContent value="frequent" className="p-2">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Distributor Name</TableHead>
                  <TableHead>Region</TableHead>
                  <TableHead>Total Orders</TableHead>
                  <TableHead>Units Purchased</TableHead>
                  <TableHead>Last Order</TableHead>
                  <TableHead>Preferred Products</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {frequentBuyers.map((buyer) => (
                  <TableRow key={buyer.name} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{buyer.name}</TableCell>
                    <TableCell>{buyer.region}</TableCell>
                    <TableCell>{buyer.orders} orders</TableCell>
                    <TableCell>{buyer.units} units</TableCell>
                    <TableCell>{buyer.lastOrder}</TableCell>
                    <TableCell>{buyer.products.join(", ") || "None"}</TableCell>
                    <TableCell className="flex gap-2">
                      <Button size="sm" variant="outline" title="View Profile">
                        <Eye size={16} />
                      </Button>
                      <Button size="sm" variant="outline" title="Message">
                        <MessageCircle size={16} />
                      </Button>
                      <Button size="sm" variant="outline" title="Offer Discount">
                        <Percent size={16} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="new" className="p-2">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Distributor Name</TableHead>
                  <TableHead>Region</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Orders Placed</TableHead>
                  <TableHead>Units Purchased</TableHead>
                  <TableHead>Preferred Products</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {newDistributors.map((buyer) => (
                  <TableRow key={buyer.name} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{buyer.name}</TableCell>
                    <TableCell>{buyer.region}</TableCell>
                    <TableCell>{buyer.joinDate}</TableCell>
                    <TableCell>{buyer.orders} orders</TableCell>
                    <TableCell>{buyer.units} units</TableCell>
                    <TableCell>{buyer.products.join(", ") || "None"}</TableCell>
                    <TableCell className="flex gap-2">
                      <Button size="sm" variant="outline" title="View Profile">
                        <Eye size={16} />
                      </Button>
                      <Button size="sm" variant="outline" title="Message">
                        <MessageCircle size={16} />
                      </Button>
                      <Button size="sm" variant="outline" title="Offer Discount">
                        <Percent size={16} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Buyers;
