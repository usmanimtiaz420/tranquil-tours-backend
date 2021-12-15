// const mongoose=require('mongoose')
// const validator=require('validator')
// const bcrypt=require('bcryptjs')
// const jwt=require('jsonwebtoken')

// const touristSchema=new mongoose.Schema({
//     firstname:{
//         type:String,
//         required:true,
//         trim:true
//     },
//     lastname:{
//         type:String,
//         required:true,
//         trim:true
//     },
//     email:{
//         type:String,
//         required:true,
//         unique:true,
//         lowercase:true,
//         validate:[validator.isEmail,'email syntax is invalid'],
//     },
//     password:{
//         type:String,
//         required:true,
//         minlength:7,
//         trim:true
//     },
//     tokens:[{
//         token:{
//             type:String,
//             required:true
//         }
//     }]
// })
// //login 
// // touristSchema.statics.findByCredentials=async(email,password)=>{
// //     const Tourist=this
// //     const T=await Tourist.findOne({email})
// //     if(!T){
// //         throw new Error['unable to find user']
// //     }
// //     const isMatch=await bcrypt.compare(password,T.password)
// //     if(!isMatch){
// //         throw new Error['unable to login']
// //     }
// //     return Tourist
// // }
// //generating token
// // touristSchema.methods.generateAuthToken=async function(){
    
// // try{
// //     console.log(this)
// //     const token= jwt.sign({_id:this._id.toString()},process.env.SECRET_KEY1)
// //     this.tokens=this.tokens.concat({token:token})//pushing token into database
// //     await this.save()//saving tourist details with token
// //     return token
// //     console.log(token)

// // }catch(e){
// //     console.log('token is not generating ')
// //     res.status(404).send('token is not generating')
// // }
// // }

// //hashing the password
// touristSchema.pre('save',async function(next){
//     const Tourist=this
//     if(Tourist.isModified('password')){
//         Tourist.password=await bcrypt.hash(Tourist.password,8)
//     }
//     next()
// })


// const TouristReg=mongoose.model('TouristReg',touristSchema)
// module.exports=TouristReg