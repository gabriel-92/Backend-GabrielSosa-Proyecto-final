const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const userSchema = new mongoose.Schema({
    name: { type: String },
    lastName: { type: String },
    email: { type: String },
    password: { type: String },
    address: { type: String },
    role: { type: String, default: "user" }
}, { timestamps: true });


userSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

userSchema.methods.matchPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}






module.exports = mongoose.model("User", userSchema);

