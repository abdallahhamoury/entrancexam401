const mongoose = require('mongoose');


const schema = new mongoose.Schema({
    title: String,
    email: String,
    imageUrl: String,
});




module.exports = schema;