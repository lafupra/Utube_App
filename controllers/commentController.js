import Comment from "../models/Comment.js"

export const getCommentByVideo = async (req,res) => {
    
    
    try{

        const getcomment = await Comment.find({videoId:req.params.vid})

       
        
        !getcomment && res.status(404).json("no comment found")

        res.status(200).json(getcomment)
    
    }catch(err){
        res.status(500).json(err)
    }
}


export const updateComment = async (req,res) => {
    
    try{

        const comment = await Comment.findById(req.params.cid)
 
         !comment && res.status(404).json("no comment found")
 
         if(req.user.id === comment.userId){
             const updatedcomment  = await Comment.findByIdAndUpdate(req.params.cid,{
                $set:req.body
             },
             {new:true})
 
             
         res.status(200).json(updatedcomment)

         }else{
             res.status(401).json("you are unauthorise for this action")
         }
}catch(err){
    res.status(500).json(err)
}

}

export const addComment = async (req,res) => {


    
    try{

        const newcomment = new Comment({
            userId:req.user.id, 
            ...req.body
        })

        const savedcomment = await newcomment.save()
        !savedcomment && res.status(500).json("no comment added due to some error")

        res.status(200).json(savedcomment)
    
    }catch(err){
        res.status(500).json(err)
    }
}



export const deleteComment = async (req,res) => {
    
    try{

       const comment = await Comment.findById(req.params.cid)

        !comment && res.status(404).json("no comment found")

        if(req.user.id === comment.userId){
            const deletedcomment  = await Comment.findByIdAndDelete(req.params.cid)

            
        res.status(200).json("deletedcomment")
        }else{
            res.status(401).json("you are unauthorise for this action")
        }

    
    }catch(err){
        res.status(500).json(err)
    }
}