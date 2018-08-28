const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  name: {
    type: String,
    default: 'Unknown',
  },
  surname: {
    type: String,
    default: 'Unknown',
  },
});

AuthorSchema.methods = {
  toJson() {
    const obj = this.toObject();    
    return obj;
}
};

module.exports = mongoose.model('author', AuthorSchema);
