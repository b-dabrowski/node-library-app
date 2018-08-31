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
    tags: [String],
    category:
    {
        type: Schema.Types.ObjectId,
        ref: 'category',
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'author',
        required: true
    },
    addedBy: {
        type: Schema.Types.ObjectId,
        ref: 'user'        
    },
    borrowedBy: {
        type: Schema.Types.ObjectId,
        ref: 'user'        
    }
});

BookSchema.methods = {
    toJson() {
        const obj = this.toObject();
        delete obj.addedBy;
        return obj;
    }
};

module.exports = mongoose.model('book', BookSchema);
