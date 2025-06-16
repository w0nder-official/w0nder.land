import React from 'react';

export function NeoBrutalistCards() {
  const cards = [
    {
      title: "PROJECT ALPHA",
      description: "A bold exploration of digital spaces with raw geometric forms and experimental layouts.",
      color: "bg-neo-pink",
      accent: "bg-neo-yellow"
    },
    {
      title: "SYSTEM BETA",
      description: "Functional design meets visual disruption in this comprehensive design system.",
      color: "bg-neo-blue",
      accent: "bg-neo-green"
    },
    {
      title: "CONCEPT GAMMA",
      description: "Pushing boundaries with unconventional UI patterns and bold typographic choices.",
      color: "bg-neo-purple",
      accent: "bg-neo-orange"
    }
  ];

  return (
    <section className="bg-neo-yellow py-20 relative">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="bg-black border-brutal inline-block px-8 py-4 shadow-brutal-lg mb-6 transform rotate-1">
            <h2 className="text-white m-0 uppercase tracking-wider">Featured Work</h2>
          </div>
          <p className="text-black text-xl max-w-2xl mx-auto">
            Raw, functional designs that challenge conventional web aesthetics
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {cards.map((card, index) => (
            <div key={index} className="group">
              <div className={`${card.color} border-brutal shadow-brutal-lg hover:shadow-brutal-xl transform hover:-translate-y-3 transition-all duration-300 relative overflow-hidden`}>
                {/* Card header with accent */}
                <div className={`${card.accent} border-b-4 border-black p-1`}>
                  <div className="bg-black text-white px-4 py-2 inline-block text-sm uppercase tracking-wide">
                    0{index + 1}
                  </div>
                </div>

                {/* Card content */}
                <div className="p-6">
                  <h3 className="text-black mb-4 font-brutal">{card.title}</h3>
                  <p className="text-black mb-6 leading-tight">
                    {card.description}
                  </p>

                  {/* Card CTA */}
                  <button className="bg-black border-2 border-black text-white px-6 py-3 shadow-brutal hover:shadow-brutal-lg transition-all duration-200 hover:transform hover:-translate-y-1 uppercase tracking-wide">
                    View Details
                  </button>
                </div>

                {/* Decorative corner element */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-black transform rotate-45"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <button className="bg-neo-red border-brutal px-12 py-6 shadow-brutal-xl text-white hover:shadow-brutal hover:transform hover:translate-y-1 transition-all duration-200 uppercase tracking-wide text-xl">
            See All Projects
          </button>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-10 left-10 w-6 h-6 bg-black transform rotate-45"></div>
      <div className="absolute bottom-10 right-10 w-4 h-4 bg-black rounded-full"></div>
      <div className="absolute top-1/2 left-0 w-12 h-2 bg-neo-red"></div>
      <div className="absolute top-1/3 right-0 w-8 h-8 bg-neo-blue border-2 border-black"></div>
    </section>
  );
}