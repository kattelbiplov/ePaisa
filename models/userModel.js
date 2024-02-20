const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    middleName:{
        type:String
    },
    lastName:{
        type:String,
        required:true
    },
    mobileNumber:{
        type:String,
        required:true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        
    },
    dob:{
        type:Date,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    balance:{
        type:Number,
        default:500
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
      },
},{
    timestamps:true
})

module.exports=mongoose.model('users',userSchema)