const jwt=require('jsonwebtoken')
const companyReg=require('../model/registeration/CompanyReg')
const company=require('../model/travellingCompany')

/*  where we want authenticate user there we use this auth as a middleware is the route handler  */
const authC=async(req,res,next)=>{
    try{
        const token= req.header('Authorization').replace('Bearer ','')  // getting cookie
        const verifyCompany=jwt.verify(token,'THISISASHAHEERNASEER')
        console.log(token)
        next()
    }
    catch(e){
        res.status(404).send(e)
    }
}
module.exports=authC