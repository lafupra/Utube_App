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


app.use(cors(
    {
        origin:"https://635df89ffe33f7000bcb2035--cozy-malabi-3b0073.netlify.app"
    }
));
app.use((req, res, next) => {

    const origin = req.headers.origin;
    if (origin) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }
    return next();
  })



app.use("/api/users",userRoute)
app.use("/api/videos",videoRoute)
app.use("/api/comments",commentRoute)

app.listen(PORT,() => {
    connect()
    console.log(`server is working on ${PORT}`)
})