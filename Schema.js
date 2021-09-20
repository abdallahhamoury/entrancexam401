const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    title: String,
    imageUrl: String,
    email: String,
  });

  module.exports =Schema;