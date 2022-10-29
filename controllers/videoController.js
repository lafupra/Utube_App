
import Video from "../models/uVideo.js"
import utubeUser from "../models/utubeUser.js"

export const addVideo = async (req,res) => {

req.body === undefined || null && res.send("your data didn't perfectly reach to us")

try{

    const addvideo  = new Video({userId:req.params.id,...req.body})

  const savedvideo = await addvideo.save()

    res.status(200).json({"message" : "your video has been saved",...savedvideo._doc})

}catch(err){
    res.status(500).json(err)
}

}




export const getVideo = async (req,res) => {

    req.params.vid === undefined || null && res.send("your data didn't perfectly reach to us")
    
    try{
         const findvideo = await Video.findById(req.params.vid)

         !findvideo && res.status(404).json("your requested profile not found")
        

    
        res.status(200).json(findvideo)
    
    }catch(err){
        res.status(500).json(err)
    }
    
    }



    
export const updateVideo = async (req,res) => {

    req.params.vid === undefined || null && res.send("your data didn't perfectly reach to us")
    
    try{
         const video = await Video.findById(req.params.vid)

         !video && res.status(404).json("video not found")

        if(req.user.id === video.userId){
            const updatedvideo = await Video.findByIdAndUpdate(req.params.vid,{
            $set:req.body
         },{
            new:true
         })

         !updatedvideo && res.status(404).json("your requested profile not found")
         
         res.status(200).json(updatedvideo)

    
        }else{
            res.status(403).json("you can update only your video")
        }

        

    
    
    }catch(err){
        res.status(500).json(err)
    }
    
    }



        
export const deleteVideo = async (req,res) => {

    req.params.vid === undefined || null && res.send("your data didn't perfectly reach to us")
    
    try{

        const video = await Video.findById(req.params.vid)

        !video && res.status(404).json("video not found")


        if(req.user.id === video.userId){
            const deletedvideo = await Video.findByIdAndDelete(req.params.vid)

         !deletedvideo && res.status(404).json("your requested profile not found")
         
         res.status(200).json(deletedvideo)

    
        }else{
            res.status(403).json("you can delete only your video")
        }
        

    
    
    }catch(err){
        res.status(500).json(err)
    }
    
    }




export const addView = async (req,res) => {

    try{

        await Video.findByIdAndUpdate(req.params.vid,{
            $inc:{
              views:1
            }
        })

        res.status(200).json("the views has been increased.")

    }catch(err){
        res.status(500).json(err)
  }

}



export const getTrend = async (req,res) => {

    try{
        const videos = await Video.find().sort({views:-1});
        res.status(200).json(videos)

    }catch(err){
        res.status(500).json(err)
    }

}


export const getRandom = async (req,res) => {
    

    try{
     const video = await Video.find()
     res.status(200).json(video)
    }catch(err){
        res.status(500).json(err)
    }

}


export const getSub = async (req,res) => {

    try{

        
    const user = await utubeUser.findBYId(req.user.id);
    const subscribedChannels = user.subscribedUsers;


    const list = await Promise.all(
        subscribedChannels.map((channelId) => {
            return  Video.find({userId:channelId})
        })
    );

    res.status(200).json(list.flate().sort((a,b) => b.createdAt - a.createdAt));
        
    }catch(err){
        res.status(500).json(err)
    }



}


export const getByTag = async (req,res) => {
    const tags = req.query.tags.split(",")
    
    try{
        const videos = await Video.find({tags:{$in:tags}}).limit(20);

        res.status(200).json(videos)

    }catch(err){
        res.status(500).json(err)
    }
}

export const getBySearch = async (req,res) => {
    const squery = req.query.q
    
    try{
        const videos = await Video.find({title:{$regex:squery,option:"i"}}).limit(20);

        res.status(200).json(videos)

    }catch(err){
        res.status(500).json(err)
    }
}




export const getAll = async (req,res) => {

    try{
     const video = await Video.find()
     res.status(200).json(video)
    }catch(err){
        res.status(500).json(err)
    }

}








