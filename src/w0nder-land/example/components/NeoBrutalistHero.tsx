import React from 'react';

export function NeoBrutalistHero() {
  return (
    <section className="bg-white py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main headline */}
          <div className="relative mb-8">
            <h1 className="font-brutal text-6xl md:text-8xl lg:text-9xl leading-none text-black relative z-10">
              DESIGN
              <br />
              <span className="text-neo-pink">BOLD</span>
            </h1>
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-neo-yellow border-4 border-black transform rotate-12 hidden md:block"></div>
          </div>

          {/* Subtitle */}
          <div className="bg-neo-cyan border-brutal px-8 py-4 shadow-brutal-lg inline-block mb-12 transform -rotate-1">
            <p className="text-black text-xl md:text-2xl m-0 uppercase tracking-wider">
              Raw • Geometric • Functional
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-neo-red border-brutal px-8 py-4 shadow-brutal-lg text-white hover:shadow-brutal-xl hover:transform hover:-translate-y-2 transition-all duration-200 uppercase tracking-wide">
              Get Started
            </button>
            <button className="bg-white border-brutal px-8 py-4 shadow-brutal-lg text-black hover:shadow-brutal-xl hover:transform hover:-translate-y-2 transition-all duration-200 uppercase tracking-wide">
              View Work
            </button>
          </div>
        </div>
      </div>

      {/* Background geometric shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-12 h-12 bg-neo-green border-3 border-black transform rotate-45"></div>
        <div className="absolute top-40 right-20 w-8 h-8 bg-neo-purple border-3 border-black rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-16 h-16 bg-neo-orange border-3 border-black"></div>
        <div className="absolute bottom-40 right-10 w-6 h-20 bg-neo-blue border-3 border-black"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-4 border-black opacity-10"></div>
        
        {/* Triangle shape */}
        <div className="absolute top-32 right-1/4 w-0 h-0" style={{
          borderLeft: '20px solid transparent',
          borderRight: '20px solid transparent',
          borderBottom: '35px solid var(--neo-yellow)',
          filter: 'drop-shadow(3px 3px 0px #000000)'
        }}></div>
      </div>
    </section>
  );
}