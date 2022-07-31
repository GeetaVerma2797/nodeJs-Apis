const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
    title: { type:String },
    releasedYear: {type:String},
    rating: {type:String},
    geners: [],
}, { timestamps: true });

module.exports = mongoose.model('Movie', movieSchema);