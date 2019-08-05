const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema 
const UserSchema = new Schema({
    dateDepart:{type: Date, required: true},
    heureDepart:{type: Date, required: true},
    lieuDepart: {type: String, required: true},
    lieuArrive: {type: String, required: true},
    pseudo: {type: String, required: true}
});

// Export the model (user is the table)
module.exports = mongoose.model('trajet', UserSchema);

