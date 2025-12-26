const { default: mongoose } = require("mongoose");

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    tag:{
        type:String,
        require:true
    },
    blogImg:{
        type:String,
        require:true
    }
})
const BlogModel = mongoose.model("BlogModel",blogSchema);

module.exports = BlogModel;