const mongoose = require('mongoose');
const Schema= mongoose.Schema;

const posicionSchema=new Schema({
    pos: Number,
    clubName: String,
    played: Number,
    wins :Number,
    ties: Number,
    loses:Number,
    gd:Number,
    pts: Number
});

const posicion=mongoose.model('Position',posicionSchema);

module.exports=posicion;