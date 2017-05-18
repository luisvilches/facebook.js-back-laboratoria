const express = require('express');
const Router = express.Router();
const controller = require('.././controllers/main')
const post = require('.././controllers/post')

Router.get('/app/test', controller.test)
Router.post('/createPostImagen', post.createPostImagen)




module.exports = Router;