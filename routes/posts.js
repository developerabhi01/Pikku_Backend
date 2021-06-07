const express = require('express');
const router = express.Router();
const Post = require('../models/Post')

//Routes
router.get('/', (req, res) => {
    res.send('We are on posts');
})

router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    })
    console.log("post", post)
    try {
        const savedPost = await post.save()
        res.json(savedPost);
    } catch (err) {
        res.json({ message: err })
    }
})

module.exports = router;