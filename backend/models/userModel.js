const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please Enter your Name"],
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [4, "Name should have more than 4 characters"],
    },
    email: {
        type: String,
        required: [true, "Please Enter your Email"],
        unique: true,
        validator: [validator.isEmail, "Please Enter a valid Email"],
    },
    password: {
        type: String,
        required: [true, "Please Enter your Password"],
        minLength:[8, "Password should be greater than 8 characters"],
        select: false,
    },
    avatar:{
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            },
    },
    role:{
        type: String,
        default: "user",
    },
    createdAt:{
        type:Date,
        default:Date.now
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,
});


userSchema.pre("save",async function (next){

    if(!this.isModified("password")){
        next();
    }

    this.password = await bcrypt.hash(this.password,10)
});

// JWT Token
userSchema.methods.getJWTToken = function () {
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    });
};

// Compare Password
userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
};

// Generating password reset token
userSchema.methods.getResetPasswordToken = function(){
    
    //generating token
    const resetToken = crypto.randomBytes(20).toString("hex");

    //Hashing and add to userschema
    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

        this.resetPasswordExpire = Date.now() + 15 * 60 *1000;
        return resetToken;

};

module.exports = mongoose.model("User",userSchema);