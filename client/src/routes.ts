import React from "react";
import CreateRoom from "./pages/CreateRoom";
import RoomsHome from "./pages/RoomsHome";
import MyProfile from "./pages/MyProfile";
import Room from "./pages/Room";
import Welcome from "./pages/Welcome";

export const routes = {
  welcome: "/",
  createRoom: "/create-room",
  roomsHome: "/home",
  profile: "/profile",
  room: "/rooms/:id",
};

export const pages: { path: string; component: React.FC<any> }[] = [
  {
    path: routes.welcome,
    component: Welcome,
  },
  {
    path: routes.createRoom,
    component: CreateRoom,
  },
  {
    path: routes.roomsHome,
    component: RoomsHome,
  },
  {
    path: routes.profile,
    component: MyProfile,
  },
  {
    path: routes.room,
    component: Room,
  },
];
