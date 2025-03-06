const express = require("express");
const adminRoute = express.Router();
const { getAllRequests, updateRequestStatus } = require("../controller/requestsHandling");
const isAdmin = require("../middlewares/adminMiddleware");
const { getDonations } = require("../controller/donationController");


adminRoute.get("/requests", isAdmin, getAllRequests);
adminRoute.get("/donation", isAdmin, getDonations );
adminRoute.put("/:id/status", isAdmin, updateRequestStatus);

module.exports = adminRoute;