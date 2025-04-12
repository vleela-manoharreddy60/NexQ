
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, LogOut, Menu } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';

interface HeaderProps {
  toggleSidebar?: () => void;
  showSidebarToggle?: boolean;
}

const Header = ({ toggleSidebar, showSidebarToggle = false }: HeaderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // This would be handled by auth context in a real implementation
  const handleLogout = () => {
    setIsLoggedIn(false);
    // Additional logout logic would go here
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white shadow-sm z-50 px-4">
      <div className="h-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showSidebarToggle && (
            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          )}
          <Link to="/" className="flex items-center">
            <img src="/images/nexq-logo.svg" alt="NexQ Logo" className="h-10 w-10" />
            <span className="ml-2 text-2xl font-bold">
              <span className="text-nexq-blue">Nex</span>
              <span className="text-nexq-orange">Q</span>
            </span>
          </Link>
        </div>
        
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative h-10 w-10 rounded-full">
                <User className="h-6 w-6 text-nexq-blue" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {isLoggedIn ? (
                <>
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="cursor-pointer">Sign In / Register</Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
