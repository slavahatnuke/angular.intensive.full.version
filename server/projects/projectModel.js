module.exports = function (mongoose) {
  var Schema = mongoose.Schema;

  var ProjectSchema = new Schema({
    name: String,
    description: String
  });

  return mongoose.model('Project', ProjectSchema);
};
