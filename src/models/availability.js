const mongoose = require('mongoose');

const Availability = new mongoose.Schema({
    companyName: { type: String },
    localName: { type: String },
    date: { type: Object },
    hours: { type: Object },
    companyId: { type: String },
    

});

module.exports = mongoose.model("Availability", Availability);