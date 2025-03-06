const { Requests } = require("../models/requests"); 
const dotenv = require("dotenv");

dotenv.config();

const getAllRequests = async (req, res) => {
    try {
      const requests = await Requests.findAll(); 
      res.status(200).json(requests); 
    } catch (error) {
      console.error("Error fetching requests:", error);
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  };
  
  const updateRequestStatus = async (req, res) => {
    const { id } = req.params; 
    const { status } = req.body; 
  
    if (!["pending", "approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }
  
    try {
      
      const request = await Requests.findByPk(id);
  
      if (!request) {
        return res.status(404).json({ message: "Request not found" });
      }
  
      request.status = status;
      await request.save(); 

      res.status(200).json({ message: "Request status updated successfully", request });
    } catch (error) {
      console.error("Error updating request status:", error);
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  };

module.exports = {
  getAllRequests,
  updateRequestStatus,
};