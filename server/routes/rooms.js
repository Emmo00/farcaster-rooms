const { Router } = require("express");
const { Room } = require("../models/Room");
const { authMiddleware } = require("../middlewares/auth.middleware");

const router = Router();

router.use(authMiddleware);

// create a new room
router.post("/", async (req, res) => {
  try {
    const room = new Room(req.body);
    await room.save();
    res.status(201).json(room);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// get live rooms
router.get("/live", async (req, res) => {
  try {
    const liveRooms = await Room.find({
      visibility: "public",
      hasStarted: true,
      hasEnded: false,
    });
    res.status(200).json(liveRooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// get upcoming rooms
router.get("/upcoming", async (req, res) => {
  try {
    const upcomingRooms = await Room.find({
      visibility: "public",
      scheduledFor: { $gt: new Date() },
      hasStarted: false,
    }).sort({ scheduledFor: 1 });

    res.status(200).json(upcomingRooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// mark a scheduled event as started
router.post("/:id/start", async (req, res) => {
  try {
    const user = req.user;
    const room = await Room.findById(req.params.id);

    if (!room || room.hostFid !== user.fid) {
      return res.status(404).json({ error: "Room not found" });
    }

    // Check if the room is scheduled for the future
    if (room.scheduledFor > new Date()) {
        return res.status(400).json({ error: "Room is scheduled for the future" });
    }

    // Update room status
    room.hasStarted = true;
    room.hasEnded = false;
    await room.save();

    res.status(200).json(room);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
