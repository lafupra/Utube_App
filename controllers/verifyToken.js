
import jwt from "jsonwebtoken"


export const verifyToken = async (req,res,next) => {
    const authHeader = req.headers.token

    if(authHeader){
        const Token = authHeader.split(" ")[1]

        jwt.verify(Token,process.env.JWT_PASS,(err,user) => {
            if(err){
                res.status(401).json("token invalid")
            }else{
                req.user = user
                next()
            }
        })  

    }else{
        res.status(401).json("you are not authorised")
    }
}


export const verifyTokenAndAuth = async (req,res,next) => {
    !req.params.id && res.status(404).json("no id found in params")
    verifyToken(req,res,() => {
        if(req.user.id === req.params.id){
            next()

        }else{

            res.status(403).json("you are not allowed to enter")

        }

    })
}