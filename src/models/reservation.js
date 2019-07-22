const mongoose = require("mongoose");

const Reservation = new mongoose.Schema({
    bandName: { type: String, required: false, trim: true },
    companyName: { type: String, required: false, trim: true },
    date: { type: Object, required: false },
    localName: { type: String, required: false, trim: true },
    equipment: { type: Array, required: false },
    numHours: { type: Number, required: false, trim: true },
    price: { type: Number, required: false, trim: true },
    methodPayment: { type: Object, required: false, trim: true },
    hours:{type:Array,required:false},
    companyId:{ type: String, required: true },
    bandId:{ type: String, required: true },
    moment: {type: Number},
});

module.exports = mongoose.model("Reservation", Reservation);


