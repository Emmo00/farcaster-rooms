const mongoose = require("mongoose")

const RoomSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      default: () => new mongoose.Types.ObjectId().toString(),
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: false,
      trim: true,
    },
    hostFid: {
      type: String,
      required: true,
      trim: true,
    },
    visibility: {
      type: String,
      enum: ["public", "private", "unlisted"],
      default: "public",
    },
    hasStarted: {
      type: Boolean,
      required: true,
      default: false,
    },
    hasEnded: {
      type: Boolean,
      required: true,
      default: false,
    },
    activeParticipantCount: {
      type: Number,
      required: true,
      default: 0,
    },
    totalParticipantCount: {
      type: Number,
      required: true,
      default: 0,
    },
    scheduledFor: {
      type: Date,
      required: false,
      default: Date.now,
    },
    maxListeners: {
      type: Number,
      required: false,
      default: null,
    },
    tags: {
      type: [String],
      required: false,
      default: [],
    },
  },
  { timestamps: true }
)

exports.Room = mongoose.model("Room", RoomSchema)
