import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  creator: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    favoredBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] }],
    createdAt : { type: Date, default: Date.now}
});

const Book = mongoose.model('Book', bookSchema);
export default Book;