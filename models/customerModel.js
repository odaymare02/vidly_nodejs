const mongoose=require('mongoose');
const customerSchema=new mongoose.Schema({
    isGold:{type:Boolean,
        default:false
    },
    name:{type:String,
        required:true,
        minlength:5,
        maxlength:25
    },
    phone:{type:String,
        minlength:9,
        maxlength:15
    }
});
const Customer = mongoose.models.Customer || mongoose.model('Customer', customerSchema);

module.exports = Customer;