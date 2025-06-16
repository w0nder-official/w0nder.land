import React from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProfileStats {
  posts: number;
  followers: string;
  following: number;
}

interface ProfileHeaderProps {
  username: string;
  displayName: string;
  bio: string;
  website: string;
  avatarUrl: string;
  stats: ProfileStats;
}

export function ProfileHeader({
  username,
  displayName,
  bio,
  website,
  avatarUrl,
  stats
}: ProfileHeaderProps) {
  return (
    <div className="bg-neo-cyan border-brutal shadow-brutal-xl mx-4 mb-6 p-6 relative">
      {/* Decorative corner elements */}
      <div className="absolute -top-2 -right-2 w-8 h-8 bg-neo-red border-brutal"></div>
      <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-neo-yellow border-2 border-black"></div>
      
      {/* Profile Image Section */}
      <div className="flex items-start justify-between mb-8">
        <div className="relative">
          <div className="w-24 h-24 border-brutal-thick shadow-brutal-lg overflow-hidden bg-white">
            <ImageWithFallback
              src={avatarUrl}
              alt={displayName}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Decorative elements around avatar */}
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-neo-purple border-2 border-black"></div>
          <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-neo-green border-2 border-black"></div>
        </div>
        
        {/* Stats Cards */}
        <div className="flex flex-col space-y-3">
          <div className="bg-neo-pink border-brutal px-3 py-2 shadow-brutal text-right">
            <div className="font-brutal text-xl text-black">{stats.posts}</div>
            <div className="text-xs text-black uppercase tracking-wider">POSTS</div>
          </div>
          <div className="bg-neo-yellow border-brutal px-3 py-2 shadow-brutal text-right">
            <div className="font-brutal text-xl text-black">{stats.followers}</div>
            <div className="text-xs text-black uppercase tracking-wider">FANS</div>
          </div>
          <div className="bg-neo-green border-brutal px-3 py-2 shadow-brutal text-right">
            <div className="font-brutal text-xl text-black">{stats.following}</div>
            <div className="text-xs text-black uppercase tracking-wider">FOLLOW</div>
          </div>
        </div>
      </div>

      {/* Profile Info */}
      <div className="mb-8">
        <div className="bg-black border-brutal px-4 py-2 shadow-brutal inline-block mb-3">
          <h1 className="text-white font-brutal m-0">{displayName}</h1>
        </div>
        <div className="bg-neo-orange border-brutal px-3 py-1 shadow-brutal inline-block mb-4">
          <p className="text-black m-0 uppercase tracking-wide">@{username}</p>
        </div>
        <div className="bg-white border-brutal px-4 py-3 shadow-brutal mb-3">
          <p className="text-black m-0 uppercase tracking-wide">{bio}</p>
        </div>
        <div className="bg-neo-blue border-brutal px-4 py-2 shadow-brutal inline-block">
          <a 
            href={website} 
            className="text-white no-underline uppercase tracking-wide hover:text-neo-yellow transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            {website}
          </a>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <button className="bg-neo-red border-brutal px-4 py-3 shadow-brutal text-white hover:shadow-brutal-lg hover:transform hover:-translate-y-1 transition-all duration-200 uppercase tracking-wide">
          FOLLOW
        </button>
        <button className="bg-neo-purple border-brutal px-4 py-3 shadow-brutal text-white hover:shadow-brutal-lg hover:transform hover:-translate-y-1 transition-all duration-200 uppercase tracking-wide">
          MESSAGE
        </button>
      </div>

      {/* More decorative elements */}
      <div className="absolute top-1/2 right-2 w-2 h-8 bg-neo-lime border-2 border-black hidden"></div>
      <div className="absolute bottom-4 right-4 w-6 h-6 bg-neo-violet border-2 border-black"></div>
    </div>
  );
}