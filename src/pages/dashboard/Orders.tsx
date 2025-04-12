
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Truck, Factory, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface OrdersProps {
  role: 'manufacturer' | 'distributor' | 'wholesaler' | 'retailer';
}

interface OrderData {
  id: string;
  buyer: string;
  products: string;
  quantity: number;
  status: 'completed' | 'ready' | 'dispatched' | 'cancelled';
  date: string;
  eta?: string;
  reason?: string;
}

const Orders = ({ role }: OrdersProps) => {
  const [activeTab, setActiveTab] = useState<'completed' | 'ready' | 'dispatched' | 'cancelled'>('completed');
  
  // Sample data - in a real app this would come from an API
  const orderData: OrderData[] = [
    { id: "#123", buyer: "Sri Traders", products: "Smartphone X1", quantity: 500, status: "completed", date: "10-Apr-2025" },
    { id: "#124", buyer: "Ravi Distributors", products: "Charger C1", quantity: 200, status: "completed", date: "9-Apr-2025" },
    { id: "#125", buyer: "Vijay Wholesalers", products: "Smartphone X1", quantity: 300, status: "ready", date: "11-Apr-2025" },
    { id: "#126", buyer: "Sri Traders", products: "Charger C1", quantity: 100, status: "ready", date: "11-Apr-2025" },
    { id: "#127", buyer: "Ravi Distributors", products: "Smartphone X1", quantity: 400, status: "dispatched", date: "10-Apr-2025", eta: "12-Apr-2025" },
    { id: "#128", buyer: "Kumar Stores", products: "Charger C1", quantity: 50, status: "dispatched", date: "9-Apr-2025", eta: "11-Apr-2025" },
    { id: "#129", buyer: "Sri Traders", products: "Smartphone X1", quantity: 100, status: "cancelled", date: "8-Apr-2025", reason: "Low demand" },
    { id: "#130", buyer: "Vijay Wholesalers", products: "Charger C1", quantity: 200, status: "cancelled", date: "7-Apr-2025", reason: "Stock issue" },
  ];
  
  // Filter orders by status
  const completedOrders = orderData.filter(order => order.status === 'completed');
  const readyOrders = orderData.filter(order => order.status === 'ready');
  const dispatchedOrders = orderData.filter(order => order.status === 'dispatched');
  const cancelledOrders = orderData.filter(order => order.status === 'cancelled');

  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-bold text-nexq-blue mb-6">Manage Orders</h1>
      
      {/* Metrics Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <MetricCard 
          count={completedOrders.length} 
          label="Completed Today" 
          color="green"
          icon={<Check className="h-5 w-5" />}
        />
        <MetricCard 
          count={readyOrders.length} 
          label="Ready to Dispatch" 
          color="blue"
          icon={<Factory className="h-5 w-5" />}
        />
        <MetricCard 
          count={dispatchedOrders.length} 
          label="Dispatched" 
          color="orange"
          icon={<Truck className="h-5 w-5" />}
        />
        <MetricCard 
          count={cancelledOrders.length} 
          label="Cancelled" 
          color="gray"
          icon={<X className="h-5 w-5" />}
        />
      </div>
      
      {/* Orders Tabs */}
      <Tabs defaultValue="completed" onValueChange={(value) => setActiveTab(value as any)}>
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="ready">Ready to Dispatch</TabsTrigger>
          <TabsTrigger value="dispatched">Dispatched</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>
        
        <TabsContent value="completed" className="animate-fade-in space-y-4">
          <OrderTable 
            orders={completedOrders}
            status="completed"
            role={role}
          />
        </TabsContent>
        
        <TabsContent value="ready" className="animate-fade-in space-y-4">
          <OrderTable 
            orders={readyOrders}
            status="ready"
            role={role}
          />
        </TabsContent>
        
        <TabsContent value="dispatched" className="animate-fade-in space-y-4">
          <OrderTable 
            orders={dispatchedOrders}
            status="dispatched"
            role={role}
          />
        </TabsContent>
        
        <TabsContent value="cancelled" className="animate-fade-in space-y-4">
          <OrderTable 
            orders={cancelledOrders}
            status="cancelled"
            role={role}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

const MetricCard = ({ count, label, color, icon }: { count: number; label: string; color: string; icon: React.ReactNode }) => {
  const bgColor = {
    green: 'bg-green-50 border-green-200',
    blue: 'bg-nexq-blue/5 border-nexq-blue/20',
    orange: 'bg-nexq-orange/5 border-nexq-orange/20',
    gray: 'bg-gray-50 border-gray-200'
  }[color];
  
  const textColor = {
    green: 'text-green-600',
    blue: 'text-nexq-blue',
    orange: 'text-nexq-orange',
    gray: 'text-gray-600'
  }[color];
  
  const iconColor = {
    green: 'bg-green-100 text-green-600',
    blue: 'bg-nexq-blue/10 text-nexq-blue',
    orange: 'bg-nexq-orange/10 text-nexq-orange',
    gray: 'bg-gray-100 text-gray-600'
  }[color];
  
  return (
    <div className={`border rounded-lg p-4 ${bgColor} animate-scale-in`}>
      <div className="flex justify-between items-center">
        <div>
          <div className={`text-2xl font-bold ${textColor}`}>{count}</div>
          <div className="text-sm text-gray-500">{label}</div>
        </div>
        <div className={`p-2 rounded-full ${iconColor}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

const OrderTable = ({ orders, status, role }: { orders: OrderData[]; status: 'completed' | 'ready' | 'dispatched' | 'cancelled'; role: string }) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500">Delivered</Badge>;
      case 'ready':
        return <Badge className="bg-nexq-blue">Ready to Dispatch</Badge>;
      case 'dispatched':
        return <Badge className="bg-nexq-orange">On the Way</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="text-gray-500">Cancelled</Badge>;
      default:
        return null;
    }
  };
  
  const getActionButton = (status: string, orderId: string) => {
    switch (status) {
      case 'completed':
        return (
          <div className="space-x-2">
            <Button size="sm" variant="outline">View Details</Button>
            <Button size="sm" variant="outline">View QR</Button>
          </div>
        );
      case 'ready':
        return (
          <div className="space-x-2">
            <Button size="sm" className="bg-nexq-blue hover:bg-nexq-blue/90">Confirm Dispatch</Button>
            <Button size="sm" variant="outline">Generate QR</Button>
          </div>
        );
      case 'dispatched':
        return (
          <div className="space-x-2">
            <Button size="sm" className="bg-nexq-orange hover:bg-nexq-orange/90">Track</Button>
            <Button size="sm" variant="outline">View QR</Button>
          </div>
        );
      case 'cancelled':
        return (
          <Button size="sm" variant="outline">View Details</Button>
        );
      default:
        return null;
    }
  };
  
  const getVehicleAnimation = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <div className="relative p-3 bg-green-50 rounded-lg">
            <div className="absolute left-3 bottom-3 w-10 h-8 bg-green-200 rounded-md">
              <div className="absolute -top-3 left-1 w-8 h-4 bg-green-300 rounded-t-md"></div>
            </div>
            <Truck className="text-green-600 ml-auto" size={24} />
          </div>
        );
      case 'ready':
        return (
          <div className="relative p-3 bg-nexq-blue/5 rounded-lg">
            <div className="absolute left-3 bottom-3 w-6 h-6 bg-nexq-blue/20 rounded-md"></div>
            <Truck className="text-nexq-blue ml-auto" size={24} />
          </div>
        );
      case 'dispatched':
        return (
          <div className="relative p-3 bg-nexq-orange/5 rounded-lg animate-pulse">
            <Truck className="text-nexq-orange animate-bounce-slow" size={24} />
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {orders.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {role === 'manufacturer' ? 'Buyer' : 'Supplier'}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Products
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {status === 'dispatched' ? 'ETA' : 'Date'}
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vehicle
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-nexq-blue">
                    {order.id}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                    {order.buyer}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                    {order.products}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                    {order.quantity} units
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {getStatusBadge(order.status)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                    {order.status === 'dispatched' ? order.eta : order.date}
                    {order.status === 'cancelled' && order.reason && (
                      <div className="text-xs text-gray-500">{order.reason}</div>
                    )}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {getVehicleAnimation(order.status)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-sm">
                    {getActionButton(order.status, order.id)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="p-8 text-center text-gray-500">
          No {status} orders found.
        </div>
      )}
    </div>
  );
};

export default Orders;
