const jwt = require('jwt-simple');
const moment = require('moment');
const User = require('.././models/user');


exports.main  = (req,res) => {
    res.json({
        name: 'luis',
        taller: 'mern'
    });
};

exports.create = (req,res) => {
    let data = new User({
        name: req.fields.name,
        lastname: req.fields.lastname,
        mail: req.fields.mail,
        pass: req.fields.pass,
        date: new Date()
    })

    data.save( (err,response) => {
        if(err) {
            res.status(500).json({status: 'error', message: 'Error: '+ err})
        } else {
            res.status(200).json({
                status: 'success', 
                message: 'Has sido registrado con exito, ahora puedes iniciar iniciar session', 
                data: response
            })
        }
    })
}

exports.find = (req,res) => {
    User.find((err,response) => {
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

exports.findId = (req,res) => {
    User.findById({_id: req.params.id},(err,response) => {
        if(err) {
            res.status(500).json({error: err})
        } else {
            res.status(200).json({
                status: 'ok',
                message: 'registro encontrado',
                data: response
            })
        }
    })
}

exports.one = (req,res) => {
    User.findOne({name: req.fields.name, pass: req.fields.pass},(err,response) => {
        if(err) {
            res.status(500).json({error: err})
        } else {
            res.status(200).json({
                status: 'ok',
                message: 'registro encontrado',
                data: response
            })
        }
    })
}

exports.delete = (req,res) => {
    User.remove({_id: req.params.id}, err => {
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
    let data = new User({
        _id: req.params.id,
        name: req.fields.name,
        mail: req.fields.mail,
        pass: req.fields.pass,
        date: new Date()
    })

    User.update({_id: req.params.id},data,(err,response) =>{
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
        }
    })
}

const config = require('../config');

function createTokens(user){
    let payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(14,'days').unix(),
        name: user.name
    };

    return jwt.encode(payload,config.KEY_TOKENS);
}

exports.auth = (req,res) => {
    User.findOne({mail: req.fields.mail}, (err,user) => {
        if(err){
            console.log(err)    
        }

        if(!user){
            res.status(500).json({
                success: false,
                message: 'Autenticacion fallada'
            })
        } else if (user) {
            if(user.pass != req.fields.pass) {
                res.status(500).json({
                    success: false,
                    message: 'Contraseña incorrecta'
                })
            } else {
                res.status(200).json({
                    success: true,
                    message: 'Autenticado con exito',
                    token: createTokens(user),
                    user: user
                })
            }
        }
    })
}


exports.test = (req,res) => {
    res.status(200).json({
        message: 'estas dentro de la ruta'
    })
}