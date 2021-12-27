// importing libraries
const passport = require("passport");
const Otp = require("../models/otp")
const nodemail = require("../utils/node_mailer")

if (process.env.NODE_ENV !== "production") require("dotenv").config();

// importing models
const User = require("../models/user");

exports.getLandingPage = (req, res, next) => {
  res.render("landing");
};

exports.getAdminLoginPage = (req, res, next) => {
  res.render("admin/adminLogin");
};

exports.getAdminLogout = (req, res, next) => {
  req.logout();
  res.redirect("/");
};

exports.getAdminSignUp = (req, res, next) => {
  res.render("signup");
};

exports.postAdminSignUp = async (req, res, next) => {
  try {
    if (req.body.adminCode === process.env.ADMIN_SECRET) {
      const newAdmin = new User({
        username: req.body.username,
        email: req.body.email,
        isAdmin: true,
      });

      const user = await User.register(newAdmin, req.body.password);
      await passport.authenticate("local")(req, res, () => {
        req.flash(
          "success",
          "Hello, " + user.username + " Welcome to Admin Dashboard"
        );
        res.redirect("/admin");
      });
    } else {
      req.flash("error", "Secret code does not matching!");
      return res.redirect("back");
    }
  } catch (err) {
    req.flash(
      "error",
      "Given info matches someone registered as User. Please provide different info for registering as Admin"
    );
    return res.render("signup");
  }
};

exports.getUserLoginPage = (req, res, next) => {
  res.render("user/userLogin");
};

exports.getUserLogout = async (req, res, next) => {
  await req.session.destroy();
  req.logout();
  res.redirect("/");
};

exports.getUserSignUp = (req, res, next) => {
  res.render("user/userSignup");
};

exports.postUserSignUp = async (req, res, next) => {
  
  try {
    if(req.body.email.split('@')[1] != "lnmiit.ac.in")
      return res.render("user/userSignup")

    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      email: req.body.email,
      gender: req.body.gender,
      address: req.body.address,
    });
    const otp = (Math.floor(Math.random() * (9999 - 0))).toString()
    await User.register(newUser, req.body.password)
    const newOtp = new Otp({
      value: otp,
      email: req.body.email
    })
    newOtp.save((err,result)=>{
      if(err) {
        console.log(err);
      }
       // send email
      const link = 'http://localhost:3000/auth/verify/'+req.body.username+'/'+otp
      nodemail(req.body.email,link)
      res.redirect("/")
    });
    // await passport.authenticate("local")(req, res, () => {
    //   res.redirect("/user/1");
    // });
  } catch (err) {
    console.log(err);
    return res.render("user/userSignup");
  }
};

exports.verifyEmail = (req,res)=>{
    const email = req.params.email
    const otp = req.params.otp

    Otp.find({email: email,value: otp},(err,result)=>{
      if(err) {
        res.send("error")
      }
      User.findOneAndUpdate({username:email},{isVerfied: true},(err,user)=>{
        if(err)
          res.send("error")
        res.send("verified!")
      })
    })
}
