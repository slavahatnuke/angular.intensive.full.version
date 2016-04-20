module.exports = function (mongoose) {
  var Schema = mongoose.Schema;

  var TaskSchema = new Schema({
    name: String,
    description: String,
    project: {type: Schema.Types.ObjectId, ref: 'Project'}
  });

  return mongoose.model('Task', TaskSchema);
};
