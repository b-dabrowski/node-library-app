/* eslint consistent-return: 0 */
/* eslint no-sync: 0 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    },
    books: [
        {
            type: Schema.Types.ObjectId,
            ref: 'book'
        } 
    ],
    followedAuthors: [
        {
            type: Schema.Types.ObjectId,
            ref: 'author'
        }
        
    ]
});

UserSchema.pre('save', function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    this.password = this.encryptPassword(this.password);
    next();
});

UserSchema.methods = {
    authenticate(plainTextPassword) {
        return bcrypt.compareSync(plainTextPassword, this.password);
    },

    encryptPassword(plainTextPassword) {
        if (!plainTextPassword) {
            return '';
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(plainTextPassword, salt);
        return hash;
    },

    toJson() {
        const obj = this.toObject();
        delete obj.password;
        return obj;
    }
};

module.exports = mongoose.model('user', UserSchema);
