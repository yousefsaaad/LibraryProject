import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../style/admin_manage books.css";

function BookList() {
  const [bookData, setBookData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("bookFormData")) || [];
    setBookData(data);
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredBookData = bookData.filter((book) => {
    const isbn = book.ISBN;
    const rackNumberLower = book.rackNumber.toLowerCase();
    return (
      isbn.includes(searchQuery) || rackNumberLower.includes(searchQuery)
    );
  });

  const handleDelete = (index) => {
    const updatedBookData = [...bookData];
    updatedBookData.splice(index, 1);
    localStorage.setItem("bookFormData", JSON.stringify(updatedBookData));
    setBookData(updatedBookData);
  };

  const handleUpdate = (index) => {
    const bookToUpdate = bookData[index];
    localStorage.setItem("bookToUpdate", JSON.stringify(bookToUpdate));
    document.getElementById("bookName").value = bookToUpdate.bookName;
    document.getElementById("ISBN").value = bookToUpdate.ISBN;
    document.getElementById("title").value = bookToUpdate.title;
    document.getElementById("author").value = bookToUpdate.author;
    document.getElementById("rackNumber").value = bookToUpdate.rackNumber;
    document.getElementById("category").value = bookToUpdate.category;
    document.getElementById("describe").value = bookToUpdate.describe;
    document.getElementById("status").value = bookToUpdate.status;
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const updatedBookData = [...bookData];
    const bookToUpdate = JSON.parse(localStorage.getItem("bookToUpdate"));
    const updatedBook = {
      bookName: event.target.bookName.value,
      ISBN: event.target.ISBN.value,
      title: event.target.title.value,
      author: event.target.author.value,
      rackNumber: event.target.rackNumber.value,
      category: event.target.category.value,
      describe: event.target.describe.value,
      status: event.target.status.value,
    };
    const index = updatedBookData.findIndex(
      (book) => book.ISBN === bookToUpdate.ISBN
    );
    updatedBookData[index] = updatedBook;
    localStorage.setItem("bookFormData", JSON.stringify(updatedBookData));
    setBookData(updatedBookData);
    event.target.reset();
  };

  return (
    <div className="main-sec">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by ISBN and rack number"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <h1>List of Books</h1>
      <table>
        <thead>
          <tr>
            <th>Book Name</th>
            <th>ISBN</th>
            <th>Title</th>
            <th>Author</th>
            <th>Rack Number</th>
            <th>Category</th>
            <th>Description</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredBookData.map((book, index) => (
            <tr key={book.ISBN}>
              <td>{book.bookName}</td>
              <td>{book.ISBN}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.rackNumber}</td>
              <td>{book.category}</td>
              <td>{book.describe}</td>
              <td>{book.status}</td>
              <td>
                <button onClick={() => handleUpdate(index)}>Update</button>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/admin-managebooks" className="add-new-book">
        Add New Book
      </Link>
      <form onSubmit={handleFormSubmit}>
        <h2>Update Book</h2>
        <div>
          <label htmlFor="bookName">Book Name:</label>
          <input type="text" id="bookName" name="bookName" required />
        </div>
        <div>
          <label htmlFor="ISBN">ISBN:</label>
          <input type="text" id="ISBN" name="ISBN" required readOnly />
        </div>
        <div>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" required />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input type="text" id="author" name="author" required />
        </div>
        <div>
          <label htmlFor="rackNumber">Rack Number:</label>
          <input type="text" id="rackNumber" name="rackNumber" required />
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <input type="text" id="category" name="category" required />
        </div>
        <div>
          <label htmlFor="describe">Description:</label>
          <input type="text" id="describe" name="describe" required />
        </div>
        <div>
          <label htmlFor="status">Status:</label>
          <select id="status" name="status" required>
            <option value="available">Available</option>
            <option value="notavailable">Not Available</option>
          </select>
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default BookList;