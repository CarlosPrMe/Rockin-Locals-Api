const mongoose = require('mongoose');

const Local = new mongoose.Schema({
    city: { type: String, required: true, trim: true },
    postalCode: { type: String, required: false, trim: true },
    address: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    location: { type: Object, required: true },
    equipment: { type: Object, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true, trim: true },
    companyName: { type: String, required: true, trim: true },
    imageType: { type: String, required: true },
    description: { type: String, required: false, trim: true },
    companyId:{ type: String }

});

module.exports = mongoose.model("Local", Local);
