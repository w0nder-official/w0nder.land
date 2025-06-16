import React from 'react';

export function NeoBrutalistHeader() {
  return (
    <header className="border-b-4 border-black bg-white relative">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="relative">
            <div className="bg-neo-pink border-brutal px-6 py-3 shadow-brutal transform -rotate-1">
              <h1 className="font-brutal text-white m-0">BRUTAL</h1>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            <a 
              href="#" 
              className="bg-neo-yellow border-brutal px-4 py-2 shadow-brutal hover:shadow-brutal-lg transition-all duration-200 hover:transform hover:-translate-y-1 text-black no-underline uppercase tracking-wide"
            >
              Home
            </a>
            <a 
              href="#" 
              className="bg-neo-blue border-brutal px-4 py-2 shadow-brutal hover:shadow-brutal-lg transition-all duration-200 hover:transform hover:-translate-y-1 text-white no-underline uppercase tracking-wide"
            >
              About
            </a>
            <a 
              href="#" 
              className="bg-neo-green border-brutal px-4 py-2 shadow-brutal hover:shadow-brutal-lg transition-all duration-200 hover:transform hover:-translate-y-1 text-black no-underline uppercase tracking-wide"
            >
              Work
            </a>
            <a 
              href="#" 
              className="bg-neo-orange border-brutal px-4 py-2 shadow-brutal hover:shadow-brutal-lg transition-all duration-200 hover:transform hover:-translate-y-1 text-black no-underline uppercase tracking-wide"
            >
              Contact
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden bg-black border-brutal px-4 py-3 shadow-brutal text-white">
            <div className="w-6 h-0.5 bg-white mb-1"></div>
            <div className="w-6 h-0.5 bg-white mb-1"></div>
            <div className="w-6 h-0.5 bg-white"></div>
          </button>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-2 right-20 w-8 h-8 bg-neo-red border-2 border-black transform rotate-45 hidden lg:block"></div>
      <div className="absolute top-8 right-40 w-4 h-4 bg-neo-purple border-2 border-black rounded-full hidden lg:block"></div>
    </header>
  );
}