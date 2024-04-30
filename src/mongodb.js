const mongoose = require('mongoose');


const foundItemSchema = new mongoose.Schema({
    object: String,
    image: String,
    foundDate: Date,
    description: String,
    contact: String
    // Add any other fields you need
});

// Use the 'login' database and a new collection 'foundItems'
const FoundItem = mongoose.model('FoundItem', foundItemSchema, 'foundItems');

module.exports = FoundItem;
