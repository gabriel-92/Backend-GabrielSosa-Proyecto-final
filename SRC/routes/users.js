import express from "express";
const router = express.Router();
import passport from "passport";
import User from "../models/userSchema";


export const auth = async (req, res, next) => {
    let id = req.user ? req.user.id : null;
    let user = await User.findById(id);
    if (user.role === "admin") {
        return next();
    }
    res.redirect('/login');
}

router.get("/register", (req, res) => {
    res.render("registration", { title: "Register", });
});

router.post('/register', passport.authenticate('localRegister', {
    successRedirect: '/api',
    failureRedirect: '/register',
    failureFlash: true
}));

router.get("/login", (req, res) => {
    res.render("login", { title: "Login", });
});

router.post('/login', passport.authenticate('localLogin', {
    successRedirect: '/api',
    failureRedirect: '/login',
    failureFlash: true
}));


router.get("/logout", (req, res, next) => {
    req.session.destroy();
    res.render("logout", { title: "Logout", });
})


export default router;
