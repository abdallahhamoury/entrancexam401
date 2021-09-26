'use strict';
const axios = require('axios');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose')
require('dotenv').config();
const PORT = process.env.PORT;
const server = express();
server.use(cors());
server.use(express.json());
const Schema = require('./Schema');
const apiDataHandler = require('./ApiData');

mongoose.connect(`${process.env.MONGO_LINK}`, { useNewUrlParser: true, useUnifiedTopology: true });

const FavModul = mongoose.model('FavList', Schema);

server.get('/test', testHandler);
server.get('/getDataFromApi', apiDataHandler);
server.get('/getFav', getFavHandler);
server.post('/addFav', addFavHandler);
server.delete('/deleteFav/:favId', deleteFavHandler);
server.put('/updateFav/:favId', updateFavHandler);


function getFavHandler(req, res) {
    let email = req.query.email
    FavModul.find({ email: email }, (err, resultData) => {
        if (err) {
            console.log("error in geting data");
        } else {
            res.send(resultData);
        }
    })
}

async function addFavHandler(req, res) {
    console.log("in addfav handler");
    console.log(req.body);
    let email = req.query.email;
    console.log(email);
    let { title, imageUrl } = req.body;
    await FavModul.create({ title, imageUrl, email });
    res.send("data added");
}

async function deleteFavHandler(req, res) {
    console.log("in delete handler");
    let id = req.params.favId;
    FavModul.remove({ _id: id }, (err, deletedData) => {
        if (err) {
            console.log(err);
        } else {
            console.log("deleted", deletedData);
            getFavHandler(req, res);
        }
    })

}

async function updateFavHandler(req, res) {

    let id = req.params.favId;
    let { title, imageUrl, email } = req.body;
    FavModul.findByIdAndUpdate(id, { title, imageUrl, email }, (err, updateFav) => {
        if (err) {
            console.log("err");
        } else {
            console.log("data updated");
            getFavHandler(req, res);
        }
    })
}


function testHandler(req, res) {
    res.send("all is ok")
}

server.listen(PORT, () => {
    console.log(`listen on port ${PORT}`);
})