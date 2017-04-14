// Todo: Create Artist Model
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const albumSchema = require('./artist');

const artistSchema = new Schema({
  name: String,
  age: Number,
  yearsActive: Number,
  image: String,
  genre: String,
  website: String,
  netWorth: Number,
  labelName: String,
  retired: Boolean,
  albums:[albumSchema]
});

const Artist = mongoose.model('artist', artistSchema);

module.exports = Artist;
