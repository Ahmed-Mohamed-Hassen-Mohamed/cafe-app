const express = require("express");
const router = express.Router();
const superAdminOrAdminAuth = require("../middelware/superAdminOrAdminAuth");
const superAdminAuth = require("../middelware/superAdminAuth");
const adminAuth = require("../middelware/adminAuth");
const userAuth = require("../middelware/userAuth");
const user = require("../controllers/user");

router.post("/login", user.login);
router.post("/superAdmin", user.createSuperAdmin);
router.post("/admin", user.createAdmin);
router.post("/user", user.createUser);
router.get("/users", userAuth, user.getAllUsers);
router.get("/Profile", userAuth, user.getProfile);
router.get("/users/:id", userAuth, user.getUserById);
router.get("/userRoom/:id", userAuth, user.userRoom);
router.get("/UsersOfRoom/:id", userAuth, user.getUsersOfRoom);
router.patch("/users/:id", userAuth, superAdminOrAdminAuth, user.updateUser);
router.delete("/users/:id", userAuth, superAdminOrAdminAuth, user.deleteUser);

module.exports = router;
