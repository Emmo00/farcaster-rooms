import React from 'react';
import { Radio, Users, MessageCircle, Sparkles } from 'lucide-react';

interface WelcomeScreenProps {
  onCreateRoom: () => void;
  onSkipToHome: () => void;
}

export default function WelcomeScreen({
  onCreateRoom,
  onSkipToHome,
}: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-blue-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
            <Radio className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Farcaster Rooms
          </h1>
          <p className="text-purple-100 text-lg">
            Live Audio Spaces, on Farcaster
          </p>
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex items-center space-x-3 text-white/90">
            <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
            <span>Join live audio conversations</span>
          </div>
          <div className="flex items-center space-x-3 text-white/90">
            <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
              <MessageCircle className="w-4 h-4" />
            </div>
            <span>Connect with your Farcaster network</span>
          </div>
          <div className="flex items-center space-x-3 text-white/90">
            <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <span>Host your own audio spaces</span>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={onCreateRoom}
            className="w-full bg-white text-purple-700 font-semibold py-4 px-6 rounded-xl hover:bg-gray-50 transition-colors duration-200"
          >
            Create Your First Room
          </button>
          <button
            onClick={onSkipToHome}
            className="w-full bg-white/10 text-white font-medium py-4 px-6 rounded-xl hover:bg-white/20 transition-colors duration-200 backdrop-blur-sm"
          >
            Browse Live Rooms
          </button>
        </div>

        <p className="text-center text-purple-200 text-sm mt-6">
          Connect with your Farcaster account to get started
        </p>
      </div>
    </div>
  );
};