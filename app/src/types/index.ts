export interface User {
  id: string;
  username: string;
  avatar: string;
  displayName: string;
  followerCount: number;
  isFollowing: boolean;
  bio?: string;
}

export interface Room {
  id: string;
  title: string;
  topic: string;
  host: User;
  coHosts: User[];
  speakers: User[];
  listeners: User[];
  isLive: boolean;
  isScheduled: boolean;
  startTime: Date;
  endTime?: Date;
  listenerCount: number;
  maxListeners?: number;
  privacy: 'public' | 'unlisted' | 'private';
  hasRecording: boolean;
  tags: string[];
}

export interface ChatMessage {
  id: string;
  user: User;
  content: string;
  timestamp: Date;
  type: 'message' | 'reaction' | 'system';
}

export interface Notification {
  id: string;
  type: 'room_started' | 'room_invite' | 'room_reminder' | 'co_host_invite';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  room?: Room;
  user?: User;
}

export type Screen = 
  | 'welcome'
  | 'home'
  | 'create-room'
  | 'room-lobby'
  | 'live-room'
  | 'room-replay'
  | 'notifications'
  | 'profile'
  | 'settings'
  | 'search';

export interface AppState {
  currentScreen: Screen;
  currentUser: User | null;
  currentRoom: Room | null;
  notifications: Notification[];
  isInRoom: boolean;
  isMuted: boolean;
  hasRaisedHand: boolean;
}