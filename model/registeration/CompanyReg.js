// const mongoose=require('mongoose')
// const validator=require('validator')
// const bcrypt=require('bcryptjs')
// const jwt=require('jsonwebtoken')

// const companySchema=new mongoose.Schema({
//     companyname:{
//         type:String,
//         required:true,
//         trim:true
//     },
    
//     email:{
//         type:String,
//         required:true,
//         unique:true,
//         lowercase:true,
//         validate:[validator.isEmail,'please provide valid email'],
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
//     // confirmpassword:{
//     //     type:String,
//     //     required:true,
//     //     validate:{
//     //         validator:function(pass){
//     //         return pass===this.password
//     //         },
//     //             message:'password doesnot match'
            
//     //     },
//     //     minlength:7,
//     //     trim:true
//     // }


// })
// // companySchema.methods.generateAuthToken=async function(){
// //     try{
// //         const token=jwt.sign({_id:this._id.toString()},process.env.SECRET_KEY3)
// //         this.tokens=this.tokens.concat({token:token})
// //         await this.save()
// //     }catch(e){
// //         res.status(404).send('token is not generating')
// //     }
// // }
// //hashing password
// companySchema.pre('save',async function(next){
// const company=this
// if(company.isModified('password')){
//    company.password= await bcrypt.hash(company.password,8)
// }
// next()
// })


// const CompanyReg=mongoose.model('CompanyReg',companySchema)
// module.exports=CompanyReg