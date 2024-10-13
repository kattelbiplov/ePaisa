const router = require('express').Router();
const csrf = require('csurf');
const Transaction = require('../models/transactionModel');
const User = require('../models/userModel');
const authMiddleware = require('../middlewares/authMiddleware');
const userModel = require('../models/userModel');

const csrfProtection = csrf({ cookie: true });

router.post('/send-money', authMiddleware, csrfProtection,async (req, res) => {
    console.log('Received request:', req.body);
    try {
        
        // Input validation
        if (!req.body.receiver || !req.body.amount || req.body.amount <= 0) {
            return res.status(400).send({
                message: 'Invalid input data',
                success: false
            });
        }

        // Ensure that req.body.sender is provided
        if (!req.body.sender) {
            return res.status(400).send({
                message: 'Sender information is required',
                success: false
            });
        }

        // Find the users based on their mobile numbers
        const sender = await User.findOne({ mobileNumber: req.body.sender });
        const receiver = await User.findOne({ mobileNumber: req.body.receiver });

        if (sender && receiver) {
            const newTransaction = new Transaction({
                sender: req.body.sender,
                receiver: req.body.receiver,
                amount: req.body.amount,
                remarks:req.body.remarks
            });

            await newTransaction.save();

            // Decrease the sender's balance
            sender.balance -= req.body.amount;
            await sender.save();

            // Increase the receiver's balance
            receiver.balance += req.body.amount;
            await receiver.save();
            res.status(200).send({
                message: 'Transaction successful',
                data: newTransaction,
                success: true
            });
        } else {
            res.status(401).send({
                message: 'Sender or receiver not found',
                success: false
            });
        }
    } catch (error) {
        console.error('Transaction failed:', error);
        res.status(500).send({
            message: 'Transaction Failed',
            success: false,
            data: error.message
        });
    }
});

/*router.get('/statement', authMiddleware, async (req, res) => {
    try {
        const userId = req.body.userId;

        const transactions = await Transaction.find({
            $or: [{ sender: userId }, { receiver: userId }],
        });

        res.json({
            message: 'Transactions fetched successfully',
            data: transactions,
            success: true,
        });
    } catch (error) {
      console.error('Error fetching transactions:', error);
      res.status(500).send({
        message: 'Failed to fetch transactions',
        data: error.message,
        success: false,
      });
    }
  });


*/
router.get('/statement', authMiddleware, async (req, res) => {
    try {
        // Access user information from the request (authenticated by the middleware)
        const userId = req.body.userId;

        // Fetch transactions where sender or receiver is the user's mobile number
        // const transactions = await Transaction.find({
        //     $or: [{ sender: userId }, { receiver: userId }],
        // });
        //const transactions = await Transaction.find();
        const transactions = await Transaction.find();
  
        console.log('Transactions fetched:', transactions);
       
        res.status(200).send({
            message: 'Transactions fetched successfully',
            data: transactions,
            success: true,
        });
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).send({
            message: 'Failed to fetch transactions',
            data: error.message,
            success: false,
        });
    }
});









  

module.exports = router;
