const express = require('express')
const Post = require('../models/Post');

const router = express.Router();
const { verifyToken }  = require('../verify_token')


//GET ALL POSTS
router.get('/',verifyToken, async (req, res) => {
    try {
        const allPost = await Post.find();
        res.json(allPost);

    } catch (err) {
        res.json({
            message: err
        })
    }
})

//GET A POST BY CATEGORY
router.get('/:category',verifyToken, async (req, res) => {
    try {
        const post = await Post.find({
            category: "Nutrition"
        });
        res.json(post)
    } catch (err) {
        res.json({
            message: err
        })
    }
})


// router.post('/', (req, res) => {
//     const post = new Post({
//             title: req.body.title,
//             description: req.body.description,
//             category: req.body.category
//         })
//         .save()
//         .then((data) => {
//             res.status(200).json(data);
//         })
//         .catch(err => {
//             res.status(404).json({
//                 message: err
//             })
//         });
// })


//using the async await keyword
//CREATE A POST
router.post('/create_post', verifyToken,async (req, res) => {
    try {
        const post = await new Post({
            title: req.body.title,
            description: req.body.description,
            category: req.body.category
        }).save({
            validateBeforeSave: true
        });
        res.json(post);
    } catch (err) {
        res.status(404).json('Not Found');
        res.status(500).json('Serve Error');
    }
});



//DELETE A POST BY CATEGORY
router.delete('/delete_post/:category',verifyToken, async (req, res) => {
    try {
        const removedPost = await Post.deleteMany({
            category: "Nutrition"
        })
        res.status(200).json(removedPost)
    } catch (error) {
        res.json({
            message: error
        })
    }
})

//UPDATE A POST 
router.patch('/updatePost/:title',verifyToken, async (req, res) => {
    try {
        const updatedPost = await Post.updateOne({
            title: req.params.title
        }, {
            $set: {
                title: req.body.title
            }
        });
        res.status(200).json(updatedPost)
    } catch (error) {
        res.json({
            message: error
        })
    }
})


module.exports = router