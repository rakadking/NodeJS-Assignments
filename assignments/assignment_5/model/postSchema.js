const { mongoose } = require("mongoose")
const {Schema } = mongoose;
const postSchema = new Schema({
    title: {type: String, required: true},
    body: {type: String},
    image: {type: String}, 
    user: {type: Schema.Types.ObjectId, ref: "users_data"}
}, {timestamps: true})


const users_post = mongoose.model('users_post', postSchema);

module.exports = users_post;