import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import {connect} from "./connect.js"
import userRoute from "./routes/userRoute.js"
import videoRoute from "./routes/videoRoute.js"
import commentRoute from "./routes/commentRoute.js"

const app = express()





dotenv.config()



const PORT = process.env.PORT


app.use(express.json())

app.get("/",(req,res) => {
    res.send("server is working")
})


app.use(cors());



app.use("/api/users",userRoute)
app.use("/api/videos",videoRoute)
app.use("/api/comments",commentRoute)

app.listen(PORT,() => {
    connect()
    console.log(`server is working on ${PORT}`)
})