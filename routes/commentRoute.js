import express from "express"
import { verifyTokenAndAuth } from "../controllers/verifyToken.js"
import {getCommentByVideo,updateComment,addComment,deleteComment} from "../controllers/commentController.js"


const router = express.Router()


router.get("/:vid",getCommentByVideo)

router.put("/:cid",verifyTokenAndAuth,updateComment)

router.post("/:id",verifyTokenAndAuth,addComment)

router.delete("/:cid",verifyTokenAndAuth,deleteComment)


export default router