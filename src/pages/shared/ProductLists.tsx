
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, QrCode } from 'lucide-react';

const currentInventory = [
  { product: "Smartphone X1", category: "Electronics", quantity: 2000, status: "In Stock", lastUpdated: "10-Apr-2025, 14:00" },
  { product: "Charger C1", category: "Electronics", quantity: 1000, status: "In Stock", lastUpdated: "9-Apr-2025, 12:00" },
  { product: "Earphones E1", category: "Electronics", quantity: 150, status: "Low Stock", lastUpdated: "8-Apr-2025, 10:00" }
];

const itemsSold = [
  { product: "Smartphone X1", category: "Electronics", quantity: 500, buyer: "Sri Traders", orderID: "#123", timeSold: "8-Apr-2025, 15:00", dateDelivered: "10-Apr-2025", deliveryLocation: "Mumbai, 400001" },
  { product: "Charger C1", category: "Electronics", quantity: 200, buyer: "Ravi Distributors", orderID: "#124", timeSold: "7-Apr-2025, 12:00", dateDelivered: "9-Apr-2025", deliveryLocation: "Delhi, 110001" }
];

const itemsDamaged = [
  { product: "Smartphone X1", category: "Electronics", quantity: 10, damageReason: "Transport damage", reportedDate: "8-Apr-2025" },
  { product: "Charger C1", category: "Electronics", quantity: 5, damageReason: "Manufacturing defect", reportedDate: "7-Apr-2025" }
];

const ProductLists = () => {
  const [activeTab, setActiveTab] = useState("inventory");

  return (
    <div className="w-full animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Product Lists</h1>
        <p className="text-gray-500">Manage your products with NexQ: View inventory, track sales, and update stock easily.</p>
      </div>

      {/* Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <h3 className="text-lg font-semibold text-green-600">Current Inventory</h3>
          <p className="text-2xl font-bold">3 products</p>
          <p className="text-gray-500">3,150 units</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <h3 className="text-lg font-semibold text-blue-600">Items Sold</h3>
          <p className="text-2xl font-bold">2 orders</p>
          <p className="text-gray-500">700 units</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 text-center">
          <h3 className="text-lg font-semibold text-red-600">Items Damaged</h3>
          <p className="text-2xl font-bold">2 products</p>
          <p className="text-gray-500">15 units</p>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="bg-white rounded-lg shadow p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="inventory">Current Inventory</TabsTrigger>
            <TabsTrigger value="sold">Items Sold</TabsTrigger>
            <TabsTrigger value="damaged">Items Damaged</TabsTrigger>
            <TabsTrigger value="qr">QR Scanner</TabsTrigger>
          </TabsList>

          <TabsContent value="inventory" className="p-2">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentInventory.map((item) => (
                  <TableRow key={item.product} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{item.product}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.quantity} units</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${item.status === 'In Stock' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {item.status}
                      </span>
                    </TableCell>
                    <TableCell>{item.lastUpdated}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">View Details</Button>
                        <Button size="sm" variant="outline">Update</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="sold" className="p-2">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Buyer</TableHead>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Time Sold</TableHead>
                  <TableHead>Date Delivered</TableHead>
                  <TableHead>Delivery Location</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {itemsSold.map((item) => (
                  <TableRow key={item.orderID} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{item.product}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.quantity} units</TableCell>
                    <TableCell>{item.buyer}</TableCell>
                    <TableCell>{item.orderID}</TableCell>
                    <TableCell>{item.timeSold}</TableCell>
                    <TableCell>{item.dateDelivered}</TableCell>
                    <TableCell>{item.deliveryLocation}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">View Order</Button>
                        <Button size="sm" variant="outline"><QrCode size={16} /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="damaged" className="p-2">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Damage Reason</TableHead>
                  <TableHead>Reported Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {itemsDamaged.map((item) => (
                  <TableRow key={`${item.product}-${item.reportedDate}`} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{item.product}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.quantity} units</TableCell>
                    <TableCell>{item.damageReason}</TableCell>
                    <TableCell>{item.reportedDate}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">View Details</Button>
                        <Button size="sm" variant="outline">Report Damage</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="qr" className="p-2">
            <div className="flex flex-col items-center justify-center py-12">
              <div className="bg-gray-100 w-full max-w-md p-8 rounded-lg border-2 border-dashed border-gray-300 mb-6 flex flex-col items-center">
                <QrCode size={120} className="text-gray-400 mb-4" />
                <p className="text-gray-500 text-center mb-4">Scan a QR code to update your inventory or upload an image.</p>
                <div className="flex gap-2">
                  <Button>Scan QR</Button>
                  <Button variant="outline">Upload Image</Button>
                </div>
              </div>

              <div className="w-full max-w-md">
                <h3 className="font-semibold mb-2">Manual Entry</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium">Product Name</label>
                    <input type="text" className="w-full border border-gray-300 rounded p-2 mt-1" placeholder="E.g., Smartphone X1" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Category</label>
                    <input type="text" className="w-full border border-gray-300 rounded p-2 mt-1" placeholder="E.g., Electronics" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Quantity</label>
                    <input type="number" className="w-full border border-gray-300 rounded p-2 mt-1" placeholder="E.g., 500" />
                  </div>
                  <Button className="w-full">Add to Inventory</Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProductLists;
