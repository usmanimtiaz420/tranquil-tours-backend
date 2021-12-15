const jwt=require('jsonwebtoken')
// const touristReg=require('../model/registeration/TouristReg')
const tourist=require('../model/tourist')
// /*  where we want authenticate user there we use this auth as a middleware is the route handler  */
const authT=async(req,res,next)=>{
   
    try{
        const token= req.header('Authorization').replace('Bearer ','')  // getting cookie
        const verify=jwt.verify(token,'THISISALIABRARSYED12345')
        console.log(token)
        
        
        next()
    }
    catch(e){
        res.status(404).send(e)
    }
}
module.exports=authT