
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to home page
    navigate('/');
  }, [navigate]);

  return <div className="min-h-screen bg-gray-100 flex items-center justify-center">Redirecting...</div>;
};

export default Index;
