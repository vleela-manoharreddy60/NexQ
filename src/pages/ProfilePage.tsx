
import { useState } from 'react';
import Header from '@/components/layout/Header';
import RoleSelector from '@/components/profile/RoleSelector';
import LoginForm from '@/components/profile/LoginForm';
import RegistrationForm from '@/components/profile/RegistrationForm';

type Role = 'manufacturer' | 'distributor' | 'wholesaler' | 'retailer';

const ProfilePage = () => {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [isLoginMode, setIsLoginMode] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 pt-16">
        <div className="container max-w-6xl px-4 py-8 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Left Column - Role Selection */}
            <RoleSelector
              selectedRole={selectedRole}
              isLoginMode={isLoginMode}
              onRoleSelect={setSelectedRole}
              onModeToggle={setIsLoginMode}
            />
            
            {/* Right Column - Dynamic Form Area */}
            <div className="bg-white p-6 rounded-lg shadow-md min-h-[400px]">
              {selectedRole ? (
                isLoginMode ? (
                  <LoginForm selectedRole={selectedRole} />
                ) : (
                  <RegistrationForm role={selectedRole} />
                )
              ) : (
                <div className="h-full flex items-center justify-center text-center">
                  <div>
                    <p className="text-gray-500 mb-4">Select a role to register or sign in</p>
                    <img 
                      src="/images/nexq-logo.svg" 
                      alt="NexQ" 
                      className="w-32 h-32 mx-auto opacity-50" 
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-white py-6 shadow-md">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>© 2025 NexQ. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ProfilePage;
