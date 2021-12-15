const Guider = require("../model/Guider");
var ObjectID = require("mongodb").ObjectID;
const CompanyTour = require("../model/ComapnyTour");
const Tourist = require("../model/tourist");

const Company = require("../model/travellingCompany");

const Tour = require("../model/Tour");
const addrequest = require("../model/requestquote");

const VGuider = require("../model/virtualTourGuider");

const Review = require("../model/review");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const Conversation = require("../model/Conversation");
const Message = require("../model/Message");

// const TouristReg =require('../model/registeration/TouristReg')
const GuiderReg = require("../model/registeration/GuiderReg");
const CompanyReg = require("../model/registeration/CompanyReg");
const { Mongoose, mongo } = require("mongoose");

// const cookieParser=require('cookie-parser')
// const { findById } = require('../model/Guider');

// exports.testerone=(req,res)=>{

//     res.send('testing')
// }

// create and save new user

/*   Creating Guider Profile */

exports.create = async (req, res) => {
  const user = new Guider(req.body);
  try {
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
};

/*retreive  and return all users of guider profile  */

exports.findall = async (req, res) => {
  try {
    const guiderpro = await Guider.find({});

    res.send(guiderpro);
  } catch (e) {
    res.status(500).send();
  }
};
exports.findGuidersByCity = async (req, res) => {
  console.log(req.body);
  try {
    const guiderpro = await Guider.find({ city: req.body.city });

    res.send(guiderpro);
  } catch (e) {
    res.status(500).send();
  }
};

// Retreive and return single user of guider profile
exports.findguider = async (req, res) => {
  const _id = req.params.id;
  try {
    const touristpro = await Guider.findById(_id);

    if (!touristpro) {
      return res.status(404).send("user not found");
    }

    res.send(touristpro);
  } catch (e) {
    res.status(500).send();
  }
};
/*    Update the guider profile with id       */

exports.updateguipro = async (req, res) => {
  try {
    const user = await Guider.findOneAndUpdate(
      { _id: req.body._id },
      {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        bio: req.body.bio,
        is_vGuide: req.body.is_vGuide,
        city: req.body.city,
        price: req.body.price,
      },
      {
        new: true,
      }
    ); //this gonna be return new user after update
    console.log(req.body);

    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
};

//Delete the guider profile with id

exports.deleteGuider = async (req, res) => {
  try {
    const user = await Guider.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).send();
    }
    res.send("deleted successfully");
  } catch (e) {
    res.status(500).send();
  }
};

////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////

/*           TOURIST PROFILE API                         */

/Creating Tourist profile/;

exports.createtouristpro = async (req, res) => {
  const Touristprofile = new Tourist(req.body);
  try {
    await Touristprofile.save();
    res.status(201).send(Touristprofile);
  } catch (e) {
    res.status(400).send(e);
  }
};

/                           Getting all tourist profiles        /;

exports.getalltourist = async (req, res) => {
  try {
    const touristpro = await Tourist.find({});

    res.send(touristpro);
  } catch (e) {
    res.status(500).send();
  }
};

/Getting tourist profile by id/;

exports.getTouristId = async (req, res) => {
  const _id = req.params.id;
  try {
    const touristpro = await Tourist.findById(_id);

    if (!touristpro) {
      return res.status(404).send("user not found");
    }

    res.send(touristpro);
  } catch (e) {
    res.status(500).send();
  }
};

/* Updating The tourist profile by id                                     */

