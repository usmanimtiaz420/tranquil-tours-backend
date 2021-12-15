// const mongoose=require('mongoose')
// const validator=require('validator')
// const bcrypt=require('bcryptjs')


// const guiderSchema=new mongoose.Schema({
//     firstName: {
//         type: String,
//         required: [true, 'A guider must have a first Name'],
//         trim: true
//       },
//       lastName: {
//         type: String,
//         required: [true, 'A guider must have a last Name'],
//         trim: true
//       },
//       email: {
//         type: String,
//         unique: true,
//         required: [true, 'A guide must have an email'],
//         lowercase: true,
//         validate: [validator.isEmail, 'Please provide a valid email'],
//         trim: true
//       },
//       password: {
//         type: String,
//         required: [true, 'Please provide a password'],
//         minlength: 8,
//         trim: true
//       },
//       passwordConfirm: {
//         type: String,
//         trim: true,
//         required: [true, 'Please confirm your password'],
//         validate: {
//           validator: function(el) {
//             return el === this.password;
//           },
//           message: 'Passwords are not the same!'
//         }
//       },
//       tokens:[{
//         token:{
//           type:String,
//           require :true
//         }
//       }]
// })
// //generating token
// // guiderSchema.methods.generateAuthToken=async function(){
    
// //     try{
// //         const guide=this
// //         const token= jwt.sign({_id:guide._id.toString()},'THISISALIABRARSYED123')
// //         guide.tokens=guide.tokens.concat({token})//pushing token into database
// //         await guide.save()
// //         // console.log(token)
// //         return token
    
// //     }catch(e){
// //         console.log('token is not generating ')
// //         res.status(404).send('token is not generating')
// //     }
// //     }
// //hashing the password
// guiderSchema.pre('save',async function(next){
//     const guider=this
//     if(guider.isModified('password')){
//         guider.password=await bcrypt.hash(guider.password,8)
//     }
//     next()
// })
// const GuiderReg=mongoose.model('GuiderReg',guiderSchema)
// module.exports=GuiderReg