import React, { useState } from "react";
import { Room, User, ChatMessage } from "../types";
import { Avatar } from "../components/Avatar";
import { SpeakerModal } from "../components/SpeakerModal";
import {
  ArrowLeft,
  Mic,
  MicOff,
  Hand,
  Share2,
  MoreVertical,
  MessageCircle,
  Heart,
  Smile,
  ThumbsUp,
  Users,
} from "lucide-react";

export default function LiveRoom({
  room,
  currentUser,
  onLeave,
  onToggleMute,
  onToggleRaiseHand,
  onInvite,
}) {
  const [showChat, setShowChat] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [hasRaisedHand, setHasRaisedHand] = useState(true);
  const [chatMessage, setChatMessage] = useState("");
  const [messages, setMessages] = useState<
    {
      id: string;
      user: User;
      content: string;
      timestamp: Date;
      type: "message";
    }[]
  >([]);
  const [reactionAnimation, setReactionAnimation] = useState(null);
  const [selectedSpeaker, setSelectedSpeaker] = useState(null);

  const speakers = [room.host, ...room.coHosts, ...room.speakers];
  const isUserSpeaker = speakers.some(
    (speaker) => speaker.id === currentUser.id
  );

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;

    const newMessage: {
      id: string;
      user: User;
      content: string;
      timestamp: Date;
      type: "message";
    } = {
      id: Date.now().toString(),
      user: currentUser,
      content: chatMessage,
      timestamp: new Date(),
      type: "message",
    };

    setMessages((prev) => [...prev, newMessage]);
    setChatMessage("");
  };

  const handleReaction = (emoji) => {
    setReactionAnimation(emoji);
    setTimeout(() => setReactionAnimation(null), 2000);
  };

  const handleSpeakerClick = (speaker) => setSelectedSpeaker(speaker);
  const handleFollowSpeaker = () => {
    if (selectedSpeaker) setSelectedSpeaker(null);
  };
  const handleTipSpeaker = () => {
    if (selectedSpeaker) setSelectedSpeaker(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-blue-900 text-white">
      <div className="bg-black/20 backdrop-blur-sm">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <button
              onClick={onLeave}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium">LIVE</span>
            </div>
            <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-4">
        <div className="text-center mb-6">
          <h1 className="text-xl font-bold mb-2">{room.title}</h1>
          <p className="text-purple-200 text-sm">{room.topic}</p>
          <div className="flex items-center justify-center space-x-4 mt-3">
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4 text-purple-300" />
              <span className="text-sm text-purple-300">
                {room.listenerCount} listening
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white/10 rounded-2xl p-6 mb-6 backdrop-blur-sm">
          <div className="grid grid-cols-2 gap-4">
            {speakers.slice(0, 4).map((speaker) => (
              <div
                key={speaker.id}
                className="text-center cursor-pointer hover:bg-white/10 rounded-xl p-2 transition-colors"
                onClick={() => handleSpeakerClick(speaker)}
              >
                <div className="relative mb-2">
                  <Avatar
                    user={speaker}
                    size="lg"
                    className="mx-auto"
                    showBorder={speaker.id === room.host.id}
                  />
                  {speaker.id === room.host.id && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-black text-xs px-2 py-1 rounded-full font-medium">
                      Host
                    </div>
                  )}
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                    <Mic className="w-3 h-3 text-white" />
                  </div>
                </div>
                <p className="text-sm font-medium">{speaker.displayName}</p>
                <p className="text-xs text-purple-300">@{speaker.username}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-sm font-medium text-purple-200 mb-3">
            Listeners ({room.listeners.length})
          </h3>
          <div className="grid grid-cols-8 gap-2">
            {room.listeners.slice(0, 16).map((listener) => (
              <Avatar key={listener.id} user={listener} size="sm" />
            ))}
            {room.listeners.length > 16 && (
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                <span className="text-xs font-medium">
                  +{room.listeners.length - 16}
                </span>
              </div>
            )}
          </div>
        </div>

        {reactionAnimation && (
          <div className="fixed inset-0 pointer-events-none flex items-center justify-center">
            <div className="text-6xl animate-ping">{reactionAnimation}</div>
          </div>
        )}

        {showChat && (
          <div className="fixed inset-x-0 bottom-20 top-1/2 bg-black/80 backdrop-blur-sm rounded-t-2xl p-4">
            <div className="max-w-md mx-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Chat</h3>
                <button
                  onClick={() => setShowChat(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ×
                </button>
              </div>
              <div className="h-40 overflow-y-auto space-y-2 mb-4">
                {messages.map((message) => (
                  <div key={message.id} className="flex items-start space-x-2">
                    <Avatar user={message.user} size="sm" />
                    <div>
                      <p className="text-sm font-medium">
                        {message.user.displayName}
                      </p>
                      <p className="text-sm text-gray-300">{message.content}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-3 py-2 bg-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                />
                <button
                  onClick={handleSendMessage}
                  className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-black/40 backdrop-blur-sm border-t border-white/10">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <button
              onClick={() => handleReaction("❤️")}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <Heart className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleReaction("👍")}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <ThumbsUp className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleReaction("😂")}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <Smile className="w-5 h-5" />
            </button>
            <button
              onClick={() => setShowChat(!showChat)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <button
              onClick={onLeave}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Leave
            </button>
            <div className="flex items-center space-x-4">
              {isUserSpeaker && (
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                    isMuted
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-white/20 hover:bg-white/30"
                  }`}
                >
                  {isMuted ? (
                    <MicOff className="w-6 h-6" />
                  ) : (
                    <Mic className="w-6 h-6" />
                  )}
                </button>
              )}
              {!isUserSpeaker && (
                <button
                  onClick={() => setHasRaisedHand(!hasRaisedHand)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                    hasRaisedHand
                      ? "bg-yellow-500 hover:bg-yellow-600"
                      : "bg-white/20 hover:bg-white/30"
                  }`}
                >
                  <Hand className="w-6 h-6" />
                </button>
              )}
              <button
                onClick={onInvite}
                className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all"
              >
                <Share2 className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {selectedSpeaker && (
        <SpeakerModal
          user={selectedSpeaker}
          isOpen={!!selectedSpeaker}
          onClose={() => setSelectedSpeaker(null)}
          onFollow={handleFollowSpeaker}
          onTip={handleTipSpeaker}
        />
      )}
    </div>
  );
}
