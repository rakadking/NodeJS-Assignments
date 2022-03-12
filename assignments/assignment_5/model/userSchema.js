const { mongoose } = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, unique: true, required: true},
    password: {type: String}
}, {timestamps: true})


const users_data = mongoose.model('userCollection', userSchema);

module.exports = users_data;