exports.updateTouristId = async (req, res) => {
  try {
    const user = await Tourist.findOneAndUpdate(
      { _id: req.body._id },
      {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        bio: req.body.bio,
        city: req.body.city,
      },
      {
        new: true,
      }
    ); //this gonna be return new user after update
    console.log(req.body);

    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
};

/*             Delete tourist pro with id                        */

exports.delTouristId = async (req, res) => {
  try {
    const touristpro = await Tourist.findByIdAndDelete(req.params.id);

    if (!touristpro) {
      return res.status(404).send();
    }
    res.send("deleted successfully");
  } catch (e) {
    res.status(500).send();
  }
};

//////////////////////////////////////////////////////////////////////

/*      Travelling Company API           */

////////////////////////////////////////////////////////////////////////

/*Create api of Travelling company*/

exports.createCompany = async (req, res) => {
  const Companypro = new Company(req.body);
  try {
    await Companypro.save();
    res.status(201).send(Companypro);
  } catch (e) {
    res.status(400).send(e);
  }
};

/*Getting all travelling company*/

exports.getAllCompanies = async (req, res) => {
  try {
    const Companypro = await Company.find({});

    res.send(Companypro);
  } catch (e) {
    res.status(500).send();
  }
};

/GETTING TRAVELLING COMPANY BY ID/;

exports.getCompanyID = async (req, res) => {
  const _id = req.params.id;
  try {
    const Companypro = await Company.findById(_id);

    if (!Companypro) {
      return res.status(404).send("user not found");
    }

    res.send(Companypro);
  } catch (e) {
    res.status(500).send();
  }
};

/Updating traveliing company by id/;

/* Updating The tourist profile by id                                     */

exports.updateCompanyId = async (req, res) => {
  //    const updates=Object.keys(req.body)

  //    //1 :which things you allowed to updates
  //     const allOwedUpdates=['name','email','description','destination']

  //     const isValidoperation=updates.every((update)=> allOwedUpdates.includes(update))

  try {
    const Companypro = await Company.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ); //this gonna be return new user after update

    if (!Companypro) {
      return res.status(404).send();
    }
    res.send(Companypro);
  } catch (e) {
    res.status(400).send(e);
  }
};

/Delete company profile with id/;

exports.deletecompanyID = async (req, res) => {
  try {
    const Companypro = await Company.findByIdAndDelete(req.params.id);

    if (!Companypro) {
      return res.status(404).send();
    }
    res.send("deleted successfully");
  } catch (e) {
    res.status(500).send();
  }
};

////////////////////////////////////////////////////////////////

/*REST API FOR TOUR*/

///////////////////////////////////////////////////////////////////

//Create company tour

exports.createCompanyTour = async (req, res) => {
  const tour = new CompanyTour(req.body);
  console.log(req.body);
  try {
    await tour.save();
    res.status(201).send(tour);
  } catch (e) {
    res.status(400).send(e);
  }
};
exports.getAllCompanyTours = async (req, res) => {
  try {
    const tour = await CompanyTour.find({});

    res.send(tour);
  } catch (e) {
    res.status(500).send();
  }
};
exports.getOneCompanyTour = async (req, res) => {
  const _id = req.params.id;
  try {
    const tour = await CompanyTour.findById(_id);

    if (!tour) {
      return res.status(404).send("user not found");
    }

    res.send(tour);
  } catch (e) {
    res.status(500).send();
  }
};

/Creating tour/;

exports.createTour = async (req, res) => {
  const tour = new Tour(req.body);
  console.log(req.body);
  try {
    await tour.save();
    res.status(201).send(tour);
  } catch (e) {
    res.status(400).send(e);
  }
};

/Get all tours/;

exports.getalltours = async (req, res) => {
  try {
    const tour = await Tour.find({});

    res.send(tour);
  } catch (e) {
    res.status(500).send();
  }
};

/Get tour by id/;

exports.getTourId = async (req, res) => {
  const _id = req.params.id;
  try {
    const tour = await Tour.findById(_id);

    if (!tour) {
      return res.status(404).send("user not found");
    }

    res.send(tour);
  } catch (e) {
    res.status(500).send();
  }
};

exports.updatetourId = async (req, res) => {
  //    const updates=Object.keys(req.body)

  //    //1 :which things you allowed to updates
  //     const allOwedUpdates=['name','email','description','destination']

  //     const isValidoperation=updates.every((update)=> allOwedUpdates.includes(update))

  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }); //this gonna be return new user after update

    if (!tour) {
      return res.status(404).send();
    }
    res.send(tour);
  } catch (e) {
    res.status(400).send(e);
  }
};

/Delete the tour with id/;

exports.deletetourID = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);

    if (!tour) {
      return res.status(404).send();
    }
    res.send("deleted successfully");
  } catch (e) {
    res.status(500).send();
  }
};

//////////////////////////////////////////////////////////////////////////////////
//---------------  add a request   ---------------
/posting add a request/;

exports.createaddrequest = async (req, res) => {
  console.log(req.body);
  const request = new addrequest(req.body);
  try {
    await request.save();
    res.status(201).send(request);
  } catch (e) {
    res.status(400).send(e);
  }
};

/Get all requests/;

exports.getaddrequest = async (req, res) => {
  try {
    const request = await addrequest.find({});

    res.send(request);
  } catch (e) {
    res.status(500).send();
  }
};

/Get request by id/;

