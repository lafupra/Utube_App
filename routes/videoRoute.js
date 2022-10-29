import express from "express"
import { verifyTokenAndAuth } from "../controllers/verifyToken.js"
import {getVideo,updateVideo,addVideo,deleteVideo,addView,getTrend,getRandom,getSub,getByTag,getBySearch,getAll} from "../controllers/videoController.js"

const router = express.Router()

router.get("/:vid",getVideo)


router.put("/:vid",verifyTokenAndAuth,updateVideo)


router.post("/:id",verifyTokenAndAuth,addVideo)

router.delete("/:vid",verifyTokenAndAuth,deleteVideo)


router.put("/view/:vid",addView)

router.get("/trend",getTrend)

router.get("/",getAll)

router.get("/random",getRandom)

router.get("/sub",verifyTokenAndAuth,getSub)

router.get("/tags",getByTag)

router.get("/search",getBySearch)



export default router