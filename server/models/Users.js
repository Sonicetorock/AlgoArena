const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:[true, "Name is a required field!"],
    },
    email:{
        type:String,
        required:[true, "Email is a required field!"],
        unique:true
    },
    password:{
        type:String,
        required:[true, "Password is a required field!"],
    },
    phone:{
        type:String,
        // required:[true, "Phone number is a required field!"],
    },
    dob : {
        type: Date,
        required:[true, "DOB is a required field!"],
    },
    role :{
        type: String,
        default: "user",
        enum: ["user", "admin"]
    },
    refreshToken:{ 
        //in ref to authController -> login & logout => saving refreshToken in refreshtoken
        //added rightnow, but dk how it even working before adding this field
        //now its being stored in db while logging in
        //set to "" upon logout
        type:String,
    },
    forgotPassQ:{
        type:String,
    },
    forgotPassA:{
        type:String,
    },
    score:{
        type:Number,
        default:0,
    },
    streak:{
        type:Number,
        default:0
    },
    premiumQs:{
        type: [mongoose.Schema.ObjectId],
        ref:"Problem",
        default:[]
    },
    bio:{
        type:String,
    }

}, { timestamps: true })

module.exports=mongoose.model("User",userSchema)