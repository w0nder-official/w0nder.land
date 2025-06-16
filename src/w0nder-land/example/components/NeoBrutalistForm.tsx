import React, { useState } from 'react';

export function NeoBrutalistForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    project: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <section className="bg-white py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-16">
            <div className="bg-neo-green border-brutal inline-block px-8 py-4 shadow-brutal-lg mb-6 transform -rotate-1">
              <h2 className="text-black m-0 uppercase tracking-wider">Start a Project</h2>
            </div>
            <p className="text-black text-xl max-w-2xl mx-auto">
              Ready to create something bold? Let's make it happen.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Form */}
            <div className="bg-neo-cyan border-brutal shadow-brutal-xl p-8 relative">
              {/* Decorative corner */}
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-neo-red border-2 border-black"></div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-black mb-2 uppercase tracking-wide">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full border-brutal px-4 py-3 bg-white text-black shadow-brutal focus:shadow-brutal-lg focus:outline-none focus:transform focus:-translate-y-1 transition-all duration-200"
                    placeholder="YOUR FULL NAME"
                  />
                </div>

                <div>
                  <label className="block text-black mb-2 uppercase tracking-wide">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full border-brutal px-4 py-3 bg-white text-black shadow-brutal focus:shadow-brutal-lg focus:outline-none focus:transform focus:-translate-y-1 transition-all duration-200"
                    placeholder="YOUR@EMAIL.COM"
                  />
                </div>

                <div>
                  <label className="block text-black mb-2 uppercase tracking-wide">Project Type</label>
                  <select
                    name="project"
                    value={formData.project}
                    onChange={handleInputChange}
                    className="w-full border-brutal px-4 py-3 bg-white text-black shadow-brutal focus:shadow-brutal-lg focus:outline-none focus:transform focus:-translate-y-1 transition-all duration-200"
                  >
                    <option value="">SELECT PROJECT TYPE</option>
                    <option value="website">WEBSITE DESIGN</option>
                    <option value="app">APP INTERFACE</option>
                    <option value="branding">BRAND IDENTITY</option>
                    <option value="other">OTHER</option>
                  </select>
                </div>

                <div>
                  <label className="block text-black mb-2 uppercase tracking-wide">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full border-brutal px-4 py-3 bg-white text-black shadow-brutal focus:shadow-brutal-lg focus:outline-none focus:transform focus:-translate-y-1 transition-all duration-200 resize-none"
                    placeholder="TELL US ABOUT YOUR PROJECT..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-neo-red border-brutal px-8 py-4 shadow-brutal-lg text-white hover:shadow-brutal-xl hover:transform hover:-translate-y-2 transition-all duration-200 uppercase tracking-wide"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Info panel */}
            <div className="space-y-6">
              <div className="bg-neo-purple border-brutal shadow-brutal-lg p-6 transform rotate-1">
                <h3 className="text-white mb-4 font-brutal">Let's Connect</h3>
                <p className="text-white leading-tight">
                  Ready to push boundaries and create something extraordinary? 
                  Drop us a message and let's start building the future of design.
                </p>
              </div>

              <div className="bg-neo-yellow border-brutal shadow-brutal-lg p-6 transform -rotate-1">
                <h4 className="text-black mb-3 uppercase tracking-wide">Response Time</h4>
                <p className="text-black">
                  We typically respond within 24 hours. Urgent projects? 
                  Mark it in your message and we'll prioritize it.
                </p>
              </div>

              <div className="bg-black border-brutal shadow-brutal-lg p-6">
                <h4 className="text-white mb-3 uppercase tracking-wide">What to Expect</h4>
                <ul className="text-white space-y-2">
                  <li>• Initial consultation call</li>
                  <li>• Project scope &amp; timeline</li>
                  <li>• Bold, functional design</li>
                  <li>• Ongoing support</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-20 right-20 w-12 h-12 bg-neo-orange border-3 border-black transform rotate-12 hidden lg:block"></div>
      <div className="absolute bottom-20 left-20 w-8 h-16 bg-neo-blue border-3 border-black hidden lg:block"></div>
      <div className="absolute top-1/2 right-10 w-6 h-6 bg-neo-pink border-3 border-black rounded-full hidden lg:block"></div>
    </section>
  );
}