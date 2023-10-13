const Room = require("../models/room");

// Example controller functions

exports.addRoom = async (req, res) => {
  try {
    const room = new Room({ ...req.body, owner: req.user._id });
    await room.save();
    res.status(200).send(room);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.getRooms = async (req, res) => {
  try {
    const rooms = await Room.find({}).populate({
      path: "owner",
      select: "username",
    });
    if (!rooms.length) {
      return res
        .status(404)
        .send({ Error: "Not found", message: "No rooms is found" });
    }
    res.status(200).send(rooms);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getRoomById = async (req, res) => {
  try {
    const _id = req.params.id;
    const room = await Room.findById(_id).populate({
      path: "owner",
      select: "username",
    });
    if (!room) {
      return res
        .status(404)
        .send({ Error: "Not found", message: "This room is not found" });
    }
    res.status(200).send(room);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.roomCreatedBy = async (req, res) => {
  try {
    const _id = req.params.id;
    const room = await Room.findById(_id).populate("owner");
    if (!room) {
      return res
        .status(404)
        .send({ Error: "Not found", message: "This room is not found" });
    }
    res.status(200).send(room.owner);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.updateRoom = async (req, res) => {
  try {
    const _id = req.params.id;
    const room = await Room.findByIdAndUpdate(_id, req.body, {
      new: true,
    }).populate({ path: "owner", select: "username" });
    if (!room) {
      return res
        .status(404)
        .send({ Error: "Not found", message: "This room is not found" });
    }
    res.status(200).send(room);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.deleteRoom = async (req, res) => {
  try {
    const _id = req.params.id;
    const room = await Room.findByIdAndDelete(_id);
    if (!room) {
      return res
        .status(404)
        .send({ Error: "Not found", message: "This room is not found" });
    }
    res.status(200).send(room);
  } catch (err) {
    res.status(500).send(err);
  }
};
