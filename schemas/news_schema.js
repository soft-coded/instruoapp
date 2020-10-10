const mongoose=require("mongoose")

const newsSchema=new mongoose.Schema({
    title: String,
    heading: String,
    post: String,
    date: String,
    op: String,
    postId: Number,
    likes: {
        likesNum: Number,
        likers: [String]
    }
})

const News=mongoose.model("news",newsSchema)
module.exports=News