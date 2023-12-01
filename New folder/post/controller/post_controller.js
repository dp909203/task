const { validationResult } = require('express-validator');
const Post = require('../model/post');
const express = require('express');
const app = express();


//Controller for creating a new post
const createPost = async (req, res) => {

    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }


        const userId = req.userId;
        const { name, description } = req.body;
        const photo = req.photoPath;

        // Create a new post
        const newPost = await Post.create({
            userId,
            name,
            description,
            photo,
        });

        res.json({ message: 'Post created successfully', post: newPost });
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};





module.exports = {
    createPost,
    abc
    // getAllPosts,
    // getPostById,
};

// const getAllPosts = async (req, res) => {
//     try {
//         const posts = await Post.findAll();
//         res.json(posts);
//     } catch (error) {
//         console.error('Error fetching posts:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };


// const getPostById = async (req, res) => {
//     try {
//         const postId = req.params.id;
//         const post = await Post.findByPk(postId);

//         if (!post) {
//             return res.status(404).json({ error: 'Post not found' });
//         }

//         res.json(post);
//     } catch (error) {
//         console.error('Error fetching post by ID:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };