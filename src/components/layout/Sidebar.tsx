
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  Percent, 
  BarChart3, 
  Users, 
  MessageCircle, 
  Boxes, 
  Truck, 
  QrCode, 
  HeadphonesIcon,
  User
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  role: 'manufacturer' | 'distributor' | 'wholesaler' | 'retailer';
}

const Sidebar = ({ isOpen, role }: SidebarProps) => {
  const location = useLocation();
  const [userName, setUserName] = useState('User Name'); // This would come from an auth context

  const getMenuItems = () => {
    const commonItems = [
      { icon: LayoutDashboard, label: 'Dashboard', path: `/${role}/dashboard` },
      { icon: User, label: 'Profile', path: `/${role}/profile` },
      { icon: ShoppingBag, label: 'Orders', path: `/${role}/orders` },
      { icon: Package, label: 'Product Lists', path: `/${role}/product-lists` },
      { icon: MessageCircle, label: 'Messages', path: `/${role}/messages` },
      { icon: Truck, label: 'NexQ Logistics', path: `/${role}/logistics` },
    ];

    // Items specific to manufacturer role
    if (role === 'manufacturer') {
      return [
        ...commonItems,
        { icon: Percent, label: 'Discount Impact', path: `/${role}/discount-impact` },
        { icon: Users, label: 'Buyers', path: `/${role}/buyers` },
        { icon: Boxes, label: 'Stocks', path: `/${role}/stocks` },
        { icon: QrCode, label: 'QR Generator', path: `/${role}/qr` },
        { icon: HeadphonesIcon, label: 'Customer Service', path: `/${role}/support` },
      ];
    }
    
    // Items for other roles (distributor, wholesaler, retailer)
    return [
      ...commonItems,
      { icon: Percent, label: 'Discounts', path: `/${role}/discounts` },
      { icon: Users, label: 'Suppliers', path: `/${role}/suppliers` },
      { icon: Boxes, label: 'Stocks', path: `/${role}/stocks` },
      { icon: QrCode, label: 'QR Scanner', path: `/${role}/qr` },
      { icon: HeadphonesIcon, label: 'Customer Service', path: `/${role}/support` },
    ];
  };

  const menuItems = getMenuItems();

  return (
    <aside 
      className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-nexq-light shadow-md transition-all duration-300 z-40 overflow-y-auto
        ${isOpen ? 'w-64' : 'w-0 -translate-x-full md:translate-x-0 md:w-20'}`}
    >
      <div className="p-4">
        <div className="mb-6 text-center">
          <div className="w-12 h-12 bg-nexq-blue rounded-full mx-auto flex items-center justify-center">
            <span className="text-white text-lg font-bold">
              {userName.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          {isOpen && (
            <div className="mt-2 text-sm font-medium">{userName}</div>
          )}
        </div>

        <nav>
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-3 py-2 rounded-md transition-colors
                      ${isActive 
                        ? 'bg-nexq-blue text-white' 
                        : 'text-gray-700 hover:bg-nexq-orange/10 hover:text-nexq-orange'
                      }
                      ${!isOpen ? 'justify-center' : ''}
                    `}
                  >
                    <IconComponent className={`h-5 w-5 ${!isOpen ? 'mx-auto' : 'mr-3'}`} />
                    {isOpen && <span>{item.label}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
