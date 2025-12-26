const express = require('express');
const { adminPage, addBlogPage, addBlog, editForm, editBlog, deleteBlog } = require('../controller/admincontroller');
const upload = require('../middleware/multer.js')

const router = express.Router();

router.get('/', adminPage);
router.get('/addBlog',addBlogPage);
router.post('/addBlog',upload.single("blogImg"),addBlog);
router.get("/editBlog/:id",editForm);
router.post('/editBlog/:id',upload.single("blogImg"),editBlog);
router.get('/delete-blog/:id', deleteBlog);


module.exports = router;