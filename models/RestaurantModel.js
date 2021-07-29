const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    email_id:{
        type: String,
        require : true
    },
    mobile_no:{
        type:String,
        require:true
    },
    fssai_no: {
        type: String,
        require: true
    },
    address1:{
        type: String,
        require : true
    },
    address2:{
        type:String,
        require:true
    },
    city: {
        type: String,
        require: true
    },
    state:{
        type: String,
        require : true
    },
    pincode:{
        type:String,
        require:true
    },
    landmark:{
        type:String,
        require:true
    },
    restaurant_name:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    usertype:{
        type:String,
        required:true
    },
    createdBy:{
        type:String,
        require:false
    },
    createdOn:{
        type:Date,
        require:false
    },
    updatedBy:{
        type:String,
        require:false,
    },
    updatedOn:{
        type:Date,
        require:false
    },
    isDeleted:{
        type:Boolean,
        require:false,
        default: false
    },
    deletedBy:{
        type:String,
        require:false
    },
    deletedOn:{
        type:Date,
        require:false
    }
}); 


module.exports = mongoose.model('User',UserSchema)
