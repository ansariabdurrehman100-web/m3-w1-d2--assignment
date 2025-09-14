const mongoose = require('mongoose');
const registrationschema=new mongoose.Schema(
    {
        name:{
            type:String,
            trim:true
        },
        email:{
            type:String,
            trim:true
        }
    }
)

module.exports=mongoose.model('Registration',registrationschema);