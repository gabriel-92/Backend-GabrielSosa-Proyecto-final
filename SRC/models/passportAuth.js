import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "./userSchema";

passport.serializeUser((user, done) => {
    done(null, user.id);
});


passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});


passport.use('localRegister', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    const user = await User.findOne({ email: email });
    if (user) {
        return done(null, false, req.flash('signupMessage', 'The Email is already Taken.'));
    } else {
        const newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        newUser.name = req.body.name;
        newUser.lastName = req.body.lastname;
        newUser.address = req.body.address;
        await newUser.save();
        done(null, newUser);
    }
}));

passport.use('localLogin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    const user = await User.findOne({ email: email });
    if (!user) {
        return done(null, false, req.flash('signInMessage', 'No User Found'));
    }
    if (!user.validate(password)) {
        return done(null, false, req.flash('signInMessage', 'Incorrect Password'));
    }
    return done(null, user);
}));