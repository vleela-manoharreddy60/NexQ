
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";
import DashboardLayout from "./components/layout/DashboardLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import Orders from "./pages/dashboard/Orders";
import Profile from "./pages/dashboard/Profile";
import Messages from "./pages/dashboard/Messages";
import ProductLists from "./pages/shared/ProductLists";
import NexQLogistics from "./pages/shared/NexQLogistics";
import Buyers from "./pages/manufacturer/Buyers";
import DiscountImpact from "./pages/manufacturer/DiscountImpact";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<ProfilePage />} />
          
          {/* Manufacturer Routes */}
          <Route path="/manufacturer" element={<DashboardLayout role="manufacturer" />}>
            <Route index element={<Dashboard role="manufacturer" />} />
            <Route path="dashboard" element={<Dashboard role="manufacturer" />} />
            <Route path="orders" element={<Orders role="manufacturer" />} />
            <Route path="product-lists" element={<ProductLists />} />
            <Route path="profile" element={<Profile role="manufacturer" />} />
            <Route path="messages" element={<Messages role="manufacturer" />} />
            <Route path="discount-impact" element={<DiscountImpact />} />
            <Route path="logistics" element={<NexQLogistics />} />
            <Route path="buyers" element={<Buyers />} />
            {/* Additional manufacturer routes would go here */}
          </Route>
          
          {/* Distributor Routes */}
          <Route path="/distributor" element={<DashboardLayout role="distributor" />}>
            <Route index element={<Dashboard role="distributor" />} />
            <Route path="dashboard" element={<Dashboard role="distributor" />} />
            <Route path="orders" element={<Orders role="distributor" />} />
            <Route path="product-lists" element={<ProductLists />} />
            <Route path="profile" element={<Profile role="distributor" />} />
            <Route path="messages" element={<Messages role="distributor" />} />
            <Route path="logistics" element={<NexQLogistics />} />
            <Route path="discounts" element={<Dashboard role="distributor" />} />
            {/* Additional distributor routes would go here */}
          </Route>
          
          {/* Wholesaler Routes */}
          <Route path="/wholesaler" element={<DashboardLayout role="wholesaler" />}>
            <Route index element={<Dashboard role="wholesaler" />} />
            <Route path="dashboard" element={<Dashboard role="wholesaler" />} />
            <Route path="orders" element={<Orders role="wholesaler" />} />
            <Route path="product-lists" element={<ProductLists />} />
            <Route path="profile" element={<Profile role="wholesaler" />} />
            <Route path="messages" element={<Messages role="wholesaler" />} />
            <Route path="logistics" element={<NexQLogistics />} />
            <Route path="discounts" element={<Dashboard role="wholesaler" />} />
            {/* Additional wholesaler routes would go here */}
          </Route>
          
          {/* Retailer Routes */}
          <Route path="/retailer" element={<DashboardLayout role="retailer" />}>
            <Route index element={<Dashboard role="retailer" />} />
            <Route path="dashboard" element={<Dashboard role="retailer" />} />
            <Route path="orders" element={<Orders role="retailer" />} />
            <Route path="product-lists" element={<ProductLists />} />
            <Route path="profile" element={<Profile role="retailer" />} />
            <Route path="messages" element={<Messages role="retailer" />} />
            <Route path="logistics" element={<NexQLogistics />} />
            <Route path="discounts" element={<Dashboard role="retailer" />} />
            {/* Additional retailer routes would go here */}
          </Route>
          
          {/* Catch-all for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