exports.getrequestid = async (req, res) => {
  const _id = req.params.id;
  try {
    const request = await addrequest.findById(_id);

    if (!request) {
      return res.status(404).send("user not found");
    }

    res.send(request);
  } catch (e) {
    res.status(500).send();
  }
};

exports.updaterequest = async (req, res) => {
  //    const updates=Object.keys(req.body)

  //    //1 :which things you allowed to updates
  //     const allOwedUpdates=['name','email','description','destination']

  //     const isValidoperation=updates.every((update)=> allOwedUpdates.includes(update))

  try {
    const request = await addrequest.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ); //this gonna be return new user after update

    if (!request) {
      return res.status(404).send();
    }
    res.send(request);
  } catch (e) {
    res.status(400).send(e);
  }
};

/Delete the request with id/;

exports.deleterequest = async (req, res) => {
  try {
    const request = await addrequest.findByIdAndDelete(req.params.id);

    if (!request) {
      return res.status(404).send();
    }
    res.send("deleted successfully");
  } catch (e) {
    res.status(500).send();
  }
};

/*API FOR VIRTUAL GUIDER* */

////////////////////////////////////////////////////////////////////////////////

/Craete VIRTUAL Guider/;

exports.createVGuider = async (req, res) => {
  const vguider = new VGuider(req.body);
  try {
    await vguider.save();
    res.status(201).send(vguider);
  } catch (e) {
    res.status(400).send(e);
  }
};

/Get all VGuiders/;

exports.GetallVGuiders = async (req, res) => {
  try {
    const vguider = await VGuider.find({});

    res.send(vguider);
  } catch (e) {
    res.status(500).send();
  }
};

/Get Vguider by its id/;

exports.GetVGuiderid = async (req, res) => {
  const _id = req.params.id;
  try {
    const Vguider = await VGuider.findById(_id);

    if (!Vguider) {
      return res.status(404).send("user not found");
    }

    res.send(Vguider);
  } catch (e) {
    res.status(500).send();
  }
};

/Update the Vguider by id/;

exports.updateVguiderId = async (req, res) => {
  //    const updates=Object.keys(req.body)

  //    //1 :which things you allowed to updates
  //     const allOwedUpdates=['name','email','description','destination']

  //     const isValidoperation=updates.every((update)=> allOwedUpdates.includes(update))

  try {
    const Vguider = await VGuider.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }); //this gonna be return new user after update

    if (!Vguider) {
      return res.status(404).send();
    }
    res.send(Vguider);
  } catch (e) {
    res.status(400).send(e);
  }
};

/Delete the VGuider with id/;

exports.deleteVguiderId = async (req, res) => {
  try {
    const vguider = await VGuider.findByIdAndDelete(req.params.id);

    if (!vguider) {
      return res.status(404).send();
    }
    res.send("deleted successfully");
  } catch (e) {
    res.status(500).send();
  }
};

///////////////////////////////////////////////////////////////////////

/*REST API FOR REVIEWS* */

/////////////////////////////////////////////////////////////////////

exports.createReview = async (req, res) => {
  const review = new Review(req.body);
  try {
    await review.save();
    res.status(201).send(review);
  } catch (e) {
    res.status(400).send(e);
  }
};

/Get all reviews/;

exports.GetallVReviews = async (req, res) => {
  console.log(req.body);
  try {
    const review = await Review.find({ giuderID: req.body.id });

    res.send(review);
  } catch (e) {
    res.status(500).send();
  }
};

/*Getting reviews by id* */

exports.GetVReviewsID = async (req, res) => {
  const _id = req.params.id;
  try {
    const review = await Review.findById(_id);

    if (!review) {
      return res.status(404).send("user not found");
    }

    res.send(review);
  } catch (e) {
    res.status(500).send();
  }
};

/Update the Reviews by id/;

exports.updateReviewID = async (req, res) => {
  //    const updates=Object.keys(req.body)

  //    //1 :which things you allowed to updates
  //     const allOwedUpdates=['name','email','description','destination']

  //     const isValidoperation=updates.every((update)=> allOwedUpdates.includes(update))

  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }); //this gonna be return new user after update

    if (!review) {
      return res.status(404).send();
    }
    res.send(review);
  } catch (e) {
    res.status(400).send(e);
  }
};

/Delete the Reviews with id/;

exports.deleteReviewId = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);

    if (!review) {
      return res.status(404).send();
    }
    res.send("deleted successfully");
  } catch (e) {
    res.status(500).send();
  }
};

//

//                     exports.createGuiReg =async (req,res)=>{

