
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const discountData = [
  { product: "Smartphone X1", discount: "10%", units: 500, profit: 25000, revenue: 500000, period: "1-10 Apr 2025" },
  { product: "Charger C1", discount: "15%", units: 200, profit: 5000, revenue: 100000, period: "1-10 Apr 2025" }
];

const comparisonData = [
  { 
    product: "Smartphone X1", 
    on: { discount: "10%", units: 500, revenue: 500000, profit: 25000, period: "1-10 Apr 2025" },
    off: { discount: "0%", units: 200, revenue: 240000, profit: 40000, period: "1-10 Mar 2025" }
  },
  { 
    product: "Charger C1", 
    on: { discount: "15%", units: 200, revenue: 100000, profit: 5000, period: "1-10 Apr 2025" },
    off: { discount: "0%", units: 100, revenue: 60000, profit: 10000, period: "1-10 Mar 2025" }
  }
];

const editDiscounts = [
  { product: "Smartphone X1", currentDiscount: "10%", status: "On" },
  { product: "Charger C1", currentDiscount: "15%", status: "Off" }
];

const DiscountImpact = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="w-full animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Discount Impact</h1>
        <p className="text-gray-500">Analyze and manage your discounts with NexQ: See profits, sales, and optimize pricing.</p>
      </div>

      {/* Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <h3 className="text-lg font-semibold text-green-600">Total Profit</h3>
          <p className="text-2xl font-bold">+₹30,000</p>
          <p className="text-gray-500">from discounts</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <h3 className="text-lg font-semibold text-gray-600">Units Sold</h3>
          <p className="text-2xl font-bold">700 units</p>
          <p className="text-gray-500">under discounts</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <h3 className="text-lg font-semibold text-purple-600">Active Discounts</h3>
          <p className="text-2xl font-bold">2 products</p>
          <p className="text-gray-500">currently discounted</p>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="comparison">Discount On vs. Off</TabsTrigger>
            <TabsTrigger value="edit">Edit Discounts</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="p-2">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Discount Rate</TableHead>
                  <TableHead>Units Sold</TableHead>
                  <TableHead>Profit/Loss</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>Period</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {discountData.map((item) => (
                  <TableRow key={item.product} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{item.product}</TableCell>
                    <TableCell>{item.discount}</TableCell>
                    <TableCell>{item.units} units</TableCell>
                    <TableCell className="text-green-600">+₹{item.profit.toLocaleString()}</TableCell>
                    <TableCell>₹{item.revenue.toLocaleString()}</TableCell>
                    <TableCell>{item.period}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="comparison" className="p-2">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Discount Status</TableHead>
                  <TableHead>Units Sold</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>Profit/Loss</TableHead>
                  <TableHead>Period</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comparisonData.flatMap((item) => [
                  <TableRow key={`${item.product}-on`} className="hover:bg-gray-50 bg-green-50">
                    <TableCell className="font-medium">{item.product}</TableCell>
                    <TableCell>On ({item.on.discount})</TableCell>
                    <TableCell>{item.on.units} units</TableCell>
                    <TableCell>₹{item.on.revenue.toLocaleString()}</TableCell>
                    <TableCell className="text-green-600">+₹{item.on.profit.toLocaleString()}</TableCell>
                    <TableCell>{item.on.period}</TableCell>
                  </TableRow>,
                  <TableRow key={`${item.product}-off`} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{item.product}</TableCell>
                    <TableCell>Off ({item.off.discount})</TableCell>
                    <TableCell>{item.off.units} units</TableCell>
                    <TableCell>₹{item.off.revenue.toLocaleString()}</TableCell>
                    <TableCell className="text-green-600">+₹{item.off.profit.toLocaleString()}</TableCell>
                    <TableCell>{item.off.period}</TableCell>
                  </TableRow>
                ])}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="edit" className="p-2">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Current Discount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {editDiscounts.map((item) => (
                  <TableRow key={item.product} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{item.product}</TableCell>
                    <TableCell>{item.currentDiscount}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${item.status === 'On' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {item.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Edit</Button>
                        <Button size="sm" variant="outline">{item.status === 'On' ? 'Turn Off' : 'Turn On'}</Button>
                      </div>
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

export default DiscountImpact;
