const { mongoose } = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, unique: true},
    isPromoted: {type : Boolean, default: null}
})


const user_details = mongoose.model('user_details', userSchema);

module.exports =  user_details;
