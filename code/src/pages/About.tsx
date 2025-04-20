import React from 'react';
import { Code2, Bug, CheckCircle2, Zap } from 'lucide-react';

const About = () => {
  return (
    <div className="bg-white rounded-lg shadow p-8">
      <h2 className="text-3xl font-bold mb-6">About Code Debugger</h2>
      
      <p className="text-gray-600 mb-8">
        Code Debugger is an intelligent tool that helps developers identify and fix issues in their code.
        Using advanced machine learning models, it analyzes code for various types of errors and provides
        suggestions for improvements.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FeatureCard
          icon={<Bug className="h-8 w-8 text-blue-600" />}
          title="Error Detection"
          description="Identifies syntax errors, runtime errors, and logical issues in your code."
        />
        <FeatureCard
          icon={<CheckCircle2 className="h-8 w-8 text-blue-600" />}
          title="Smart Fixes"
          description="Suggests intelligent solutions to fix identified issues in your code."
        />
        <FeatureCard
          icon={<Code2 className="h-8 w-8 text-blue-600" />}
          title="Multiple Languages"
          description="Supports various programming languages with specialized analysis."
        />
        <FeatureCard
          icon={<Zap className="h-8 w-8 text-blue-600" />}
          title="Real-time Analysis"
          description="Get instant feedback and suggestions as you write your code."
        />
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default About;