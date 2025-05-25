const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://rythukran713:hoWUzqby6cTkG7D6@cluster0.1mdayd4.mongodb.net/e-buisness")

const userSchema = mongoose.Schema({
    name: String,
    description: String,
    linkedinUrl: String,
    twitterUrl: String,
    interest: String
})

const model = mongoose.model("userData", userSchema)

module.exports = model