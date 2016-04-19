module.exports = function (mongoose) {
  var Schema = mongoose.Schema;

  var UserSchema = new Schema({
    name: String,
    email: String,
    password: String
  });

  UserSchema.methods = {
    verifyPassword: function (password) {
      return this.password === password;
    }
  };

  return mongoose.model('User', UserSchema);
};
