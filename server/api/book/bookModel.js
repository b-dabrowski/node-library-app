const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BookSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        default: 'No description'
    },
    available: {
        type: Boolean,
        default: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'category',
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'author',
        required: true
    }
});

module.exports = mongoose.model('book', BookSchema);
