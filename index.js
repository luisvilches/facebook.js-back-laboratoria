const express = require('express');
const app = express();
const mongoose = require('mongoose');
const formidable = require('express-formidable');
const auth = require('./middleware/auth')
const cors = require('cors');
const cloudinary = require('cloudinary')

const port = process.env.PORT || 5000;

// rutas
const public = require('./routes/public')
const private = require('./routes/private')

cloudinary.config({ 
  cloud_name: 'accecar', 
  api_key: '581627995675862', 
  api_secret: 'y2jQCRNi1-UVx2n552vEi8Yywoc' 
});

app.use(formidable({
    encoding: 'utf-8',
    uploadDir: './uploads',
    keepExtensions: true,
    multiples: true
}))
app.use(cors());

app.use(express.static('./uploads'));


app.use('/', public);
app.use('/app',auth.auth, private);

mongoose.connect('mongodb://admin:admin@ds023098.mlab.com:23098/mern', err => {
     if(err){
        console.log(err);
    } else {
        console.log('coneccion a la db con exito!')
    }
})

app.listen(port, function(err){
    if(err){
        console.log(err);
    } else {
        console.log('server corriendo!')
    }
})