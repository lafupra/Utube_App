import mongoose from "mongoose"



export const connect =  () => {   mongoose.connect(process.env.MONGO_URL).then(() => console.log("mongoose connection successful")).catch((err) => console.log(err) )}