
import { useEffect, useRef } from 'react';

interface ChatSupplyChainSymbolProps {
  active?: boolean;
}

// This is a placeholder component for a future 3D supply chain symbol using Three.js
// For now, we're using CSS animations to simulate the effect
const ChatSupplyChainSymbol = ({ active = false }: ChatSupplyChainSymbolProps) => {
  const symbolRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (active && symbolRef.current) {
      // Add animation classes when active
      symbolRef.current.classList.add('animate-pulse-glow');
    } else if (symbolRef.current) {
      // Remove animation classes when inactive
      symbolRef.current.classList.remove('animate-pulse-glow');
    }
  }, [active]);

  return (
    <div 
      ref={symbolRef}
      className={`relative w-10 h-10 mx-auto ${active ? 'animate-pulse-glow' : ''}`}
    >
      {/* Simple visualization of supply chain nodes */}
      <div className="absolute top-1 left-1 w-3 h-3 bg-nexq-blue rounded-full"></div>
      <div className="absolute top-1 right-1 w-3 h-3 bg-nexq-orange rounded-full"></div>
      <div className="absolute bottom-1 left-1 w-3 h-3 bg-nexq-orange rounded-full"></div>
      <div className="absolute bottom-1 right-1 w-3 h-3 bg-nexq-blue rounded-full"></div>
      
      {/* Connecting lines */}
      <div className="absolute top-2.5 left-2.5 w-5 h-0.5 bg-nexq-blue transform rotate-45"></div>
      <div className="absolute top-2.5 right-2.5 w-5 h-0.5 bg-nexq-orange transform -rotate-45"></div>
      <div className="absolute bottom-2.5 left-2.5 w-5 h-0.5 bg-nexq-orange transform -rotate-45"></div>
      <div className="absolute bottom-2.5 right-2.5 w-5 h-0.5 bg-nexq-blue transform rotate-45"></div>
      
      {/* Center node */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-nexq-blue rounded-full shadow-lg"></div>
    </div>
  );
};

export default ChatSupplyChainSymbol;
