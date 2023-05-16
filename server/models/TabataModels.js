const {Schema, model} = require("mongoose")

const TabataSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    rounds: {
        type: Number,
        required: true
    },
    workTime: {
        type: Number,
        required: true
    },
    restTime: {
        type: Number,
        required: true
    },
    exercises: {
        type: [String],
        required: true
    }
});
module.exports = model("Tabata", TabataSchema)