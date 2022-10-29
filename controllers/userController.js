
import Video from "../models/uVideo.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import uUser from "../models/utubeUser.js"


export const getAllUserData = async (req,res) => {

    try{
        const GetUserDataResult = await uUser.find()
        GetUserDataResult.length === 0 &&  res.send("no user available")     
        res.send(GetUserDataResult)
       
    }catch(err){
        res.send(err)
    }
    

}

export const getUserData = async (req,res) => {

    

    try{
        const GetUserDataResult = await uUser.findById(req.params.id)
        
        !GetUserDataResult &&  res.send("no user available")     
        res.send(GetUserDataResult)
       
    }catch(err){
        res.send(err)
    }
    

}



export const putUserData = async (req,res) => {
   
    let salt = bcrypt.genSaltSync(10);
    let hashedpassword =  bcrypt.hashSync(req.body.password,salt)
        console.log({...req.body,password:hashedpassword})
    if(req.body){
        try{

            const NewUser = new uUser({...req.body,password:hashedpassword})

            const savedUser = await NewUser.save()

            res.status(200).json(savedUser)
    
            
    
        }catch(err){
            err.keyPattern.name && res.send("username is taken")
            err.keyPattern.email && res.send("email is taken")
           res.send(err)
        }

    }else{
        res.send("no user data sent to us")
    }
    
}


export const updateUser = async (req,res) => {
    
   
    
   
    if(req.body){

        if(req.body.password){
            let salt = bcrypt.genSaltSync(10);
            const  hashedpassword =  bcrypt.hashSync(req.body.password,salt)
            try{

                const matchedUser = await uUser.findByIdAndUpdate(
                    req.params.id,
                    {
                        $set: {...req.body,password:hashedpassword}
                    },
                {new:true}
                )
        
                console.log(matchedUser)
                !matchedUser && res.send(`${req.body.name}no user found`)
              
               res.send(matchedUser)
        
            }catch{
                res.send(err)
            }
    
        }
    

}else{
    res.send("no user data sent to us")
}
}


export const deleteUser = async (req,res) => {
    if(req.body){
        try{

            const deletedUser = await uUser.findByIdAndDelete(req.params.id) 
            !deletedUser && res.send(  `user not found`)
            res.send(` account deleted successfully`)
    
        }catch(err){
            res.send(err)
        }

    }else{
        res.send("no user data sent to us")

    }

}



export const loginUser = async (req,res) => {
    !req.body && res.send("user data didn't reach the server")

    
    
    try{
         const foundUser = await uUser.findOne({name:req.body.name})
        
         !foundUser && res.status(404).json("no user found")
         const isCorrect = await bcrypt.compare(req.body.password,foundUser.password)
         
         !isCorrect && res.status(400).json("wrong credentials")
  
         
         const {password,...others} = foundUser._doc
        
         const access_token = jwt.sign({id:foundUser._id},process.env.JWT_PASS,{expiresIn:"3h"})


         res.status(200).json({...others,access_token})




    }catch(err){
        res.status(500).json(err)
    }
}



export const like = async (req,res) => {
    const id = req.user.id;
    const vid = req.params.vid


const video = await Video.findById(vid)


const alreadylikedid = video.likes.find((likeduser) => likeduser === id)


if(alreadylikedid === id ){
    try{

        try{

            await Video.findByIdAndUpdate(vid,{
                $pull:{likes:id}
            })
    res.status(200).json("LPulledOut")
        }catch(err){
            res.status(500).json(err)
        }

    }catch(err){
        console.log(err)
    }
}else{

    try{

        await Video.findByIdAndUpdate(vid,{
            $addToSet:{likes:id},
            $pull:{dislikes:id}
        })
res.status(200).json("Liked")
    }catch(err){
        res.status(500).json(err)
    }

}


    
   
 
}


export const dislike = async (req,res) => {
    const id = req.user.id;
    const vid = req.params.vid
    
const video = await Video.findById(vid)

const alreadydislikedid = video.dislikes.find((dislikeduser) => dislikeduser === id)


if(alreadydislikedid === id ){
    try{

        try{

            await Video.findByIdAndUpdate(vid,{
                $pull:{dislikes:id}
            })
    res.status(200).json("DlPulledOut")
        }catch(err){
            res.status(500).json(err)
        }

    }catch(err){
        console.log(err)
    }
}else{

    try{

        await Video.findByIdAndUpdate(vid,{
            $addToSet:{dislikes:id},
            $pull:{likes:id}
        })
res.status(200).json("Disliked")
    }catch(err){
        res.status(500).json(err)
    }

}
}



export const subscribe = async (req,res) => {
           const userid = req.user.id
           const channelid = req.params.cid
          
        

    const GetUserDataResult = await uUser.findById(req.user.id)
   

  const alreadysubscribed =  GetUserDataResult.subscribedUsers.find((id) => id === req.params.cid)    


   if(alreadysubscribed === req.params.cid){

    try{

            await uUser.findByIdAndUpdate(userid,{
                $pull:{subscribedUsers:channelid}
            },{
                new:true
            })
     

               await uUser.findByIdAndUpdate(channelid,{
                $inc:{subscribers:-1}
            },{
                new:true
            })


           res.status(200).json("NotSubscribed")

   }catch(err){
       console.log(err)
    }

  }else{

    try{
        
            await uUser.findByIdAndUpdate(userid,{
                $addToSet:{subscribedUsers:channelid}
            },{
                new:true
            })
               

            await uUser.findByIdAndUpdate(channelid,{
                $inc:{
                    subscribers:1
                }})
    
           res.status(200).json("Subscribed")
 
     }catch(err){
         res.status(500).json(err)
     }

   }  
   
}



export const unsubscribe = async (req,res) => {
    try{

       await uUser.findByIdAndUpdate(req.user.id,{
        $pull:{subscribedUsers:req.params.id}
       })

       await uUser.findByIdAndUpdate(req.params.id,{
        $inc:{
            subcribers:-1
        }
       })


       res.status(200).json("user unsubscribed succesfully")



    }catch(err){
        res.status(500).json(err)
    }
}