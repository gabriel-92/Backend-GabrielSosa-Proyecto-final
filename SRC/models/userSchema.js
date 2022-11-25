const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const avatarRandom = () => {
    const random = Math.floor(Math.random() * 9);
    return `https://randomuser.me/api/portraits/lego/${random}.jpg`;
};


const userSchema = new mongoose.Schema({
    name: { type: String },
    lastName: { type: String },
    email: { type: String },
    password: { type: String },
    address: { type: String },
    role: { type: String, default: "user" },
    // avatar: { type: String, default: avatarRandom() },
    profilePic: { type: String, },
    phone: { type: String },
}, { timestamps: true });


userSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

userSchema.methods.matchPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}






module.exports = mongoose.model("User", userSchema);