//                         const guireg=new GuiderReg(req.body)
//                     try{
//                         await guireg.save()
//                         res.status(201).send(guireg)

//                     }catch(e){
//                         res.status(400).send(e)

//                     }

//                     }

//                     //update the guiderreg id

//                     exports.updateGuiReg=async(req,res)=>{

//                            const updates=Object.keys(req.body)

//                            //1 :which things you allowed to updates
//                             const allOwedUpdates=['firstName','lastName',' email','password' , 'passwordConfirm']

//                             const isValidoperation=updates.every((update)=> allOwedUpdates.includes(update))

//                             try{

//                         const guireg=await GuiderReg.findById(req.params.id)

//                         updates.forEach((update)=> guireg[update] =req.body[update])

//                         await guireg.save()
//     //const guireg= await GuiderReg.findByIdAndUpdate( req.params.id,req.body , {new:true,runValidators:true})  //this gonna be return new user after update

//                         if(!guireg){
//                             return res.status(404).send()
//                         }
//                                    res.send(guireg)
//                         }

//                             catch(e){
//                         res.status(400).send(e)
//                             }
//                         }

//                         ///////////////////////////////

//                         /*guider login* */

// //                         exports.loginguider=async(req,res)=>{

// //                             try{

// //   const guireg= await GuiderReg.findByCrdentials(req.body.email,req.body.password)

// //      res.send(guireg)

// //                             }catch (e){
// //                                             res.status(400).send()

// //                             }
// //                         }

// exports.loginguider=async(req,res)=>{
// try{

//     const{email,password,passwordConfirm}=req.body;

//     if(!email || !password || !passwordConfirm){

//     return res.status(400).send('plz filled the data')
//     }

// const guireg=await GuiderReg.findOne({email:email});

// const token=await guireg.generateAuthToken()

// res.send({guireg,token})

// if(guireg){

//     const isMatch=await bcrypt.compare(password,guireg.password)

//     const isMatching=await bcrypt.compare(passwordConfirm,guireg.passwordConfirm)

// if(!isMatch){

//      res.status(400).send('invalid credentials passed')
// }else{
//     res.send({ message:'user sign in successfully'})
// }

// if(!isMatching){

//     res.status(400).send('invalid credentials passed in confirm password')
// }else{
//    res.send({ message:'user sign in successfully'})
// }

// }else{
//     res.send({ error:'invalid credentials'})
// }
// }
// catch(e){
//     console.log(e)
// }
// }
//API
/*  -------tourist-registration-------*/
exports.CreatTouristReg = async (req, res) => {
  // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  const emailDup = await Tourist.findOne({ email: req.body.values.email });
  if (!emailDup) {
    console.log(req.body.values);
    const checkEmail = new Tourist({
      firstname: req.body.values.firstname,
      lastname: req.body.values.lastname,
      email: req.body.values.email,
      password: req.body.values.password,
      is_tourist: req.body.values.is_tourist,
    });

    try {
      const token = jwt.sign(
        { _id: checkEmail._id.toString() },
        "THISISALIABRARSYED12345"
      );
      checkEmail.tokens = checkEmail.tokens.concat({ token });
      // const token=await TouristReg.generateAuthToken()
      /*  this will use when we render front end on the server    */
      // res.cookie('jwt1',token)
      // console.log(cookie)
      await checkEmail.save();
      res.send({ checkEmail, token, proceed: 1 });
    } catch (error) {
      res.status(404).send(error);
    }
  } else {
    res.send({ proceed: 0, msg: "Email already exist" });
  }
};
// exports.CreatTourist=async(req,res)=>{
//     const touristReg=new TouristReg(
//         {
//             firstname:req.body.firstname,
//             lastname:req.body.lastname,
//             email:req.body.email,
//             password:req.body.password
//         })

//     try{
//         const token= jwt.sign({_id:touristReg._id.toString()},'THISISALIABRARSYED12345')
//         touristReg.tokens=touristReg.tokens.concat({token})
//         // const token=await TouristReg.generateAuthToken()
//         /*  this will use when we render front end on the server    */
//         res.cookie('jwt1',token)
//         // console.log(cookie)
//         await touristReg.save()
//         res.send({touristReg,token})

//     }
//     catch(error){
//         res.status(404).send(error)
//     }

