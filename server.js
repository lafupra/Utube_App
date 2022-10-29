import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import {connect} from "./connect.js"
import userRoute from "./routes/userRoute.js"
import videoRoute from "./routes/videoRoute.js"
import commentRoute from "./routes/commentRoute.js"

const app = express()

app.use(cors())

// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
   

    // Pass to next layer of middleware
    next();
});

app.use(express.json())

dotenv.config()

const PORT = process.env.PORT

app.get("/",(req,res) => {
    res.send("server is working")
})


app.use("/api/users",userRoute)
app.use("/api/videos",videoRoute)
app.use("/api/comments",commentRoute)

app.listen(PORT,() => {
    connect()
    console.log(`server is working on ${PORT}`)
})