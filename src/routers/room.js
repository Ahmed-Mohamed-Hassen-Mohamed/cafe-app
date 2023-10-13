const express = require("express");
const router = express.Router();
const userAuth = require("../middelware/userAuth");
const adminAuth = require("../middelware/adminAuth");
const room = require("../controllers/room");

router.post("/room", userAuth, adminAuth, room.addRoom);
router.get("/rooms", userAuth, room.getRooms);
router.get("/rooms/:id", userAuth, room.getRoomById);
router.get("/roomCreatedBy/:id", userAuth, room.roomCreatedBy);
router.patch("/rooms/:id", userAuth, adminAuth, room.updateRoom);
router.delete("/rooms/:id", userAuth, adminAuth, room.deleteRoom);

module.exports = router;
