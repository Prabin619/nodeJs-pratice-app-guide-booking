const mongoose = require('mongoose');

const guideSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: { 
        type: String, 
        required: true
    },
    phone: { 
        type: String, 
        required: true
    },
    start_date: { 
        type: Date,
        required: true
    },
    end_date: { 
        type: Date, 
        required: true
    },

    status: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        required: true
    },

    guide_id: {
        type: String, 
        ref: 'User', 
        required: true
    },
    user_id: { type: String, ref: 'User', required: true },
});


module.exports = mongoose.model('Booking', guideSchema);