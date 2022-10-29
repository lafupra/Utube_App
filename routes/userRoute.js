import express from "express"
import {getAllUserData,putUserData,updateUser,deleteUser,loginUser,getUserData,like,dislike,subscribe,unsubscribe} from "../controllers/userController.js"
import {verifyTokenAndAuth,verifyToken} from "../controllers/verifyToken.js"

const router = express.Router()


// authentification

router.post("/reg",putUserData)

router.post("/login",loginUser)


router.get("/",getAllUserData)

router.get("/:id",getUserData)

router.put("/:id",verifyTokenAndAuth,updateUser)

router.delete("/:id",verifyTokenAndAuth,deleteUser)

router.put("/like/:vid",verifyToken,like)

router.put("/dislike/:vid",verifyToken,dislike)

router.put("/sub/:cid",verifyToken,subscribe)

router.put("/unsub/:cid",verifyToken,unsubscribe)



export default router