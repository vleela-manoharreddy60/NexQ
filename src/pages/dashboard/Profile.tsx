
import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  User, 
  Building, 
  Mail, 
  Phone, 
  FileSpreadsheet, 
  FileText, 
  MapPin, 
  Package, 
  DollarSign,
  Edit,
  Save,
  X
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProfileProps {
  role: 'manufacturer' | 'distributor' | 'wholesaler' | 'retailer';
}

const Profile = ({ role }: ProfileProps) => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  
  // Get profile data based on role
  const getProfileData = () => {
    switch (role) {
      case 'manufacturer':
        return {
          name: 'ABC Electronics',
          type: 'Pvt Ltd',
          contactPerson: 'Anil Kumar',
          email: 'contact@abc.com',
          phone: '+91-9876543210',
          productTypes: '6-10',
          categories: 'Electronics',
          license: 'LIC123456',
          gst: '27AAAAA0000A1Z5',
          pan: 'AAAAA0000A',
          location: 'Mumbai, Maharashtra, 400001',
          warehouses: '2',
          capacity: '5000 units/month',
          moq: '200 units',
          payment: 'COD',
          qrUsage: true
        };
      case 'distributor':
        return {
          name: 'Sri Traders',
          contactPerson: 'Ravi Sharma',
          email: 'ravi@sri.com',
          phone: '+91-8765432109',
          region: 'Maharashtra',
          address: 'Mumbai, 400001',
          gst: '27BBBBB1111B1Z5',
          pan: 'BBBBB1111B',
          categories: 'Electronics',
          stockCapacity: '10000 units',
          preferredSuppliers: 'ABC Electronics',
          moq: '100 units',
          payment: 'Advance',
          qrUsage: true
        };
      case 'wholesaler':
        return {
          name: 'Vijay Wholesalers',
          contactPerson: 'Vijay Patel',
          email: 'vijay@wholesale.com',
          phone: '+91-7654321098',
          region: 'Gujarat',
          address: 'Ahmedabad, 380001',
          gst: '24CCCCC2222C1Z5',
          pan: 'CCCCC2222C',
          categories: 'Electronics',
          stockCapacity: '20000 units',
          preferredSuppliers: 'Sri Traders',
          moq: '500 units',
          maxCapacity: '50000 units',
          payment: 'Credit 30 Days',
          qrUsage: true
        };
      case 'retailer':
        return {
          name: 'Kumar Stores',
          contactPerson: 'Anil Kumar',
          email: 'anil@kumar.com',
          phone: '+91-6543210987',
          region: 'Tamil Nadu',
          address: 'Chennai, 600001',
          gst: '',
          pan: 'DDDDD3333D',
          categories: 'Electronics',
          stockCapacity: '1000 units',
          preferredSuppliers: 'Vijay Wholesalers',
          moq: '50 units',
          payment: 'COD',
          qrUsage: true
        };
      default:
        return {};
    }
  };
  
  const profileData = getProfileData();
  
  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully.",
    });
  };

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold text-nexq-blue">Your Profile</h1>
        
        <div>
          {isEditing ? (
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setIsEditing(false)}
                className="flex items-center gap-2"
              >
                <X className="h-4 w-4" />
                <span>Cancel</span>
              </Button>
              
              <Button
                onClick={handleSave}
                className="bg-nexq-blue hover:bg-nexq-blue/90 flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                <span>Save Changes</span>
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => setIsEditing(true)}
              className="bg-nexq-blue hover:bg-nexq-blue/90 flex items-center gap-2"
            >
              <Edit className="h-4 w-4" />
              <span>Edit Profile</span>
            </Button>
          )}
        </div>
      </div>
      
      {/* User Summary */}
      <div className="bg-white rounded-lg shadow p-6 mb-6 flex flex-col md:flex-row gap-6 items-center md:items-start">
        <div className="w-24 h-24 bg-nexq-blue rounded-full flex items-center justify-center shrink-0">
          <span className="text-white text-3xl font-bold">
            {profileData.name?.substring(0, 2).toUpperCase()}
          </span>
        </div>
        
        <div className="text-center md:text-left grow">
          <h2 className="text-2xl font-bold text-nexq-blue">{profileData.name}</h2>
          <p className="text-nexq-orange font-medium">{role.charAt(0).toUpperCase() + role.slice(1)}</p>
          <p className="text-gray-500">{profileData.email}</p>
        </div>
        
        <div className="bg-nexq-light rounded-lg p-4 text-center shrink-0">
          <p className="text-sm text-gray-500">Inventory</p>
          <p className="text-2xl font-bold text-nexq-blue">
            {role === 'manufacturer' ? '5 types' : ''}
            {role === 'distributor' ? '3 types' : ''}
            {role === 'wholesaler' ? '4 types' : ''}
            {role === 'retailer' ? '2 types' : ''}
          </p>
          <p className="text-lg font-medium text-nexq-orange">
            {role === 'manufacturer' ? '10,000 units' : ''}
            {role === 'distributor' ? '5,000 units' : ''}
            {role === 'wholesaler' ? '20,000 units' : ''}
            {role === 'retailer' ? '500 units' : ''}
          </p>
        </div>
      </div>
      
      {/* Profile Details */}
      <Card>
        <CardHeader>
          <CardTitle>Business Information</CardTitle>
          <CardDescription>
            Your detailed business profile information
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {/* Common Fields */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Building className="h-4 w-4 text-nexq-blue" />
                <span>
                  {role === 'manufacturer' ? 'Company Name' : 
                   role.charAt(0).toUpperCase() + role.slice(1) + ' Name'}
                </span>
              </Label>
              {isEditing ? (
                <Input defaultValue={profileData.name} />
              ) : (
                <div className="p-2 border rounded-md bg-gray-50">{profileData.name}</div>
              )}
            </div>
            
            {role === 'manufacturer' && (
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-nexq-blue" />
                  <span>Company Type</span>
                </Label>
                {isEditing ? (
                  <Input defaultValue={profileData.type} />
                ) : (
                  <div className="p-2 border rounded-md bg-gray-50">{profileData.type}</div>
                )}
              </div>
            )}
            
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <User className="h-4 w-4 text-nexq-blue" />
                <span>Contact Person</span>
              </Label>
              {isEditing ? (
                <Input defaultValue={profileData.contactPerson} />
              ) : (
                <div className="p-2 border rounded-md bg-gray-50">{profileData.contactPerson}</div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-nexq-blue" />
                <span>Email</span>
              </Label>
              {isEditing ? (
                <Input type="email" defaultValue={profileData.email} />
              ) : (
                <div className="p-2 border rounded-md bg-gray-50">{profileData.email}</div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-nexq-blue" />
                <span>Phone</span>
              </Label>
              {isEditing ? (
                <Input defaultValue={profileData.phone} />
              ) : (
                <div className="p-2 border rounded-md bg-gray-50">{profileData.phone}</div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <FileSpreadsheet className="h-4 w-4 text-nexq-blue" />
                <span>
                  GST Number
                  {role === 'retailer' && ' (Optional)'}
                </span>
              </Label>
              {isEditing ? (
                <Input 
                  defaultValue={profileData.gst} 
                  placeholder={role === 'retailer' ? 'Optional' : ''}
                />
              ) : (
                <div className="p-2 border rounded-md bg-gray-50">
                  {profileData.gst || (role === 'retailer' ? 'Not provided' : '')}
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-nexq-blue" />
                <span>PAN Number</span>
              </Label>
              {isEditing ? (
                <Input defaultValue={profileData.pan} />
              ) : (
                <div className="p-2 border rounded-md bg-gray-50">{profileData.pan}</div>
              )}
            </div>
            
            {/* Role-specific Fields */}
            {role === 'manufacturer' ? (
              <>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-nexq-blue" />
                    <span>Location</span>
                  </Label>
                  {isEditing ? (
                    <Input defaultValue={profileData.location} />
                  ) : (
                    <div className="p-2 border rounded-md bg-gray-50">{profileData.location}</div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-nexq-blue" />
                    <span>Product Types</span>
                  </Label>
                  {isEditing ? (
                    <Input defaultValue={profileData.productTypes} />
                  ) : (
                    <div className="p-2 border rounded-md bg-gray-50">{profileData.productTypes}</div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-nexq-blue" />
                    <span>Production Capacity</span>
                  </Label>
                  {isEditing ? (
                    <Input defaultValue={profileData.capacity} />
                  ) : (
                    <div className="p-2 border rounded-md bg-gray-50">{profileData.capacity}</div>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-nexq-blue" />
                    <span>Region</span>
                  </Label>
                  {isEditing ? (
                    <Input defaultValue={profileData.region} />
                  ) : (
                    <div className="p-2 border rounded-md bg-gray-50">{profileData.region}</div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-nexq-blue" />
                    <span>Address</span>
                  </Label>
                  {isEditing ? (
                    <Input defaultValue={profileData.address} />
                  ) : (
                    <div className="p-2 border rounded-md bg-gray-50">{profileData.address}</div>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-nexq-blue" />
                    <span>Stock Capacity</span>
                  </Label>
                  {isEditing ? (
                    <Input defaultValue={profileData.stockCapacity} />
                  ) : (
                    <div className="p-2 border rounded-md bg-gray-50">{profileData.stockCapacity}</div>
                  )}
                </div>
              </>
            )}
            
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-nexq-blue" />
                <span>MOQ</span>
              </Label>
              {isEditing ? (
                <Input defaultValue={profileData.moq} />
              ) : (
                <div className="p-2 border rounded-md bg-gray-50">{profileData.moq}</div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-nexq-blue" />
                <span>Payment Terms</span>
              </Label>
              {isEditing ? (
                <Input defaultValue={profileData.payment} />
              ) : (
                <div className="p-2 border rounded-md bg-gray-50">{profileData.payment}</div>
              )}
            </div>
            
            <div className="space-y-2 col-span-full">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="qrUsage" 
                  checked={profileData.qrUsage} 
                  disabled={!isEditing}
                />
                <Label htmlFor="qrUsage" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Use QR Code for inventory management
                </Label>
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <p className="text-sm text-gray-500">Last updated: April 10, 2025</p>
          
          {isEditing && (
            <Button 
              onClick={handleSave}
              className="bg-nexq-blue hover:bg-nexq-blue/90"
            >
              Save Changes
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default Profile;
