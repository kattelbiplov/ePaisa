const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerServiceSchema=new Schema({
    subject:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    imagePath: {
        type: String,
        required: true
    }
})

const CustomerService = mongoose.model('CustomerService', CustomerServiceSchema);

module.exports = CustomerService;
