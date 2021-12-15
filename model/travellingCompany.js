const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

const companySchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: [true, 'A company must have a name']
  },
  email: {
    type: String,
    required: [true, 'A company must have a email'],
    //lowercae: true,
    validate: [validator.isEmail, 'Please put a valid email']
  },
  password:{
    type:String,
    required:true,
    minlength:7,
    trim:true
  },is_company:{
   type:Boolean,
   require:true,
 },
// mainOffices: {
//   type: String,
// },
// website: String,
tokens:[{
  token:{
      type:String,
      required:true
  }
}]

  

});

//hashing password
companySchema.pre('save',async function(next){
  const company=this
  if(company.isModified('password')){
     company.password= await bcrypt.hash(company.password,8)
  }
  next()
  })
const Company = mongoose.model('Company', companySchema);
module.exports = Company;
