'use strict'
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const axios = require('axios');
const mongoose = require('mongoose');
const PORT = process.env.PORT;
const server = express();
server.use(cors());
const Schema = require("./Schema");
server.use(express.json());

mongoose.connect(`${process.env.MANGO_APP}`, { useNewUrlParser: true, useUnifiedTopology: true });

const FavModel = mongoose.model('FavC', Schema);

server.get('/test', testHandler);
server.get('/getFav', getFavHandler);
server.post('/addToFav', addToFavHandler);
server.delete('/deleteFav/:favId', deleteFavHandler);
server.put('/updateFav:favId', upDateFavHandler);

function testHandler(req, res) {
    console.log('all good');
}


function getFavHandler(req, res) {
    let email = req.query.email;
    FavModel.find({ email: email }, function (err, resultdata) {
        if (err) {
            console.log('There no err from get Fav');
        } else {
            console.log(resultdata);
            res.send(resultdata);
        }
    })
}


async function addToFavHandler(req, res) {
    let email = req.query.email;
    let { title, imageUrl } = req.body;
    await FavModel.create({ title, imageUrl, email });
    res.send('All good')
}


async function deleteFavHandler(req, res) {
    let id = req.params.favId;
    FavModel.remove({ _id: id }, (error, deletedSlice) => {
        if (error) {
            console.log('error in deleting the data');
        } else {
            console.log('data deleted', deletedSlice);
            getFavHandler(req, res)
        }
    });
}

async function upDateFavHandler(req, res) {
    console.log(req.body);
    let favId = req.params.favId;
    let { title, imageUrl } = req.body;
    FavModel.findByIdAndUpdate(favId, { title, imageUrl }, (err, updDate) => {
        if (err) {
            console.log("error in update");
        } else {
            console.log('data updated', updDate);
        }
    });
    let email = req.body.email;
    FavModel.find({ email }, function (err, resultdata) {
        if (err) {
            console.log('there is no Data for the eemail');
        } else {
            console.log("gggg", resultdata);
            res.send(resultdata);
        }
    })
}

server.listen(PORT,()=>{
    console.log(`listing on PORT ${PORT}`);
})