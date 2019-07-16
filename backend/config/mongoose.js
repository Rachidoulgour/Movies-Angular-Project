const mongoose = require ('mongoose');

mongoose.connect('mongodb://localhost:27017/movies')
.then(()=>console.log("conectado a mongodb"))
.catch(error=> console.log('ERROR: no está conectado a mongodb')) 