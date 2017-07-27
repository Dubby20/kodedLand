const express = require('express');
const Post = require('./models/PostSchema')
const moment = require('moment');

const router = express.Router();

router.use((req, res, next) => {
    res.locals.title = 'KodedLand'
    res.locals.moment = moment
    next();
})

let users = [
    { name: 'Jacinta Dubem', registered: 'One month ago' },
    { name: 'Bukky Annie', registered: 'Two weeks ago' },
    { name: 'Kesther Boi', registered: 'One week ago' },
    { name: 'Angel Bola', registered: 'Yesterday' },
    { name: 'Stanley Alex', registered: 'Today' }
]


router.get('/', (req, res) => {
    Post.find()
        .exec()
        .then((data) => {
            console.log(data);
            res.render('index', {
                pagetitle: 'kodedLand',
                data: data,
                isLoggedIn: true,
                user: users[Math.floor(Math.random() * (users.length))]
            });
        }).catch((err) => {
            console.log(err);
            res.send('Error getting Posts')
        })
})

router.get('/addPost', (req, res) => {
    res.render('addPost', {
        pagetitle: 'Add Post'
    })
})
router.post('/addpost', (req, res) => {
    let title = req.body.title.trim();
    let content = req.body.content.trim();
    let tags = req.body.tags.replace(/[,\s+]/g, ' ').split(/\s+/g);
    let author = req.body.author || "Anonymous";
    let imagelink = req.body.imagelink || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuhoRTd1RRqeCZ1wcMVxTPq9hTu0aqme6wXCPgDpJEE4ksL7KSqA"

    Post.create({
        title,
        content,
        tags,
        author,
        imagelink,
    }).then(() => {
        console.log('Post created successfully')
        return res.redirect('/')
    }).catch((err) => {
        console.log(err)
        return err;
    })
})

module.exports = router;


//Callback, Async, Promises