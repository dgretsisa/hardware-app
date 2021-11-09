const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    role: {
        type: String,
        enum: ['User', 'Administrator'],
        default: 'User'
    },
    isActive: {
        type: Boolean,
        default: true
    }
},  {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);