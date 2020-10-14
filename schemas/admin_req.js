const mongoose=require("mongoose")

const requestSchema=new mongoose.Schema({
    username: String,
    name: String,
    phone: Number
})

const AdminReq=new mongoose.model("Request",requestSchema)

module.exports=AdminReq