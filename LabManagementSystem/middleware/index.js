const multer = require("multer");

const middleware = {};

middleware.isLoggedIn = function(req, res, next) {
    if(req.isAuthenticated()) {
        // return next();
        if(req.user["isVerfied"])
            return next();
        req.flash("error", "You need to verify your email first");
        res.redirect("/");
    }else {
        req.flash("error", "You need to be logged in first");
        res.redirect("/");
    }
    
};

middleware.isAdmin = function(req, res, next) {
    if(req.isAuthenticated() && req.user.isAdmin) {
        return next();
    }
    req.flash("error", "Sorry, this route is allowed for admin only");
    res.redirect("/");
};

middleware.upload = multer({
    limits: {
        fileSize: 4 * 1024 * 1024,
    }
    });

middleware.isVerified = function(req,res,next) {
    if(req.isAuthenticated() && req.user.isVerified) {
        return next();
    }
    req.flash("error", "Please verify your email.");
    res.redirect("/");
}

module.exports = middleware;