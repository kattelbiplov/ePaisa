const router=require('express').Router();
const User=require('../models/userModel');
const bcrypt=require('bcryptjs');
const { error } = require('console');
const jwt = require('jsonwebtoken')
const authMiddleware = require('../middlewares/authMiddleware');
const userModel = require('../models/userModel');
//register user account
router.post('/registration',async(req,res)=>{
    try{
        const role = req.body.role;
        //check if already user exists
        let user=await User.findOne({mobileNumber:req.body.mobileNumber})
        if(user){
            return res.status(409).send({
                message:'User already exists',
                success:false
            })
        }
       
        const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password=hashedPassword;
        const newUser=new User(req.body,role);
        await newUser.save();
        res.status(201).send({
            message:'User registered successfully',
            data:null,
            success:true
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            message:error.message,
            success:false
        })
    }
})

//login user account
// login user account
router.post('/login', async (req, res) => {
    try {
        // check if user exists or not
        let user = await User.findOne({ mobileNumber: req.body.mobileNumber });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User does not exist',
            });
        }

        // check the password
        const validPassword = await bcrypt.compare(req.body.password, user.password); // corrected typo
        if (!validPassword) {
            return res.status(401).send({
                message: 'Invalid Password',
                success: false,
            });
        }
        const userRole = user.role || 'user';
        //generate token
        const token = jwt.sign({ userId:user._id, role: userRole}, process.env.jwt_secret,{expiresIn:"1d"})
       

        res.status(200).send({
            message: 'User logged in successfully',
            data: { token },
            success: true,
        });
    } catch (error) {
        res.status(500).send({
            message: error.message,
            success: false,
        });
    }
});

//get profile data
router.get('/profile',authMiddleware,async(req,res)=>{
    try {
        // Access user information from the request (authenticated by the middleware)
        const userId = req.body.userId;

        // Assuming you have a User model
        const user = await User.findById(userId);
        console.log(user)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        // Return user data
        res.status(200).json({
            success: true,
            data: user,
        });
    }catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error',
        });
    }
});

// Get all users
router.get('/allUsers',authMiddleware, async (req, res) => {
    if (req.body.role !== 'admin') {
        return res.status(401).json({
            message: 'Unauthorized - Admin access required',
            success: false,
        });
    }
try{
    // Proceed with fetching all users for admin
    const users = await User.find();
    console.log('All Users fetched:', users);
   
    res.status(200).send({
        message: 'All users fetched successfully',
        data: users,
        success: true,
    });
}catch (error) {
    console.error('Error fetching all users:', error);
    res.status(500).send({
        message: 'Failed to fetch all users',
        data: error.message,
        success: false,
    });
}
});

// Edit user endpoint
router.put('/editUser/:userId', authMiddleware, async (req, res) => {
    try {
        const userId = req.params.userId;
        // Assuming you have a User model with appropriate fields
        const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });

        if (!updatedUser) {
            return res.status(404).send({
                message: 'User not found',
                success: false,
            });
        }

        res.status(200).send({
            message: 'User updated successfully',
            data: updatedUser,
            success: true,
        });
    } catch (error) {
        console.error('Error editing user:', error);
        res.status(500).send({
            message: 'Failed to edit user',
            data: error.message,
            success: false,
        });
    }
});

router.delete('/deleteUser/:userId', authMiddleware, async (req, res) => {
    try {
        const userId = req.params.userId;
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).send({
                message: 'User not found',
                success: false,
            });
        }

        res.status(200).send({
            message: 'User deleted successfully',
            data: deletedUser,
            success: true,
        });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).send({
            message: 'Failed to delete user',
            data: error.message,
            success: false,
        });
    }
});
module.exports=router;