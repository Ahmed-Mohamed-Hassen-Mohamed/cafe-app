const User = require("../models/user");

// Example controller functions

exports.createSuperAdmin = async (req, res) => {
  try {
    const user = new User(req.body);
    user.roles = 0;
    await user.save();
    const token = user.generateToken();
    res.status(200).send({ user, token });
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.createAdmin = async (req, res) => {
  try {
    const user = new User(req.body);
    user.roles = 1;
    await user.save();
    const token = user.generateToken();
    res.status(200).send({ user, token });
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    if (user.roles == 0 && user.roles == 1) {
      return res
        .status(404)
        .send({ Error: "authorizedError", message: "Unauthorized" });
    }
    await user.save();
    const token = user.generateToken();
    res.status(200).send({ user, token });
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.username,
      req.body.password
    );
    const token = user.generateToken();
    res.status(200).send({ user, token });
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const roles = req.query.roles;
    const users = await User.find({ roles }).populate({
      path: "roomId",
      select: "name",
    });
    if (!users.length) {
      return res
        .status(404)
        .send({ Error: "Not found", message: "Not user is found" });
    }
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getProfile = async (req, res) => {
  req.user.populate({ path: "roomId", select: "name" });
  res.status(200).send(req.user);
};

exports.getUserById = async (req, res) => {
  try {
    const _id = req.params.id;
    const user = await User.findById(_id).populate({
      path: "roomId",
      select: "name",
    });
    if (!user) {
      return res
        .status(404)
        .send({ Error: "Not found", message: "This user is not found" });
    }
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getUsersOfRoom = async (req, res) => {
  try {
    const roomId = req.params.id;
    const users = await User.find({ roomId }).populate({
      path: "roomId",
      select: "name",
    });
    if (!users.length) {
      return res
        .status(404)
        .send({ Error: "Not found", message: "This user is not found" });
    }
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.userRoom = async (req, res) => {
  try {
    const _id = req.params.id;
    const user = await User.findById(_id).populate("roomId");
    if (!user) {
      return res
        .status(404)
        .send({ Error: "Not found", message: "This user is not found" });
    }
    res.status(200).send(user.roomId);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.updateUser = async (req, res) => {
  const updates = Object.keys(req.body);
  try {
    const _id = req.params.id;
    const user = await User.findById(_id);
    if (!user) {
      return res
        .status(404)
        .send({ Error: "Not found", message: "This user is not found" });
    }
    updates.forEach((key) => {
      user[key] = req.body[key];
    });
    await user.save().populate({ path: "roomId", select: "name" });
    res.status(200).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const _id = req.user.id;
    const user = await User.findByIdAndDelete(_id);
    if (!user) {
      return res
        .status(404)
        .send({ Error: "Not found", message: "This user is not found" });
    }
    res.status(200).send("User has been deleted");
  } catch (err) {
    res.status(500).send(err);
  }
};
