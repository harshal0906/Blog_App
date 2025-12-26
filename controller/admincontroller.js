const BlogModel = require('../models/blogMModedl.js');
const fs = require("fs");

const adminPage = async (req, res) => {
    try {
        const data = await BlogModel.find({});
        res.render('adminMainPage', { blogs: data });

    } catch (error) {
        console.log(error)
    }
}

const addBlogPage = (req, res) => {
    return res.render('addBlogPage')
}

const addBlog = async (req, res) => {
    try {
        const { path } = req.file;
        const blogData = new BlogModel({ ...req.body, blogImg: path });

        await blogData.save();
        res.redirect('/admin');

    } catch (error) {
        console.log(error)
    }
}

const editForm = async (req, res) => {
    try {
        let data = await BlogModel.findById(req.params.id);
        res.render("editForm", { data });
    } catch (error) {
        console.log(error)
    }
}

const editBlog = async (req, res) => {
    try {
        const { title, description, tag } = req.body;

        let updatedData = { title, description, tag };
        if (req.file) {
            updatedData.blogImg = req.file.path;
        }

        await BlogModel.findByIdAndUpdate(req.params.id, updatedData);

        res.redirect('/admin');
    } catch (error) {
        console.log(error);
    }
};

const deleteBlog = async (req, res) => {
    await BlogModel.findByIdAndDelete(req.params.id);
    res.redirect('/admin');
}

module.exports = {
    adminPage, addBlogPage, addBlog, editForm, editBlog, deleteBlog
}