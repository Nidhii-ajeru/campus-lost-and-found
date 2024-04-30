const mongoose = require('mongoose');


const lostItemSchema = new mongoose.Schema({
    object: String,
    image: String,
    lostDate: Date,
    description: String,
    contact: String,
    reward: String,
    // Add any other fields you need
});

// Use the 'login' database and a new collection 'foundItems'
const LostItem = mongoose.model('LostItem', lostItemSchema, 'lostItems');

module.exports = LostItem;
