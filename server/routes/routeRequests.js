

const express = require("express");
const multer = require("multer");
const router = express.Router();
const { getRequests, submitRequest } = require("../controller/requestsController");
const upload = multer({ dest: 'uploads/' });

router.get("/donations", getRequests);

router.post('/submit', upload.fields([
  { name: 'medicalEquipment'},
  { name: 'proofDocument' }
]), submitRequest); 

module.exports = router;