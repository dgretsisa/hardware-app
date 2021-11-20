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

UserSchema.index({ name: 'text', username: 'text' });

UserSchema.statics.validateUsername = function(username, id=null) {
    if(id === null) {
        return this.find({ username })
        .then(users => {
            if(users.length > 0) return Promise.reject('Username already exist!');
        });
    }
    else{
        return this.find({ _id: { $ne: id }, username }).then(users => {
            if(users.length > 0) return Promise.reject('Username already exist!');
        });
    }
}

module.exports = mongoose.model('User', UserSchema);