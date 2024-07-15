const exp = require('express')
const app = exp()
const cookieParser = require('cookie-parser')
const cors = require('cors')

app.use(exp.json())
app.use(exp.urlencoded({extended:false}))
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true
}));

const {DBConnection} = require('./config/db.js')
const { authRoutes } = require('./routes/authRoutes.js')
const { userRoutes } = require('./routes/userRoutes.js')
const adminRoutes = require('./routes/adminRoutes.js')



app.use("/api/auth",authRoutes)
app.use("/api/user",userRoutes)
app.use("/api/admin",adminRoutes)

app.get('/',(req,res)=>{
    res.send("Welcome to the OG OJ")
})

app.listen (8000,()=>{
    console.log("Server fired up at port  8000")
    DBConnection();
})