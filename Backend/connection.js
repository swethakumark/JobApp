var mongoose = require('mongoose')
mongoose.connect('mongodb+srv://athiravalappil123:athira123@jobapp.6oxkk.mongodb.net/jobportal?retryWrites=true&w=majority&appName=JobApp')
    .then(() => {
        console.log('Connection established to Mongo')
    })
    .catch((err) => { 
        console.log(err)
    })