const fs = require('fs');
import Post from '../models/Post'

module.exports.getAll = async (req, res) => {
    const posts = await Post.find({});
    res.status(200).json({
        success: true,
        posts: posts
    })
};

module.exports.getOne = async (req, res) => {
    const post = await Post.findOne({_id: req.params.id});
    if (post) {
        res.status(200).json({
            success: true,
            post: post
        })
    } else {
        res.status(404).json({
            success: false,
            msg: "False posts id"
        })
    }
};


module.exports.create = async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description,
        content: req.body.content,
        image: req.file.filename
    });
    try {
        post.save();
        res.status(200).json({
            success: true,
            post: post
        })
    } catch (e) {
        console.log(e)
    }
};

module.exports.update = async (req, res) => {
    let post = await Post.findOneAndUpdate({_id: req.params.id}, );

    // const newPost = new Post(
    //     {
    //         title: req.body.title || post.title,
    //         description: req.body.description || post.description,
    //         content: req.body.content || post.content,
    //         image: req.file.filename || post.image,
    //     }
    // );

    await Post.findOneAndUpdate({_id: req.params.id}, newPost);
    // post = {
    //
    // };
    // console.log('POST ', post);
    // const newPost = await Post.findOneAndUpdate({_id : req.params.id}, {
    //     title : req.body.title,
    //     description : req.body.description,
    //     content : req.body.content,
    //     image : req.file.path
    // });

    // await Post.findOneAndUpdate({_id : req.params.id}, req.body);

    try {
        // newPost.save();
        fs.unlink(`./public/assets/img/${post.image}`, (err) => {
            if (err) {
                console.log(err)
            }
        });
        res.json({
            success: true,
            post: newPost
        })
    } catch (e) {
        console.log(e)
    }
};

module.exports.delete = async (req, res) => {
    const post = await Post.findOne({_id: req.params.id});
    console.log('Post ', post);
    await Post.findOneAndDelete({_id: req.params.id});

    try {
        fs.unlink(`./public/assets/img/${post.image}`, (err) => {
            if (err) {
                console.log(err)
            }
        });
        res.json({
            success: true,
        })
    } catch (e) {
        console.log(e)
    }
};

