const jwt=require('jsonwebtoken')
// const guider=require('../model/registeration/GuiderReg')
const guider=require('../model/Guider')
/*  where we want authenticate user there we use this auth as a middleware is the route handler  */
const authG=async(req,res,next)=>{
    try{
        const token= req.header('Authorization').replace('Bearer ','')  // getting cookie
        const verifyGuider=jwt.verify(token,'THISISHAMMADALISHAHZAD')
        console.log(token)
        next()
        
    }
    catch(e){
        res.status(404).send(e)
    }
}
module.exports=authG