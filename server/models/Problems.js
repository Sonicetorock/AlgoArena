const mongoose = require('mongoose')

const problemSchema = new mongoose.Schema({
    probName:{
        type:String,
        required:[true, "BC : Problem Name is a required field!"],
        unique: true //bcoz , if admin wants to add a test case to the specific prob he should filter it byt this name
    },
    probStatement :{
        type:String,
        required:[true, "BC : Problem Statement is a required field!"],
        unique:true
    },
    difficulty:{
        type:Number,
        required:[true, "BC : Difficulty is a required field!"],
    },
    // need to include a explantion field inside testcase schema
    testcases:{
        type:[mongoose.Schema.ObjectId],
        ref:"TestCase",
        required:[true, "BC: test cases cant be empty"]
    },
    demoTestCases:{
        type:[mongoose.Schema.ObjectId],
        ref:"TestCase",
        //can be right ? 
    },
    level:{
        type:String,
        enum:["normal","premium","elite"]
    },
    setNum : { //for set numbering, for google set qs 1, amazon set qs 2
        type: Number,
    },
    tags :{
        type:[String]
    },
    hints :{
        type:[String]
    },
    testcases:[{
        input :{
            type:String,
            required:[true, "Input for test case is a required unique field!"],
            //this is not the combo of pid and input
            unique:true//tc should be unqie to avoid any ,alicios script trying to have diff output for same input
        },
        output:{
            type:String,
            required:[true, "Output for test case is a required field!"],
            //not necessarily unique coz solutions can be same like 2, 3..
        },
    }],
    demoTestCases:[{
        input :{
            type:String,
            required:[true, "Input for test case is a required unique field!"],
            //this is not the combo of pid and input
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
    }],
    totalSubmissions:{
        type:Number,
        default:0
    },
    acceptedSols:{
        type:Number,
        default:0
    },
    constraintTime:{
        type:Number,
        default:2
    },
    constraintMemory:{
        type:Number,
        default:2
    },
    
}, { timestamps: true })

module.exports=mongoose.model("Problem",problemSchema)