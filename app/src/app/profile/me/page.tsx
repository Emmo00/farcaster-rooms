"use client"

import React from "react"
import { User } from "../../../types"
import { Avatar } from "../../../components/Avatar"
import { ArrowLeft, Settings, Radio, Users, Calendar, DollarSign } from "lucide-react"
import { useRouter } from "next/navigation"

interface ProfileScreenProps {
  user: User
  onBack: () => void
  onOpenSettings: () => void
}

let currentUser
const user = (currentUser = {
  id: "current",
  username: "you",
  avatar:
    "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
  displayName: "You",
  followerCount: 1250,
  isFollowing: false,
  bio: "Exploring the decentralized web and building cool things.",
})

export default function ProfileScreen() {
  const router = useRouter()
  const stats = [
    { label: "Rooms Hosted", value: "12", icon: Radio },
    {
      label: "Tips Received",
      value: "$10",
      icon: DollarSign,
    },
    { label: "Tips Sent", value: "$89", icon: DollarSign },
  ]

  const recentRooms = [
    {
      id: "1",
      title: "The Future of Web3 Social",
      date: "2 days ago",
      duration: "1h 23m",
      listeners: 247,
    },
    {
      id: "2",
      title: "Building on Base",
      date: "1 week ago",
      duration: "45m",
      listeners: 89,
    },
    {
      id: "3",
      title: "Farcaster Protocol Deep Dive",
      date: "2 weeks ago",
      duration: "2h 15m",
      listeners: 156,
    },
  ]

  function onBack() {
    router.back()
  }

  function onOpenSettings() {
    console.log("Open settings clicked")
    // Implement settings navigation or modal here
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <h1 className="text-xl font-bold text-gray-900">Profile</h1>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={onOpenSettings}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="max-w-md mx-auto px-4 py-6">
        {/* Profile Header */}
        <div className="bg-white rounded-xl p-6 mb-6">
          <div className="flex flex-col items-center text-center mb-6">
            <Avatar user={user} size="xl" className="mx-auto mb-4" />
            <div>
              <h2 className="text-2x1 font-bold text-gray-900 mb-1">
                {user.displayName}
              </h2>
              <p className="text-gray-500 text-sm">@{user.username}</p>
            </div>
          </div>
          <div className="text-center mb-4">
            <div className="grid grid-cols-3 gap-4 mb-6">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <stat.icon className="w-5 h-5 text-purple-600" />
                  </div>
                  <p className="text-xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Rooms */}
        <div className="bg-white rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Rooms
          </h3>

          {recentRooms.length === 0 ? (
            <div className="text-center py-8">
              <Radio className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">No rooms yet</p>
              <p className="text-sm text-gray-400">
                Host your first room to get started
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentRooms.map((room) => (
                <div
                  key={room.id}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-1">
                        {room.title}
                      </h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{room.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Radio className="w-4 h-4" />
                          <span>{room.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{room.listeners}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
