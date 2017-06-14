const mongoose = require('mongoose');
const bcrypt   = require('bcrypt');

//a framework for what each user in dbshould look like
const userSchema = new mongoose.Schema({
  username: {type: String, required: true},
  email: {type: String},
  password: {type: String},
  facebookId: {type: Number, required: true}
});

userSchema.pre('save', function hashPassword(next) { //before the save perform the hash password function
  if (this.isModified('password')) { //if the password is modified?
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8)); //scrambl psswrd with 8x salt
  }
  next(); //move on
});

//it is the scrambled password which is strored, thus not even those who look at the db can see what your pw is. when the pw is entered for log in, it is the 2 hashed passwords which are compared.

userSchema
.virtual('passwordConfirmation') //pswrd confirmation set here instead of in model as we dont want it to be saved to the db
.set(function
setPasswordConfirmation(passwordConfirmation) { //sets the password confir to be relevant to this. entry in the db
  this._passwordConfirmation = passwordConfirmation;
});

userSchema.pre('validate', function checkPassword(next) {
  if(!this.password && !this.facebookId) {
    this.invalidate('password', 'required');
  }
  if(this.password && this._passwordConfirmation !== this.password){
    this.invalidate('passwordConfirmation', 'does not match');
  }
  next();
});

userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password); //make bcrypt compare hashed passwords in req/db
};


module.exports = mongoose.model('User', userSchema);
