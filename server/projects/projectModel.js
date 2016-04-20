module.exports = function (mongoose) {
  var Schema = mongoose.Schema;

  var ProjectSchema = new Schema({
    name: String,
    description: String,
    author: {type: Schema.Types.ObjectId, ref: 'User'},
    share: [{type: Schema.Types.ObjectId, ref: 'User'}],
    createdAt: {type: Date, default: Date.now}
  });

  return mongoose.model('Project', ProjectSchema);
};
