import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import {connect} from "./connect.js"
import userRoute from "./routes/userRoute.js"
import videoRoute from "./routes/videoRoute.js"
import commentRoute from "./routes/commentRoute.js"

const app = express()

app.use(cors(
    {
        origin:"*"
    }
));


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