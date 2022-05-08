//loading required dependancies
const express = require("express");
const router = express.Router();
const cors = require("cors");
const nodemailer = require("nodemailer");

//setting up server on port 5000
const app = express();
app.use(cors());
app.use(express.json());
app.use("/", router);
app.listen(5000, () => console.log("Server Running"));


//creating transporter object to send email 
let contactEmail = nodemailer.createTransport({
   host: "smtp.gmail.com",
   port: 587,
   secure: false, // true for 587, false for other ports
   requireTLS: true,
   auth: {
       user: "coconutjpgemails@gmail.com", 
       pass:  "Jj8p045C0VuLva09iuoI34", //yea, that's our password
   },
});

 

 //printing out state of transporter
 contactEmail.verify((error) => {
   if (error) {
     console.log(error);
   } else {
     console.log("Ready to Send");
   }
 });
 

 //handling requests made to the server 
 router.post("/contact", (req, res) => {
   const firstName = req.body.firstName;
   const email = req.body.emailAddress;
   
   //creating email
   const mail = {
     from: "coconutjpgemails@gmail.com",
     to: "cokerm360@gmail.com",  
     subject: "Coconut.jpg successful Registration",
     html: `Hey ${firstName}! You've succesfully registered to Coconut.jpg.`,
   };
 
    
   //using transporter finally send an email
   contactEmail.sendMail(mail, (error) => {
     if (error) {
       res.json({ status: "ERROR" });
       console.log(error)
     } else {
       res.json({ status: "Message Sent" });
       console.log("sending email")
     }
   });
 });