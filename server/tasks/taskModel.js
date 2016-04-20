module.exports = function (mongoose) {
  var Schema = mongoose.Schema;

  var TaskSchema = new Schema({
    name: String,
    description: String,
    project: {type: Schema.Types.ObjectId, ref: 'Project'},
    assigned: {type: Schema.Types.ObjectId, ref: 'User'},
    author: {type: Schema.Types.ObjectId, ref: 'User'},
    createdAt: {type: Date, default: Date.now}
  });

  return mongoose.model('Task', TaskSchema);
};
