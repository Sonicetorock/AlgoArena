const mongoose = require('mongoose')

const testcaseSchema = new mongoose.Schema({
    pid:{
        type:mongoose.Schema.ObjectId,
        required:[true, "BC :Problem id  for a testcase is a required field!"],
        ref:"Problem"
    },
    input :{
        type:String,
        required:[true, "Input for test case is a required unique field!"],
        unique:true//tc should be unqie to avoid any ,alicios script trying to have diff output for same input
    },
    output:{
        type:String,
        required:[true, "Output for test case is a required field!"],
        //not necessarily unique coz solutions can be same like 2, 3..
    },
    explanation:{
        type:String,
        //can be optional , good to have for demotestcases
    }
})

module.exports=mongoose.model("TestCase",testcaseSchema)