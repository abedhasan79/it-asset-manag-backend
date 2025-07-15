const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  clinicId: { type: mongoose.Schema.Types.ObjectId, ref: 'Clinic' }
});

// Hash password
userSchema.pre('save', async function () {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

userSchema.methods.comparePassword = async function (input) {
  return await bcrypt.compare(input, this.password);
};

module.exports = mongoose.model('User', userSchema);