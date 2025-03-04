

const express = require("express");
 const { saveContactMessage } = require("../controller/userController");

const { getUserProfile, updateUserProfile } = require("../controller/userController");

const router = express.Router();

// المسار للحصول على بيانات المستخدم
router.get("/profile/:userId", getUserProfile);

// المسار لتحديث بيانات المستخدم
router.put("/profile/:userId", updateUserProfile);

 router.post("/contact", saveContactMessage);


module.exports = router;