// }
/* ---------  tourist-login  --------*/
exports.CreatTouristLogin = async (req, res) => {
  try {
    const email = req.body.values.email;
    const password = req.body.values.password;
    const checkEmail = await Tourist.findOne({ email: email });
    const isMatch = await bcrypt.compare(password, checkEmail.password);

    //  generating token
    const token = jwt.sign(
      { _id: checkEmail._id.toString() },
      "THISISALIABRARSYED12345"
    );
    checkEmail.tokens = checkEmail.tokens.concat({ token });
    // const token=await checkEmail.generateAuthToken()
    /*  this will use when we render front end on the server    */
    // res.cookie('jwt1',token)
    // console.log(cookie)
    if (isMatch) {
      res.json({ token, proceed: 1, msg: "Successfull Login", checkEmail });
      console.log(token);
    } else {
      res.json({ proceed: 0, msg: "Wrong credentials" });
    }
  } catch (e) {
    res.status(404).send("unable");
  }
};
/*  -------guider-registration-------*/
exports.CreatGuiderReg = async (req, res) => {
  const emailDup = await Guider.findOne({ email: req.body.values.email });

  if (!emailDup) {
    console.log(req.body.values);
    const checkEmail = new Guider(req.body.values);

    try {
      // const token=await guiderReg.generateAuthToken()
      const token = jwt.sign(
        { _id: checkEmail._id.toString() },
        "THISISHAMMADALISHAHZAD"
      );
      checkEmail.tokens = checkEmail.tokens.concat({ token });
      // res.cookie('jwt2',token)
      await checkEmail.save();
      console.log(token);
      res.status(201).send({ checkEmail, token, proceed: 1 });
    } catch (e) {
      res.status(400).send(e);
    }
  } else {
    res.send({ proceed: 0, msg: "email already exists" });
  }
};
/* ---------  guider-login  --------*/
exports.CreatGuiderLogin = async (req, res) => {
  try {
    const email = req.body.values.email;
    const password = req.body.values.password;
    const checkEmail = await Guider.findOne({ email: email });
    const isMatch = await bcrypt.compare(password, checkEmail.password);
    //  generating token
    const token = jwt.sign(
      { _id: checkEmail._id.toString() },
      "THISISHAMMADALISHAHZAD"
    );
    checkEmail.tokens = checkEmail.tokens.concat({ token });
    /*  this will use when we render front end on the server    */
    // res.cookie('jwt2',token)
    // console.log(cookie)
    if (isMatch) {
      res.send({ checkEmail, proceed: 1, msg: "succesfully" });
    } else {
      res.send({ proceed: 0, msg: "wrong credentials" });
    }
  } catch (e) {
    res.status(404).send("unable");
  }
};

exports.createConversation = async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });
  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
};
exports.getConversation = async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
};
exports.createMessanger = async (req, res) => {
  const newMessage = new Message(req.body);

  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
};
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
};

/*  -------company-registration-------*/
exports.CreatCompanyReg = async (req, res) => {
  const emailDup = await Company.findOne({ email: req.body.values.email });
  if (!emailDup) {
    console.log(req.body.values, "hell");
    const checkEmail = new Company(req.body.values);
    try {
      // const token=await CompanyReg.generateAuthToken()
      const token = jwt.sign(
        { _id: checkEmail._id.toString() },
        "THISISASHAHEERNASEER"
      );
      checkEmail.tokens = checkEmail.tokens.concat({ token });

      /*  this will use when we render front end on the server    */
      // res.cookie('jwt3',token)
      // console.log(cookie)
      await checkEmail.save();
      res.send({ checkEmail, token, proceed: 1 });
    } catch (e) {
      res.status(404).send(e);
    }
  } else {
    res.send({ proceed: 0, msg: "email already exists" });
  }
};
/* ---------  company-login  --------*/
exports.CreatCompanyLogin = async (req, res) => {
  try {
    const email = req.body.values.email;
    const password = req.body.values.password;
    const checkEmail = await Company.findOne({ email: email });
    const isMatch = await bcrypt.compare(password, checkEmail.password);
    //  generating token
    const token = jwt.sign(
      { _id: checkEmail._id.toString() },
      "THISISASHAHEERNASEER"
    );
    checkEmail.tokens = checkEmail.tokens.concat({ token });
    /*  this will use when we render front end on the server    */
    // res.cookie('jwt3',token)
    // console.log(cookie)
    if (isMatch) {
      res.send({
        proceed: 1,
        msg: "you have successfully logged in",
        checkEmail,
        token,
      });
    } else {
      res.send({ proceed: 0, msg: "wrong credentials" });
    }
  } catch (e) {
    res.status(400).send("unable to login");
  }
};
