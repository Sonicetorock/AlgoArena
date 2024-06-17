const exp = require('express')
const app = exp()
app.use(exp.json())
app.use(exp.urlencoded({extended:false}))

const {DBConnection} = require('./config/db.js')
const { userRouter } = require('./routes/userRoute.js')

app.use("/api/auth",userRouter)
app.get('/',(req,res)=>{
    res.send("Welcome to the OG OJ")
})

app.listen (8000,()=>{
    console.log("Server fired up at port  8000")
    DBConnection();
})