const mongoose = require('mongoose');

const guideSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: { 
        type: Number, 
        required: true
    },
    location: { 
        type: String, 
        required: true
    },
    phone: { 
        type: String, 
        required: true
    },
    language: { 
        type: String
    },
    price: { 
        type: Number, 
        required: true
    },

    description: {
        type: String
    },
    user_id: { type: String, ref: 'User', required: true },
});


module.exports = mongoose.model('Guide', guideSchema);