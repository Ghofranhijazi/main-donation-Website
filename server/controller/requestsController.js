

const { Requests } = require("../models/requests");


const getRequests = async (req, res) => {
    try {
        const requests = await Requests.findAll({
            attributes: ["organizationName", "toolName", "medicalEquipment","status" ,"id"],
            order: [["createdAt", "DESC"]],

        });

        res.json(requests);
    } catch (error) {
        console.error("Error fetching donation requests:", error);
        res.status(500).json({ message: "Error retrieving data" });
    }
};

const submitRequest = async (req, res) => {
    try { 
        const newRequest = await Requests.create({
            user_id: parseInt(req.body.user_id, 10),
            organizationName: req.body.organizationName, 
            organizationAddress: req.body.organizationAddress,
            phone: req.body.phone,
            email: req.body.email,
            toolName: req.body.toolName, 
            medicalEquipment: req.files["medicalEquipment"]
                ? req.files["medicalEquipment"][0].path
                : null,
            quantity: parseInt(req.body.quantity),
            proofDocument: req.files["proofDocument"]
                ? req.files["proofDocument"][0].path
                : null,
            hasFundraisingLicense: req.body.hasFundraisingLicense === "yes",
            agreement: req.body.agreement === "true",
            status: "pending",
            description: req.body.description,
            estimatedCost: parseFloat(req.body.estimatedCost),
            amount_raised: parseFloat(req.body.amount_raised) || 0,
        });

        res.status(201).json({
            message: "Request submitted successfully",
            request: newRequest,
        });

    } catch (error) { 
        console.error("Error:", error); 
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getRequests, submitRequest };
