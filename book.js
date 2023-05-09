const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  bookName: String,
  ISBN: String,
  title: String,
  author: String,
  rackNumber: Number,
  category: String,
  description: String,
  image: Buffer,
  status: String,
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
