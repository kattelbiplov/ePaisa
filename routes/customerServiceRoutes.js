const router = require('express').Router();
const CustomerService = require('../models/customerServiceModel');


// Create a new customer service request
router.post('/customer-service', async (req, res) => {
    try {
        // Assuming you have user information available after authentication
        const userId = req.user.userId; // Assuming you have user information available after authentication

        // Create a new customer service request
        const newRequest = new CustomerService({
            ...req.body,
            createdBy: userId // Include the user ID who created the request
        });
        await newRequest.save();

        res.status(201).send({
            message: 'Customer service request created successfully',
            data: newRequest,
            success: true,
        });
    } catch (error) {
        console.error('Error creating customer service request:', error);
        res.status(500).send({
            message: 'Failed to create customer service request',
            data: error.message,
            success: false,
        });
    }
});

module.exports = router;
