import Book from '../models/Book.js';

export const addBook = async (req, res) => {
  const { title, description } = req.body;

  try {
      const newBook = new Book({
          title, description, creator: req.user.id, favoredBy:[req.user.id]
      });
      await newBook.save();
      res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllBooks = async (req, res) => {
    try {
      const books = await Book.find().populate('creator').populate('favoredBy');
      res.json(books);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  export const toggleFavorite = async (req, res) => {
    const bookId = req.params.id;
    const userId = req.user.id;

    try {
      const book = await Book.findById(bookId).populate('creator').populate('favoredBy');
      if (!book) {
        return res.status(404).json({ message: "Livre non trouvé." });
      }

      const userIndex = book.favoredBy.findIndex(fav => fav._id.toString() === userId);
        
        if (userIndex === -1) {
        book.favoredBy.push(userId);
      } else {
        book.favoredBy.splice(userIndex, 1);
      }
      
      await book.save();
    res.json(book)
    } catch (error) {
      res.status(500).json({ message: error.message });
      }
    };

export const deleteBook = async (req, res) => {
    const bookId = req.params.id;
  
    try {
      await Book.findByIdAndDelete(bookId);
      res.json({message : "Le livre a été supprimé"});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


export const getBookById = async (req, res) => {
     try {
      const book = await Book.findById(req.params.id).populate('creator').populate('favoredBy');
      if (!book) {
        return res.status(404).json({ message: "Livre non trouvé." });
      }
        const isOwner = book.creator._id.toString() === req.user.id;
       const isFavorite = book.favoredBy.some(fav=> fav._id.toString() === req.user.id);
      const bookToSend = {...book._doc, isOwner, isFavorite}
       res.json(bookToSend);
     } catch (error) {
        res.status(500).json({ message: error.message });
     }
    };