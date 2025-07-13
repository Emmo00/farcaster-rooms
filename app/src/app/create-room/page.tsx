"use client"

import React, { useState } from "react"
import {
  ArrowLeft,
  Globe,
  EyeOff,
  Lock,
  Calendar,
  Users,
  Clock,
} from "lucide-react"
import { useRouter } from "next/navigation"

interface RoomData {
  title: string
  topic: string
  privacy: "public" | "unlisted" | "private"
  isScheduled: boolean
  scheduledDate: string
  scheduledTime: string
  maxListeners?: number
  tags: string[]
}
export default function CreateRoomScreen() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [topic, setTopic] = useState("")
  const [privacy, setPrivacy] = useState<"public" | "unlisted" | "private">(
    "public"
  )
  const [isScheduled, setIsScheduled] = useState(false)
  const [scheduledDate, setScheduledDate] = useState("")
  const [scheduledTime, setScheduledTime] = useState("")
  const [maxListeners, setMaxListeners] = useState("")
  const [tags, setTags] = useState("")

  function onCreateRoom(roomData: RoomData): void {
    console.log("Room created with data:", roomData)

    // navigate to home
    router.push("/home")
  }

  function onBack() {
    router.back()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    const roomData = {
      title: title.trim(),
      topic: topic.trim(),
      privacy,
      isScheduled,
      scheduledDate,
      scheduledTime,
      maxListeners: maxListeners ? parseInt(maxListeners) : undefined,
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0),
    }

    onCreateRoom(roomData)
  }

  const privacyOptions = [
    {
      value: "public" as const,
      label: "Public",
      description: "Anyone can join",
      icon: Globe,
    },
    {
      value: "unlisted" as const,
      label: "Unlisted",
      description: "Only people with the link can join",
      icon: EyeOff,
    },
    {
      value: "private" as const,
      label: "Private",
      description: "Only invited people can join",
      icon: Lock,
    },
  ]

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
              <h1 className="text-xl font-bold text-gray-900">Create Room</h1>
            </div>
            <button
              onClick={handleSubmit}
              disabled={!title.trim()}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isScheduled ? "Schedule" : "Start Room"}
            </button>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-md mx-auto px-4 py-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Room Title *
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What's your room about?"
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              maxLength={100}
            />
            <p className="text-xs text-gray-500 mt-1">{title.length}/100</p>
          </div>

          {/* Topic */}
          <div>
            <label
              htmlFor="topic"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Topic Description
            </label>
            <textarea
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Add more details about what you'll discuss..."
              rows={3}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              maxLength={300}
            />
            <p className="text-xs text-gray-500 mt-1">{topic.length}/300</p>
          </div>

          {/* Privacy */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Privacy Setting
            </label>
            <div className="space-y-2">
              {privacyOptions.map((option) => (
                <label
                  key={option.value}
                  className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${
                    privacy === option.value
                      ? "border-purple-500 bg-purple-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="privacy"
                    value={option.value}
                    checked={privacy === option.value}
                    onChange={(e) => setPrivacy(e.target.value as any)}
                    className="sr-only"
                  />
                  <option.icon className="w-5 h-5 text-gray-600 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">{option.label}</p>
                    <p className="text-sm text-gray-500">
                      {option.description}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Schedule Toggle */}
          <div>
            <label className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={isScheduled}
                onChange={(e) => setIsScheduled(e.target.checked)}
                className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
              />
              <span className="text-sm font-medium text-gray-700">
                Schedule for later
              </span>
            </label>
          </div>

          {/* Schedule Date/Time */}
          {isScheduled && (
            <div className="space-y-4 p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center space-x-2 text-purple-700">
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-medium">Schedule Details</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Time
                  </label>
                  <input
                    type="time"
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Max Listeners */}
          <div>
            <label
              htmlFor="maxListeners"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              <Users className="w-4 h-4 inline mr-1" />
              Max Listeners (Optional)
            </label>
            <input
              type="number"
              id="maxListeners"
              value={maxListeners}
              onChange={(e) => setMaxListeners(e.target.value)}
              placeholder="No limit"
              min="1"
              max="10000"
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Tags */}
          <div>
            <label
              htmlFor="tags"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Tags (Optional)
            </label>
            <input
              type="text"
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="web3, crypto, tech (separate with commas)"
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500 mt-1">
              Add relevant tags to help people discover your room
            </p>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={!title.trim()}
              className="w-full bg-purple-600 text-white font-semibold py-4 px-6 rounded-xl hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isScheduled ? "Schedule Room" : "Start Room Now"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
