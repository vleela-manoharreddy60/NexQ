
import { useState, useEffect, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PaperclipIcon, SendIcon, ImageIcon, FileIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data for contacts and conversations
const mockContacts = [
  {
    id: 1,
    name: 'Sri Traders',
    role: 'Distributor',
    avatar: '/placeholder.svg',
    unread: 2,
    lastMessage: 'Need 200 units of Smartphone X1.',
    lastMessageTime: '16:00'
  },
  {
    id: 2,
    name: 'Vijay Wholesalers',
    role: 'Wholesaler',
    avatar: '/placeholder.svg',
    unread: 1,
    lastMessage: 'MOQ for Charger C1?',
    lastMessageTime: '15:30'
  },
  {
    id: 3,
    name: 'Ravi Distributors',
    role: 'Distributor',
    avatar: '/placeholder.svg',
    unread: 0,
    lastMessage: 'Order confirmed.',
    lastMessageTime: 'Yesterday'
  }
];

const mockConversations = {
  1: [
    {
      id: 1,
      sender: 'Sri Traders',
      message: 'Hi ABC Electronics, can you send 500 units of Smartphone X1?',
      timestamp: '10-Apr-2025, 14:30',
      isReceived: true
    },
    {
      id: 2,
      sender: 'ABC Electronics',
      message: 'MOQ is 200, confirming 500 units. ETA 12-Apr-2025.',
      timestamp: '10-Apr-2025, 14:35',
      isReceived: false,
      attachment: {
        type: 'qr',
        content: 'Order #123, 500 units'
      }
    },
    {
      id: 3,
      sender: 'Sri Traders',
      message: 'Thanks! Attaching specs.',
      timestamp: '10-Apr-2025, 15:00',
      isReceived: true,
      attachment: {
        type: 'image',
        content: '/placeholder.svg',
        name: 'Smartphone X1.jpg'
      }
    },
    {
      id: 4,
      sender: 'Sri Traders',
      message: 'Any discounts for 1000 units?',
      timestamp: '10-Apr-2025, 16:00',
      isReceived: true,
      new: true
    }
  ],
  2: [
    {
      id: 1,
      sender: 'Vijay Wholesalers',
      message: 'Hello ABC Electronics. What is the MOQ for Charger C1?',
      timestamp: '10-Apr-2025, 15:30',
      isReceived: true,
      new: true
    }
  ],
  3: [
    {
      id: 1,
      sender: 'Ravi Distributors',
      message: 'Order confirmed.',
      timestamp: '9-Apr-2025, 12:00',
      isReceived: true
    }
  ]
};

interface MessagesProps {
  role: 'manufacturer' | 'distributor' | 'wholesaler' | 'retailer';
}

const Messages = ({ role }: MessagesProps) => {
  const [contacts, setContacts] = useState(mockContacts);
  const [activeContact, setActiveContact] = useState<number | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Load messages when active contact changes
  useEffect(() => {
    if (activeContact) {
      setMessages(mockConversations[activeContact as keyof typeof mockConversations] || []);
    }
  }, [activeContact]);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Mark messages as read when opening a conversation
  useEffect(() => {
    if (activeContact) {
      setContacts(prevContacts => 
        prevContacts.map(contact => 
          contact.id === activeContact 
            ? { ...contact, unread: 0 } 
            : contact
        )
      );
    }
  }, [activeContact]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeContact) return;
    
    const newMsg = {
      id: messages.length + 1,
      sender: role === 'manufacturer' ? 'ABC Electronics' : 'Your Company',
      message: newMessage,
      timestamp: new Date().toLocaleString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      isReceived: false
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
    
    // Simulate response after a delay
    if (activeContact === 1) {
      setTimeout(() => {
        const response = {
          id: messages.length + 2,
          sender: 'Sri Traders',
          message: 'Thanks for the information. I will place the order soon.',
          timestamp: new Date().toLocaleString('en-IN'),
          isReceived: true,
          new: true
        };
        setMessages(prev => [...prev, response]);
        
        // Update unread count in contacts
        setContacts(prevContacts => 
          prevContacts.map(contact => 
            contact.id === activeContact 
              ? { ...contact, lastMessage: response.message, unread: contact.unread + 1 } 
              : contact
          )
        );
      }, 5000);
    }
  };

  const handleAttachment = () => {
    toast({
      title: "Feature coming soon",
      description: "File attachments will be available in the next update.",
      variant: "default",
    });
  };

  return (
    <div className="flex flex-col h-full">
      {/* WhatsApp-like header */}
      <div className="bg-nexq-blue text-white py-4 text-center flex justify-center items-center">
        <div className="animate-pulse">
          <img 
            src="/images/nexq-logo.svg" 
            alt="NexQ Logo" 
            className="h-12 w-12 mx-auto"
          />
        </div>
        <h1 className="text-xl font-bold ml-4">NexQ Messaging</h1>
      </div>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Left panel - Contacts */}
        <div className="w-1/3 border-r border-gray-200 overflow-y-auto bg-gray-50">
          <div className="p-4 border-b border-gray-200">
            <h2 className="font-semibold text-lg text-nexq-blue">Contacts</h2>
            <p className="text-sm text-gray-500">
              {contacts.reduce((total, contact) => total + contact.unread, 0)} unread messages
            </p>
          </div>
          
          <div className="divide-y divide-gray-200">
            {contacts.map(contact => (
              <div 
                key={contact.id}
                className={`p-4 hover:bg-gray-100 cursor-pointer transition-all duration-300 animate-fade-in
                  ${activeContact === contact.id ? 'bg-nexq-blue/10 border-l-4 border-nexq-blue' : ''}
                  ${contact.unread > 0 ? 'font-semibold' : ''}`}
                onClick={() => setActiveContact(contact.id)}
              >
                <div className="flex items-center">
                  <div className="relative">
                    <Avatar className="h-12 w-12 border-2 border-gray-200">
                      <AvatarImage src={contact.avatar} alt={contact.name} />
                      <AvatarFallback className="bg-nexq-orange text-white">
                        {contact.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    {contact.unread > 0 && (
                      <span className="absolute top-0 right-0 bg-nexq-orange text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse-glow">
                        {contact.unread}
                      </span>
                    )}
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-900">{contact.name}</span>
                      <span className="text-xs text-gray-500">{contact.lastMessageTime}</span>
                    </div>
                    <p className="text-sm text-gray-500 truncate">{contact.role}</p>
                    <p className="text-sm truncate">{contact.lastMessage}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Right panel - Chat */}
        <div className="w-2/3 flex flex-col bg-gray-100">
          {!activeContact ? (
            <div className="flex-1 flex items-center justify-center p-6">
              <div className="text-center animate-fade-in">
                <div className="mb-6 animate-float">
                  <img 
                    src="/images/nexq-logo.svg" 
                    alt="NexQ Logo" 
                    className="h-20 w-20 mx-auto"
                  />
                </div>
                <h2 className="text-xl font-semibold text-nexq-blue mb-2">Welcome to NexQ Messaging!</h2>
                <p className="text-gray-600 max-w-md">
                  Connect with your supply chain partners instantly. 
                  Select a contact from the left to start messaging.
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Chat header */}
              <div className="bg-white p-4 border-b border-gray-200 flex items-center">
                <Avatar className="h-10 w-10">
                  <AvatarImage 
                    src={contacts.find(c => c.id === activeContact)?.avatar} 
                    alt={contacts.find(c => c.id === activeContact)?.name} 
                  />
                  <AvatarFallback className="bg-nexq-blue text-white">
                    {contacts.find(c => c.id === activeContact)?.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="ml-3">
                  <h3 className="font-medium text-gray-900">
                    {contacts.find(c => c.id === activeContact)?.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {contacts.find(c => c.id === activeContact)?.role}
                  </p>
                </div>
              </div>
              
              {/* Chat messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map(msg => (
                  <div 
                    key={msg.id} 
                    className={`max-w-[75%] ${msg.isReceived ? 'ml-0' : 'ml-auto'} 
                      animate-fade-in ${msg.new ? 'animate-scale-in' : ''}`}
                  >
                    <div 
                      className={`rounded-lg p-3 ${
                        msg.isReceived 
                          ? 'bg-nexq-orange text-white rounded-tl-none' 
                          : 'bg-nexq-blue text-white rounded-tr-none'
                      }`}
                    >
                      <p>{msg.message}</p>
                      
                      {msg.attachment && (
                        <div className="mt-2">
                          {msg.attachment.type === 'image' && (
                            <div className="mt-1 group relative overflow-hidden rounded-md hover:scale-105 transition-transform">
                              <img 
                                src={msg.attachment.content} 
                                alt={msg.attachment.name} 
                                className="w-full h-auto max-h-48 object-cover border-2 border-white/50"
                              />
                              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs py-1 px-2 transition-opacity opacity-0 group-hover:opacity-100">
                                {msg.attachment.name}
                              </div>
                            </div>
                          )}
                          
                          {msg.attachment.type === 'qr' && (
                            <div className="mt-1 bg-white p-2 rounded">
                              <div className="text-black text-sm text-center p-2">
                                {msg.attachment.content}
                              </div>
                              {/* Placeholder for actual QR code */}
                              <div className="w-32 h-32 mx-auto border-2 border-nexq-blue/30 flex items-center justify-center bg-gray-100">
                                <div className="text-xs text-gray-500">QR Code</div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {msg.timestamp}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              
              {/* Chat input */}
              <div className="bg-white p-3 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-nexq-orange hover:text-nexq-orange/80 hover:bg-nexq-orange/10"
                    onClick={handleAttachment}
                  >
                    <PaperclipIcon className="h-5 w-5" />
                  </Button>
                  
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message"
                    className="flex-1 focus-visible:ring-nexq-blue"
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  
                  <Button
                    variant="default"
                    size="icon"
                    className="bg-nexq-blue hover:bg-nexq-blue/90"
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                  >
                    <SendIcon className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
