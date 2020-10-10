const mongoose=require("mongoose")
const passportLocalMongoose=require("passport-local-mongoose")
const userSchema=new mongoose.Schema({
    username: String,
    password: String,
    name: String,
    lastSeen: String,
    phone: String,
    admin: Boolean,
    googleId: String,
    liked: [Number]
})

userSchema.plugin(passportLocalMongoose)

const User=new mongoose.model("User",userSchema)
module.exports=User