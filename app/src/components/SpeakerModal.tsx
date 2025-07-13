import React from 'react';
import { User } from '../types';
import { Avatar } from './Avatar';
import { X, Users, Heart, DollarSign } from 'lucide-react';

interface SpeakerModalProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
  onFollow: () => void;
  onTip: () => void;
}

export const SpeakerModal: React.FC<SpeakerModalProps> = ({
  user,
  isOpen,
  onClose,
  onFollow,
  onTip,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-sm w-full mx-4 overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="text-center">
            <Avatar user={user} size="xl" className="mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-1">{user.displayName}</h2>
            <p className="text-purple-100">@{user.username}</p>
            
            <div className="flex items-center justify-center space-x-1 mt-3">
              <Users className="w-4 h-4 text-purple-200" />
              <span className="text-sm text-purple-200">
                {user.followerCount.toLocaleString()} followers
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Bio */}
          {user.bio && (
            <div className="mb-6">
              <h3 className="font-medium text-gray-900 mb-2">About</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{user.bio}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={onFollow}
              className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-medium transition-colors ${
                user.isFollowing
                  ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  : 'bg-purple-600 text-white hover:bg-purple-700'
              }`}
            >
              <Heart className={`w-5 h-5 ${user.isFollowing ? 'fill-current' : ''}`} />
              <span>{user.isFollowing ? 'Following' : 'Follow'}</span>
            </button>
            
            <button
              onClick={onTip}
              className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors"
            >
              <DollarSign className="w-5 h-5" />
              <span>Send Tip</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};