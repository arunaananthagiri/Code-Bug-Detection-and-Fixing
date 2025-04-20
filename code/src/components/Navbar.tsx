import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, Info } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Code2 className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-semibold">Code Debugger</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md"
            >
              Debug Code
            </Link>
            <Link 
              to="/about" 
              className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md"
            >
              <Info className="h-4 w-4" />
              <span>About</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;