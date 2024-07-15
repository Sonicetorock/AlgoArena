const mongoose = require('mongoose')

const subSchema = new mongoose.Schema({
    pid:{
        type:mongoose.Schema.ObjectId,
        required:[true, "problem id  for a submission is a required field!"],
        ref:"Problem"
    },
    uid:{
        type:mongoose.Schema.ObjectId,
        required:[true, "BC: User id for a submission is a required field!"],
        ref:"User"
    },
    code:{
        type:String,
        required:[true, "BC :solution for submission is a required field!"],
    },
    choseLang:{
        type:String,
        require:[true,"BC: language cant be empty"]
        // enum:[prog languages]
    },
    verdict : { //for outputing user as TLE, WA, AC, MLE
        type: String,
    },
    score :{ //more biased for contest, while solved in contest , this submission gets the more bias o=if got AC
        type:Number
    },
    execTime :{ // (in ms)
        type:Number
        //deafult shuld be maximum
    },
    execMemory:{ // (in kB)
        type:Number
        //deafult shuld be maximum
    },
}, { timestamps: true })

module.exports=mongoose.model("Submission",subSchema)