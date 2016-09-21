var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var doctorSchema = new Schema({
    name: String,
    // horario: [Date],
    patients:  [Schema.Types.ObjectId]
});

//Export the schema
module.exports = mongoose.model('Doctor', doctorSchema);
