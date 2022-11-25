import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "./userSchema";
import log from "./log.js";
import transporterDefault from "../utility/messages/mail";
import upload from "../utility/upload/upload";


const mailOptions = {
    from: "Ecommerce ",
    to: "gaby.cab.lg@gmail.com",
    subject: "New user",
    html: `
    <h1>Hi</h1>
    <div style="background-color: #f5f5f5; padding: 20px; font-family: Arial, Helvetica, sans-serif;">
            <div style="background-color: #fff; padding: 20px; border-radius: 5px;">
                <h1 style="color: #333; font-size: 20px; margin: 0 0 20px 0;">Hola acaba de registrarse un nuevo usuario</h1>
                <h2 style="color: #333; font-size: 20px; margin: 0 0 20px 0;">Datos del usuario</h2>
                <ul style="list-style: none; margin: 0; padding: 0;">
                    <li style="margin: 0 0 10px 0;">Nombre:${User.name}</li>
                    <li style="margin: 0 0 10px 0;">Email:${User.email}</li>
                </ul>
                <p style="color: #333; font-size: 16px; margin: 0 0 20px 0;">
                </p>
            </div>
    </div>
    `
};

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
        (req, res) => {
            upload.single('profilePic')(req, res, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(req.file);
                }
            })
        }
        const newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        newUser.name = req.body.name;
        newUser.lastName = req.body.lastname;
        newUser.address = req.body.address;
        newUser.role = "user";
        newUser.phone = req.body.phone;
        newUser.profilePic = req.file ? req.file.filename : "default.png";
        // newUser.avatar = req.file ? req.file.filename : "default.png";
        await newUser.save();
        transporterDefault.sendMail(mailOptions, (error, info) => {
            if (error) {
                log.error(error);
            } else {
                log.info('Email sent: ' + info.response);
            }
        });
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
        log.error("User not found");
        return done(null, false, req.flash('signInMessage', 'No User Found'));
    } else if (!user.matchPassword(password)) {
        log.error("no password");
        return done(null, false, req.flash('signInMessage', 'Incorrect Password'));
    }
    return done(null, user);
}));