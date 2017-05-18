const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../config');

exports.auth = (req,res,next) => {
    if(!req.headers.authorization){
        return res.status(500).json({
            error: 'Error de autenticacio'
        })
    }

    let token = req.header.authorization.split(" ")[1];
    let payload = jwt.decode(token,config.KEY_TOKENS)

    if(payload.exp <= moment().unix()){
        return res.status(500).json({
            error: 'session expirada'
        })
    }

    req.user = payload.sub;
    req.name = payload.name;
    next();
}