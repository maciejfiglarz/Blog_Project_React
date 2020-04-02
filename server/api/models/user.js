const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    quantity: { type: Number, default: 1 }
});

module.exports = mongoose.model('User', userSchema);