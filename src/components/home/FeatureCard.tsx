
import { ReactNode } from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
}

const FeatureCard = ({ title, description, icon }: FeatureCardProps) => {
  return (
    <div className="bg-white p-5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-nexq-orange group">
      <div className="mb-4 text-nexq-blue group-hover:text-nexq-orange transition-colors">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2 text-nexq-blue">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};

export default FeatureCard;
