const express = require('express');
const Router = express.Router();
const controller = require('.././controllers/main')
const post = require('.././controllers/post')

Router.get('/', controller.main)
Router.post('/create', controller.create)
Router.get('/all', controller.find)
Router.get('/user/:id', controller.findId)
Router.post('/name', controller.one)
Router.delete('/delete/:id', controller.delete)
Router.put('/update/:id', controller.update)
Router.post('/login', controller.auth)



Router.post('/createPostImagen', post.createPostImagen)
Router.post('/createPost', post.createPost)
Router.get('/posts', post.posts)
Router.post('/post/update/:id', post.update)
Router.get('/post/delete/:id', post.delete)

module.exports = Router;