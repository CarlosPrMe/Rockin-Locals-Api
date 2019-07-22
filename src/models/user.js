const mongoose = require('mongoose');

const User = new mongoose.Schema({
    type: { type: String, required: true },
    userName: { type: String, required: true, trim: true },
    companyName: { type: String, required: false, trim: true },
    bandName: { type: String, required: false, trim: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String, required: false },
    city: { type: String, required: false, trim: true },
    address: { type: String, required: false, trim: true },
    postalCode: { type: String, required: false, trim: true },
    description:{type: String,trim: true} ,
    location: { type: Object, required: false },
    terms: { type: Boolean, required: true },
    favourites: { type: Array, required: false },
    salt: { type: String, required: false, trim: true },
    provider: { type: String, required: true, trim: true, default: 'local' }

});

module.exports = mongoose.model("User", User);

