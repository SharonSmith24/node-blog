const express = require('express')
const app = express()

const ejs = require('ejs')
app.set('view engine', 'ejs')

const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true, useUnifiedTopology: true })

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const validateMiddleWare = (req, res, next) => {
    if (req.files === null || req.body.title == null) {
        return res.redirect('/posts/new')
    }
    next()
}
app.use('posts/store', validateMiddleWare)

const homeController = require('./controllers/home')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')


    .


    app.listen(3000, () => {
        console.log("App listening on port 3000")
    })

app.get('/', async (req, res) => {
    const blogposts = await BlogPost.find({})
    res.render('index', {
        blogposts
    })
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/contact', (req, res) => {
    res.render('contact')
})
const newPostController = require('./controllers/newPost')
app.get('/post/new', newPostController)

app.post('/posts/store', async (req, res) => {
    // model creates a new doc with browser data
    await BlogPost.create(req.body, (error, blogpost) => {
        res.redirect('/')
    })
})

app.get('/post/:id', async (req, res) => {
    const blogpost = await BlogPost.findById(req.params.id)
    res.render('post', {
        blogpost
    })
}) 