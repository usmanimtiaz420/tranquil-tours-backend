const express = require("express");
const route = express.Router();
const authT = require("../middleware/authT");
const authG = require("../middleware/authG");
const authC = require("../middleware/authC");
const withAuth = require("../middleware/JwtAuth");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../public/images");
  },
  filename: function (req, file, cb) {
    cb(null, file.filename + "-" + Date.now());
  },
});
const upload = multer({ storage: storage });
const services = require("../services/render");
const controller = require("../controller/controller");

route.get("/", services.homeRoutes);

// Creat Tourist Registration details
// route.post('/TouristReg',controller.CreatTourist)
route.post("/tourist/reg", controller.CreatTouristReg);
//Create tourist login credentials
route.post("/tourist/login", controller.CreatTouristLogin);
//creat guider Registration detils
// route.post('/GuiderReg',controller.CreatGuider)
route.post("/Guider/Reg", controller.CreatGuiderReg);
//Creat guider login credentials
route.post("/guider/login", controller.CreatGuiderLogin);
//creat company registeration details
// route.post('/CompanyReg',controller.CreatCompany)
route.post("/Company/reg", controller.CreatCompanyReg);
//Creat guider login credentials
route.post("/company/login", controller.CreatCompanyLogin);

/* API ROUTES FOR GUIDER PROFILE  */

//Guider Profile
route.post("/Guider", controller.create);

//Getting all guider profile

route.get("/getGuider", controller.findall);
route.post("/getDesGuider", controller.findGuidersByCity);

//getting single guider profile by id

route.get("/searchGuider/:id", controller.findguider);

/* updating guider profile with id*/

route.post("/updateGuider", controller.updateguipro);

//delete guider Profile with id

route.delete("/deleteGuider/:id", controller.deleteGuider);

///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////

/* API FOR TOURIST PROFILE  */

/*  creating api for tourist */
route.post("/Tourist", controller.createtouristpro);

/*                  Getting all guiders of touristptofile              */

route.get("/getTourist", controller.getalltourist);

/* Getting tourist profile by id                              */
route.get("/tourist/:id", controller.getTouristId);

/*              updating the tourist ptofile with id          */

route.post("/updateTourist", controller.updateTouristId);

/*Delete tourist profile with id*/

route.delete("/tourist/:id", controller.delTouristId);

//////////////////////////////////////////////////////////////////

/*ROUTES FOR TRAVELLING COMPANY*/

/////////////////////////////////////////////////////////////////////

/*Create route of company*/

route.post("/Company", controller.createCompany);

/*  Getting all travelling companies*/

route.get("/getCompany", controller.getAllCompanies);

/*Getting travelling company profile with id*/

route.get("/Company/:id", controller.getCompanyID);

/** Route for updating travelling company by id */

route.patch("/Company/:id", controller.updateCompanyId);
// route.post('/Company/:id',controller.updateCompanynew)

/* Delete company profile with id*/

route.delete("/Company/:id", controller.deletecompanyID);

////////////////////////////////////////////////////////////////////

/*ROUTES FOR TOUR* */

//////////////////////////////////////////////////////////////////////

/*Craeting tours* */

route.post("/createTour", controller.createTour);
route.post("/createCompanyTour", controller.createCompanyTour);

/*getting all tours* */

route.get("/getTour", controller.getalltours);
route.get("/getCompanyTour", controller.getAllCompanyTours);
route.get("/getCompanyTours/:id", controller.getOneCompanyTour);

/*getting all tours by id*/

route.get("/Tour/:id", controller.getTourId);

/*Update tour by id* */

route.patch("/Tour/:id", controller.updatetourId);

/*Delete tour id* */

route.delete("/Tour/:id", controller.deletetourID);
/*ROUTES FOR request quote* */

route.post("/addNewRequest", controller.createaddrequest);
route.get("/getRequest", controller.getaddrequest);
route.get("/addrequest/:id", controller.getrequestid);
route.patch("/addrequest/:id", controller.updaterequest);
route.delete("/addrequest/:id", controller.deleterequest);

////////////////////////////////////////////////////

/*/ROUTES FOR VIRTUAL GUIDER/* */

////////////////////////////////////////////////////////

/*Create virtual guider* */

route.post("/VGuider", controller.createVGuider);

/*Get all VGuiders* */

route.get("/VGuider", controller.GetallVGuiders);

/*Get virtual Guiders by id* */

route.get("/VGuider/:id", controller.GetVGuiderid);

/*Update the route of Vguider* */

route.patch("/VGuider/:id", controller.updateVguiderId);

/*Delete the VGuider by id* */

route.delete("/VGuider/:id", controller.deleteVguiderId);

///////////////////////////////////////////////////////

/*Routes for Reviews* */

/////////////////////////////////////////////////////////

route.post("/addReview", controller.createReview);

/*Getting all reviews* */

route.get("/getReview", controller.GetallVReviews);

/*Getting reviews by id* */

route.get("/Review/:id", controller.GetVReviewsID);

/*updating reviews by id* */

route.patch("/Review/:id", controller.updateReviewID);

/*delete reviews by id* */

route.delete("/Review/:id", controller.deleteReviewId);

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
route.post("/Conversation", controller.createConversation);

route.get("/Conversation/:id", controller.getConversation);

//////////////////////////////////////////

route.post("/Messages", controller.createMessanger);

route.get("/Messages/:conversationId", controller.getMessages);
module.exports = route;
