
import { useState } from 'react';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { QrCode, Box, Truck, AlertTriangle, Plus, RefreshCw } from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface ProductListsProps {
  role: 'manufacturer' | 'distributor' | 'wholesaler' | 'retailer';
}

interface ProductItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  counterparty?: string;
  date?: string;
  location?: string;
  status?: string;
}

const ProductLists = ({ role }: ProductListsProps) => {
  const [activeTab, setActiveTab] = useState('inventory');
  const [showScanner, setShowScanner] = useState(false);
  
  // Sample data - would come from API in a real app
  const inventoryData: ProductItem[] = [
    { id: "P001", name: "Smartphone X1", category: "Electronics", quantity: 5000 },
    { id: "P002", name: "Charger C1", category: "Electronics", quantity: 8000 },
    { id: "P003", name: "Battery B1", category: "Electronics", quantity: 3500 },
    { id: "P004", name: "Display Panel D1", category: "Electronics", quantity: 2000 },
    { id: "P005", name: "Memory Card M1", category: "Electronics", quantity: 10000 },
  ];
  
  const soldItems: ProductItem[] = [
    { id: "P001", name: "Smartphone X1", category: "Electronics", quantity: 2000, counterparty: "Sri Traders", date: "10-Apr-2025", location: "Mumbai" },
    { id: "P001", name: "Smartphone X1", category: "Electronics", quantity: 1500, counterparty: "Ravi Distributors", date: "09-Apr-2025", location: "Delhi" },
    { id: "P002", name: "Charger C1", category: "Electronics", quantity: 3000, counterparty: "Vijay Wholesalers", date: "08-Apr-2025", location: "Bangalore" },
    { id: "P002", name: "Charger C1", category: "Electronics", quantity: 1000, counterparty: "Kumar Stores", date: "07-Apr-2025", location: "Chennai" },
  ];
  
  const damagedItems: ProductItem[] = [
    { id: "P001", name: "Smartphone X1", category: "Electronics", quantity: 50, status: "Water Damage", date: "05-Apr-2025" },
    { id: "P002", name: "Charger C1", category: "Electronics", quantity: 100, status: "Manufacturing Defect", date: "04-Apr-2025" },
    { id: "P003", name: "Battery B1", category: "Electronics", quantity: 75, status: "Shipping Damage", date: "03-Apr-2025" },
  ];

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold text-nexq-blue">Product Lists</h1>
        
        <div className="flex flex-col sm:flex-row gap-2">
          <Button 
            onClick={() => setShowScanner(true)}
            className="bg-nexq-blue hover:bg-nexq-blue/90 flex items-center gap-2"
          >
            <QrCode className="h-4 w-4" />
            <span>QR Scanner</span>
          </Button>
          
          <Button variant="outline" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            <span>Add Product</span>
          </Button>
        </div>
      </div>
      
      {/* Tabs */}
      <Tabs defaultValue="inventory" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="inventory">Current Inventory</TabsTrigger>
          <TabsTrigger value="sold">
            {role === 'manufacturer' ? 'Items Sold to Distributor' : 'Purchased Items'}
          </TabsTrigger>
          <TabsTrigger value="damaged">Items Damaged</TabsTrigger>
        </TabsList>
        
        {/* Current Inventory */}
        <TabsContent value="inventory" className="animate-fade-in space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Box className="h-5 w-5 text-nexq-blue" />
              <span className="font-medium">Total Inventory: {inventoryData.reduce((sum, item) => sum + item.quantity, 0)} units</span>
            </div>
            
            <div className="flex gap-2">
              <Input placeholder="Search products..." className="max-w-xs" />
              <Button variant="ghost" size="icon">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product ID</TableHead>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Available Quantity</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inventoryData.map((item) => (
                    <TableRow key={item.id + '-inv'} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{item.id}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>
                        <span className={`font-medium ${item.quantity < 1000 ? 'text-red-500' : 'text-green-600'}`}>
                          {item.quantity.toLocaleString()} units
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" className="mr-2">Update</Button>
                        <Button variant="outline" size="sm">View Details</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>
        
        {/* Items Sold */}
        <TabsContent value="sold" className="animate-fade-in space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-nexq-orange" />
              <span className="font-medium">
                {role === 'manufacturer' ? 'Total Sold: ' : 'Total Purchased: '}
                {soldItems.reduce((sum, item) => sum + item.quantity, 0)} units
              </span>
            </div>
            
            <div className="flex gap-2">
              <Input placeholder="Search transactions..." className="max-w-xs" />
              <Button variant="ghost" size="icon">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product ID</TableHead>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>{role === 'manufacturer' ? 'Distributor' : 'Supplier'}</TableHead>
                    <TableHead>Date Delivered</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {soldItems.map((item, index) => (
                    <TableRow key={`${item.id}-sold-${index}`} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{item.id}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.quantity.toLocaleString()} units</TableCell>
                      <TableCell>{item.counterparty}</TableCell>
                      <TableCell>{item.date}</TableCell>
                      <TableCell>{item.location}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">View Details</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>
        
        {/* Items Damaged */}
        <TabsContent value="damaged" className="animate-fade-in space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <span className="font-medium">
                Total Damaged: {damagedItems.reduce((sum, item) => sum + item.quantity, 0)} units
              </span>
            </div>
            
            <div className="flex gap-2">
              <Input placeholder="Search damaged items..." className="max-w-xs" />
              <Button variant="ghost" size="icon">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product ID</TableHead>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Damage Status</TableHead>
                    <TableHead>Reported Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {damagedItems.map((item, index) => (
                    <TableRow key={`${item.id}-damaged-${index}`} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{item.id}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.quantity.toLocaleString()} units</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-red-50 text-red-600 hover:bg-red-50">
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{item.date}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">Report Details</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* QR Scanner Dialog */}
      <Dialog open={showScanner} onOpenChange={setShowScanner}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Scan QR Code</DialogTitle>
            <DialogDescription>
              Point your camera at a product QR code to update inventory
            </DialogDescription>
          </DialogHeader>
          
          <div className="aspect-square bg-black/5 rounded-md flex items-center justify-center border-2 border-dashed border-gray-300">
            <div className="text-center p-4">
              <QrCode className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-sm text-gray-500">Camera access required for QR scanning</p>
              <p className="text-xs text-gray-400 mt-2">Position the QR code within the frame</p>
            </div>
          </div>
          
          <DialogFooter className="sm:justify-between">
            <Button variant="outline" onClick={() => setShowScanner(false)}>Cancel</Button>
            <Button 
              type="button" 
              className="bg-nexq-blue hover:bg-nexq-blue/90"
              onClick={() => {
                // This would actually process a scanned QR code in a real app
                setShowScanner(false);
              }}
            >
              Manual Entry
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductLists;
