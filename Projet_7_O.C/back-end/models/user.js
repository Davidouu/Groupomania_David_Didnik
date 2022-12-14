const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  lastName: { type: String, required: true },
  firstName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean },
});

// permet de faire en sort qu'il n'y ai pas plusieurs compte avec le même mail

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
