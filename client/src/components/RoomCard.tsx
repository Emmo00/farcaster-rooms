import React from "react";
import { Room } from "../types";
import { Avatar } from "./Avatar";
import { Users, Clock, Lock } from "lucide-react";

interface RoomCardProps {
  room: Room;
  onClick: () => void;
  variant?: "live" | "scheduled" | "replay";
}

export const RoomCard: React.FC<RoomCardProps> = ({
  room,
  onClick,
  variant = "live",
}) => {
  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(date);
  };

  const formatDuration = (startTime: Date, endTime?: Date) => {
    const duration = (endTime || new Date()).getTime() - startTime.getTime();
    const minutes = Math.floor(duration / 60000);
    const hours = Math.floor(minutes / 60);
    return hours > 0 ? `${hours}h ${minutes % 60}m` : `${minutes}m`;
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer border border-gray-100 overflow-hidden"
    >
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Avatar
              user={room.host}
              size="sm"
              showLiveIndicator={room.isLive}
            />
            <div>
              <p className="font-medium text-gray-900 text-sm">
                {room.host.displayName}
              </p>
              <p className="text-xs text-gray-500">@{room.host.username}</p>
            </div>
          </div>
          {room.privacy === "private" && (
            <Lock className="w-4 h-4 text-gray-400" />
          )}
        </div>

        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
          {room.title}
        </h3>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{room.topic}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                {room.listenerCount}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                {variant === "live"
                  ? formatDuration(room.startTime)
                  : variant === "scheduled"
                  ? formatTime(room.startTime)
                  : "Replay"}
              </span>
            </div>
          </div>

          {variant === "live" && (
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-red-600">LIVE</span>
            </div>
          )}
        </div>

        {room.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {room.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
