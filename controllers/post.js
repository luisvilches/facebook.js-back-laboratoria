const Post = require('.././models/post');
const cloudinary = require('cloudinary')

exports.createPost = (req,res) => {
    let post = new Post({
        text: req.fields.text,
        by:req.fields.by,
        img: '',
        type: req.fields.type,
        date: new Date()
    })

    post.save( (err,response) => {
        if(err) {
            res.status(500).json({status: 'error', message: 'Error: '+ err})
        } else {
            res.status(200).json({
                status: 'success', 
                message: 'Post creado con exito', 
                data: response
            })
        }
    })
}

exports.createPostImagen = (req,res) => {

    cloudinary.uploader.upload(req.files.img.path, function(result) { 
        let post = new Post({
            text: req.fields.text,
            by:req.fields.by,
            img: result.url,
            type: req.fields.type,
            date: new Date()
        })

        post.save( (err,response) => {
            if(err) {
                res.status(500).json({status: 'error', message: 'Error: '+ err})
            } else {
                res.status(200).json({
                    status: 'success', 
                    message: 'Post creado con exito', 
                    data: response
                })
                console.log(response)
            }
        })

    });
}

exports.posts = (req,res) => {
    Post.find({}, {}, { sort: { 'date' : -1 } },(err,response) => {
        if(err) {
            res.status(500).json({error: err})
        } else {
            res.status(200).json({
                status: 'ok',
                message: 'registros encontrados',
                total: response.length,
                data: response
            })
        }
    })
}

exports.delete = (req,res) => {
    Post.remove({_id: req.params.id}, err => {
        if(err) {
            res.status(500).json({
                error:err
            })
        }else {
            res.status(200).json({
                message: 'registro eliminado'
            })
        }
    })
}

exports.update = (req,res) => {
    let data = new Post({
        _id: req.params.id,
        text: String(req.fields.text),
        date: new Date()
    })

    Post.update({_id: req.params.id},data,(err,response) =>{
        if(err) {
            res.status(500).json({
                error: err
            })
        } else {
            res.status(200).json({
                status: 'ok',
                message: 'registro actualizado',
                data: response
            }) 
            console.log(response)
        }
    })
}