
import './body_card.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BookCard.css";

function BookCard() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function getBooks() {
      try {
        const response = await axios.get("http://localhost:5000/books");
        setBooks(response.data.data);
      } catch (error) {
        console.error(error);
      }
    }
    getBooks();
  }, []);

  async function borrowBook(id) {
    try {
      const response = await axios.put(`http://localhost:5000/books/${id}`, {
        status: "borrowed",
      });
      setBooks(
        books.map((book) =>
          book._id === id ? { ...book, status: response.data.data.status } : book
        )
      );
      await axios.post(`http://localhost:5000/borrow-requests`, {
        bookId: id,
        status: "pending",
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <div className="card-container">
        {books.map((book) => (
          <div className="book-card" key={book._id}>
            <div className="book-cover">
              {book.image && (
                <img
                  src={`data:image/jpeg;base64,${book.image.toString("base64")}`}
                  alt={book.bookName}
                />
              )}
            </div>
            <div className="book-details">
              <h2 className="book-title">{book.title}</h2>
              <h3 className="book-author">{book.author}</h3>
              <hr className="book-divider" />
              <div className="book-description">{book.description}</div>
              <hr className="book-divider" />
              <div className="book-meta">
                <div className="book-category">{book.category}</div>
                <div className="book-status">{book.status}</div>
                {book.status === "available" && (
                  <button
                    className="borrow-button"
                    onClick={() => borrowBook(book._id)}
                  >
                    Borrow
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookCard;