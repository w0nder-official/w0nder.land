import React from 'react';
import { ProfileHeader } from './components/ProfileHeader';
import { LinksSection } from './components/LinksSection';
import { BottomNavigation } from './components/BottomNavigation';

export default function App() {
  // Mock user data
  const userProfile = {
    username: 'BRUTAL_USER',
    displayName: 'SAM SMITH',
    bio: 'ALWAYS A WINNER! 🏆 RAW CREATIVE ENERGY',
    website: 'BRUTAL.WEBSITE.COM',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    stats: {
      posts: 184,
      followers: '536K',
      following: 230
    }
  };

  // Mock links data with Neo-Brutalist styling
  const links = [
    {
      id: '1',
      title: 'YOUTUBE CHANNEL',
      description: 'SUBSCRIBE FOR CHAOS',
      url: 'https://youtube.com',
      icon: '📺',
      bgColor: 'bg-neo-red',
      textColor: 'text-white',
      rotate: false,
      size: 'large' as const
    },
    {
      id: '2',
      title: 'INSTAGRAM',
      description: 'FOLLOW THE MADNESS',
      url: 'https://instagram.com',
      icon: '📸',
      bgColor: 'bg-neo-purple',
      textColor: 'text-white',
      rotate: false
    },
    {
      id: '3',
      title: 'LATEST BLOG POST',
      description: 'RAW THOUGHTS UNLEASHED',
      url: 'https://blog.example.com',
      icon: '✍️',
      bgColor: 'bg-neo-blue',
      textColor: 'text-white',
      rotate: false
    },
    {
      id: '4',
      title: 'SHOP MERCH',
      description: 'BRUTAL FASHION COLLECTION',
      url: 'https://shop.example.com',
      icon: '🛍️',
      bgColor: 'bg-neo-green',
      textColor: 'text-black',
      rotate: false
    },
    {
      id: '5',
      title: 'BOOK A CALL',
      description: 'CONSULTATION CHAOS',
      url: 'https://calendly.com',
      icon: '📞',
      bgColor: 'bg-neo-orange',
      textColor: 'text-black',
      rotate: false
    },
    {
      id: '6',
      title: 'NEWSLETTER',
      description: 'WEEKLY BRAIN FOOD',
      url: 'https://newsletter.example.com',
      icon: '📧',
      bgColor: 'bg-white',
      textColor: 'text-black',
      rotate: false
    },
    {
      id: '7',
      title: 'SPOTIFY BEATS',
      description: 'CURRENT SOUND VIBES',
      url: 'https://spotify.com',
      icon: '🎵',
      bgColor: 'bg-neo-yellow',
      textColor: 'text-black',
      rotate: false
    }
  ];

  return (
    <div className="min-h-screen bg-dots-small">
      {/* Full-width background with small dots */}
      <div className="w-full flex justify-center">
        {/* Mobile-width content container with semi-transparent background */}
        <div className="w-full max-w-md bg-neo-cyan-light pb-24 relative overflow-hidden">
          {/* Background decorative elements (only within mobile container) */}
          <div className="absolute top-10 left-4 w-6 h-6 bg-neo-red border-2 border-black z-10"></div>
          <div className="absolute top-20 right-6 w-4 h-12 bg-neo-yellow border-2 border-black z-10"></div>
          <div className="absolute top-40 left-2 w-8 h-8 bg-neo-purple border-2 border-black z-10"></div>
          <div className="absolute bottom-40 right-4 w-5 h-5 bg-neo-green border-2 border-black z-10"></div>
          
          {/* Header with brutal styling */}
          <div className="bg-white border-b-5 border-black shadow-brutal-lg relative z-20">
            <div className="flex items-center justify-between p-4">
              <button className="bg-neo-pink border-brutal p-3 shadow-brutal hover:shadow-brutal-lg hover:transform hover:-translate-y-1 transition-all">
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                  <path strokeLinecap="square" strokeLinejoin="miter" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <div className="bg-black border-brutal px-4 py-2 shadow-brutal">
                <h2 className="text-white font-brutal m-0 uppercase tracking-wider">{userProfile.username}</h2>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="bg-neo-yellow border-brutal p-3 shadow-brutal hover:shadow-brutal-lg hover:transform hover:-translate-y-1 transition-all">
                  <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </button>
                <button className="bg-neo-green border-brutal p-3 shadow-brutal hover:shadow-brutal-lg hover:transform hover:-translate-y-1 transition-all">
                  <div className="w-2 h-2 bg-black mb-1"></div>
                  <div className="w-2 h-2 bg-black mb-1"></div>
                  <div className="w-2 h-2 bg-black"></div>
                </button>
              </div>
            </div>
            
            {/* Header decorative elements */}
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-neo-red border-2 border-black z-10"></div>
          </div>

          {/* Profile Header */}
          <div className="pt-6 relative z-20">
            <ProfileHeader
              username={userProfile.username}
              displayName={userProfile.displayName}
              bio={userProfile.bio}
              website={userProfile.website}
              avatarUrl={userProfile.avatarUrl}
              stats={userProfile.stats}
            />
          </div>

          {/* Content Toggle with brutal design */}
          <div className="px-4 mb-6 relative z-20">
            <div className="bg-white border-brutal shadow-brutal-lg p-3 flex relative">
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-neo-lime border-2 border-black z-10"></div>
              
              <button className="flex-1 py-4 bg-neo-blue border-brutal shadow-brutal text-white hover:shadow-brutal-lg hover:transform hover:-translate-y-1 transition-all mr-2">
                <div className="flex items-center justify-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                    <path strokeLinecap="square" strokeLinejoin="miter" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                  <span className="font-brutal uppercase tracking-wider">LINKS</span>
                </div>
              </button>
              <button className="flex-1 py-4 bg-white border-brutal shadow-brutal text-black hover:shadow-brutal-lg hover:transform hover:-translate-y-1 transition-all ml-2">
                <div className="flex items-center justify-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                    <path strokeLinecap="square" strokeLinejoin="miter" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="font-brutal uppercase tracking-wider">ABOUT</span>
                </div>
              </button>
            </div>
          </div>

          {/* Links Section */}
          <div className="relative z-20">
            <LinksSection links={links} />
          </div>

          {/* Bottom Navigation */}
          <div className="relative z-20">
            <BottomNavigation />
          </div>
        </div>
      </div>
      
      {/* Desktop-only decorative elements scattered around the dotted background */}
      <div className="hidden md:block">
        {/* Left side decorations */}
        <div className="fixed top-20 left-8 w-12 h-12 bg-neo-pink border-brutal shadow-brutal-lg z-30"></div>
        <div className="fixed top-60 left-16 w-8 h-16 bg-neo-orange border-brutal shadow-brutal z-30"></div>
        <div className="fixed bottom-40 left-12 w-16 h-8 bg-neo-lime border-brutal shadow-brutal-lg z-30"></div>
        
        {/* Right side decorations */}
        <div className="fixed top-32 right-12 w-10 h-10 bg-neo-violet border-brutal shadow-brutal z-30"></div>
        <div className="fixed top-80 right-8 w-6 h-20 bg-neo-blue border-brutal shadow-brutal-lg z-30"></div>
        <div className="fixed bottom-60 right-20 w-14 h-14 bg-neo-yellow border-brutal shadow-brutal z-30"></div>
        
        {/* Additional scattered elements */}
        <div className="fixed top-1/2 left-1/4 w-4 h-12 bg-neo-red border-brutal shadow-brutal transform -rotate-12 z-30"></div>
        <div className="fixed top-1/3 right-1/4 w-12 h-4 bg-neo-green border-brutal shadow-brutal transform rotate-12 z-30"></div>
        
        {/* Extra desktop decorations for more chaos */}
        <div className="fixed bottom-20 left-1/3 w-8 h-8 bg-neo-purple border-brutal shadow-brutal z-30"></div>
        <div className="fixed top-3/4 right-1/3 w-6 h-14 bg-neo-cyan border-brutal shadow-brutal-lg z-30"></div>
      </div>
    </div>
  );
}