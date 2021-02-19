const mongoose = require('mongoose');
const Schema= mongoose.Schema;

/* const posicionSchema=new Schema({
    pos: Number,
    clubName: String,
    imgUrl:String,
    played: Number,
    wins :Number,
    ties: Number,
    loses:Number,
    gd:Number,
    pts: Number
}); */

const tablaSchema = new Schema({
    datos : Array
})

const tabla=mongoose.model('tabla',tablaSchema);

module.exports=tabla;