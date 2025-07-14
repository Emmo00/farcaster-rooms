import React from "react";
import { Room, User } from "../types";
import { RoomCard } from "../components/RoomCard";
import { Avatar } from "../components/Avatar";
import { Bell, Plus, Search, Calendar, TrendingUp, Radio } from "lucide-react";
import { useNavigate } from "react-router-dom";

const currentUser: User = {
  id: "current",
  username: "you",
  avatar:
    "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
  displayName: "You",
  followerCount: 1250,
  isFollowing: false,
  bio: "Exploring the decentralized web and building cool things.",
};

const mockUsers: User[] = [
  {
    id: "1",
    username: "vitalik",
    avatar:
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    displayName: "Vitalik Buterin",
    followerCount: 125000,
    isFollowing: true,
    bio: "Co-founder of Ethereum. Interested in crypto, mechanism design, and technology.",
  },
  {
    id: "2",
    username: "dan",
    avatar:
      "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    displayName: "Dan Romero",
    followerCount: 89000,
    isFollowing: false,
    bio: "Co-founder of Farcaster. Former VP at Coinbase. Building the future of social.",
  },
  {
    id: "3",
    username: "jessepollak",
    avatar:
      "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    displayName: "Jesse Pollak",
    followerCount: 67000,
    isFollowing: true,
    bio: "Creator of Base. Head of Protocols at Coinbase. Onchain maximalist.",
  },
  {
    id: "4",
    username: "linda",
    avatar:
      "https://images.pexels.com/photos/2182969/pexels-photo-2182969.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
    displayName: "Linda Chen",
    followerCount: 45000,
    isFollowing: false,
    bio: "Product designer focused on crypto UX. Previously at Uniswap and Compound.",
  },
];

const mockRooms: Room[] = [
  {
    id: "1",
    title: "The Future of Web3 Social",
    topic: "Discussing the evolution of decentralized social networks",
    host: mockUsers[0],
    coHosts: [mockUsers[1]],
    speakers: [mockUsers[2]],
    listeners: [mockUsers[3], currentUser],
    isLive: true,
    isScheduled: false,
    startTime: new Date(Date.now() - 30 * 60 * 1000),
    listenerCount: 247,
    maxListeners: 500,
    privacy: "public",
    hasRecording: true,
    tags: ["web3", "social", "tech"],
  },
  {
    id: "2",
    title: "Base Chain Deep Dive",
    topic: "Technical discussion about Base L2 architecture",
    host: mockUsers[2],
    coHosts: [],
    speakers: [mockUsers[1]],
    listeners: [mockUsers[0]],
    isLive: true,
    isScheduled: false,
    startTime: new Date(Date.now() - 15 * 60 * 1000),
    listenerCount: 89,
    maxListeners: 200,
    privacy: "public",
    hasRecording: false,
    tags: ["base", "l2", "technical"],
  },
  {
    id: "3",
    title: "Farcaster Protocol Updates",
    topic: "Latest developments in the Farcaster ecosystem",
    host: mockUsers[1],
    coHosts: [mockUsers[0]],
    speakers: [],
    listeners: [],
    isLive: false,
    isScheduled: true,
    startTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
    listenerCount: 0,
    maxListeners: 1000,
    privacy: "public",
    hasRecording: true,
    tags: ["farcaster", "protocol", "updates"],
  },
];

const liveRooms = mockRooms.filter((room) => room.isLive && !room.isScheduled);
const scheduledRooms = mockRooms.filter(
  (room) => !room.isLive && room.isScheduled
);

export default function RoomsHome() {
  const navigate = useNavigate();

  function onCreateRoom() {
    navigate("/create-room");
  }

  function onJoinRoom(room: Room) {
    navigate(`/rooms/${room.id}`);
  }

  function onOpenProfile() {
    navigate("/profile/me");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Radio className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Rooms</h1>
            </div>
            <div className="flex items-center space-x-3">
              <button onClick={onOpenProfile} className="p-1">
                <Avatar user={currentUser} size="sm" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-2"></div>
              Live Now
            </h2>
            <span className="text-sm text-gray-500">
              {liveRooms.length} active
            </span>
          </div>
          {liveRooms.length > 0 ? (
            <div className="space-y-3">
              {liveRooms.map((room) => (
                <RoomCard
                  key={room.id}
                  room={room}
                  onClick={() => onJoinRoom(room)}
                  variant="live"
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">No live rooms right now</p>
              <p className="text-sm text-gray-400">
                Be the first to start one!
              </p>
            </div>
          )}
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-gray-600" />
              Upcoming
            </h2>
          </div>
          {scheduledRooms.length > 0 ? (
            <div className="space-y-3">
              {scheduledRooms.map((room) => (
                <RoomCard
                  key={room.id}
                  room={room}
                  onClick={() => onJoinRoom(room)}
                  variant="scheduled"
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-gray-500">No upcoming rooms</p>
            </div>
          )}
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Your Rooms
          </h2>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="text-center">
              <Radio className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500 mb-3">
                You haven't created any rooms yet
              </p>
              <button
                onClick={onCreateRoom}
                className="text-purple-600 font-medium hover:text-purple-700 transition-colors"
              >
                Create your first room
              </button>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={onCreateRoom}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
      >
        <Plus className="w-6 h-6 text-white" />
      </button>
    </div>
  );
}
