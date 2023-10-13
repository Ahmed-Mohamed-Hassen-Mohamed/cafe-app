const express = require("express");
const router = express.Router();
const userAuth = require("../middelware/userAuth");
const employeeAuth = require("../middelware/employeeAuth");
const officeBoyAuth = require("../middelware/officeBoyAuth");
const order = require("../controllers/order");

router.post("/order", userAuth, employeeAuth, order.addOrder);
router.get("/orders", userAuth, order.getOrders);
router.get("/orders/:id", userAuth, order.getOrderById);
router.get("/orderSubCategory/:id", userAuth, order.orderSubCategory);
router.get("/dashboard", userAuth, order.dashboard);
router.patch("/orders/:id", userAuth, officeBoyAuth, order.updateOrder);
router.delete("/orders/:id", userAuth, employeeAuth, order.deleteOrder);

module.exports = router;
