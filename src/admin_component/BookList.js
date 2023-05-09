import React, { useState, useEffect } from "react";

function BookList() {
  const [books, setBooks] = useState([]);
  const [filterIsbn, setFilterIsbn] = useState("");
  const [filterRackNumber, setFilterRackNumber] = useState("");
  const [newBook, setNewBook] = useState({
    bookName: "",
    ISBN: "",
    title: "",
    author: "",
    rackNumber: "",
    category: "",
    description: "",
    status: "",
  });
  const [editingBook, setEditingBook] = useState(null);

  useEffect(() => {
    fetch(
      `http://localhost:5000/books${
        filterIsbn || filterRackNumber ? "?" : ""
      }${filterIsbn ? `isbn=${filterIsbn}` : ""}${
        filterRackNumber && filterIsbn ? "&" : ""
      }${filterRackNumber ? `rackNumber=${filterRackNumber}` : ""}`
    )
      .then((response) => response.json())
      .then((data) => setBooks(data.data))
      .catch((error) => console.log(error));
  }, [filterIsbn, filterRackNumber]);

  const handleFilterIsbnChange = (event) => {
    setFilterIsbn(event.target.value);
  };

  const handleFilterRackNumberChange = (event) => {
    setFilterRackNumber(event.target.value);
  };

  const handleBookNameChange = (event) => {
    setNewBook({ ...newBook, bookName: event.target.value });
  };

  const handleIsbnChange = (event) => {
    setNewBook({ ...newBook, ISBN: event.target.value });
  };

  const handleTitleChange = (event) => {
    setNewBook({ ...newBook, title: event.target.value });
  };

  const handleAuthorChange = (event) => {
    setNewBook({ ...newBook, author: event.target.value });
  };

  const handleRackNumberChange = (event) => {
    setNewBook({ ...newBook, rackNumber: event.target.value });
  };

  const handleCategoryChange = (event) => {
    setNewBook({ ...newBook, category: event.target.value });
  };

  const handleDescriptionChange = (event) => {
    setNewBook({ ...newBook, description: event.target.value });
  };

  const handleStatusChange = (event) => {
    setNewBook({ ...newBook, status: event.target.value });
  };

  const handleFilter = (event) => {
    event.preventDefault();
  };

  const handleCreate = (event) => {
    event.preventDefault();
    fetch("http://localhost:5000/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBook),
    })
      .then((response) => response.json())
      .then((data) => {
        setBooks([...books, data.data]);
        setNewBook({
          bookName: "",
          ISBN: "",
          title: "",
          author: "",
          rackNumber: "",
          category: "",
          description: "",
          status: "",
        });
      })
      .catch((error) => console.log(error));
  };

  const handleEdit = (book) => {
    setEditingBook(book);
    setNewBook(book);
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    fetch(`http://localhost:5000/books/${editingBook._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBook),
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedBooks = books.map((book) =>
          book._id === editingBook._id ? data.data : book
        );
        setBooks(updatedBooks);
        setEditingBook(null);
        setNewBook({
          bookName: "",
          ISBN: "",
          title: "",
          author: "",
          rackNumber: "",
          category: "",
          description: "",
          status: "",
        });
      })
      .catch((error) => console.log(error));
  };

  const handleCancelEdit = () => {
    setEditingBook(null);
    setNewBook({
      bookName: "",
      ISBN: "",
      title: "",
      author: "",
      rackNumber: "",
      category: "",
      description: "",
      status: "",
    });
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/books/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        const filteredBooks = books.filter((book) => book._id !== id);
        setBooks(filteredBooks);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <h1>Book List</h1>
      <form onSubmit={handleFilter}>
        <label>
          ISBN:
          <input
            type="text"
            value={filterIsbn}
            onChange={handleFilterIsbnChange}
          />
        </label>
        <label>
          Rack Number:
          <input
            type="number"
            value={filterRackNumber}
            onChange={handleFilterRackNumberChange}
          />
        </label>
        <button type="submit">Filter</button>
      </form>
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
          {books.map((book) => (
            <tr key={book._id}>
              <td>{book.bookName}</td>
              <td>{book.ISBN}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.rackNumber}</td>
              <td>{book.category}</td>
              <td>{book.description}</td>
              <td>{book.status}</td>
              <td>
                <button onClick={() => handleEdit(book)}>Edit</button>
                <button onClick={() => handleDelete(book._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>{editingBook ? "Edit Book" : "Add Book"}</h2>
      <form onSubmit={editingBook ? handleUpdate : handleCreate}>
        <label>
          Book Name:
          <input
            type="text"
            value={newBook.bookName}
            onChange={handleBookNameChange}
          />
        </label>
        <label>
          ISBN:
          <input type="text" value={newBook.ISBN} onChange={handleIsbnChange} />
        </label>
        <label>
          Title:
          <input
            type="text"
            value={newBook.title}
            onChange={handleTitleChange}
          />
        </label>
        <label>
          Author:
          <input
            type="text"
            value={newBook.author}
            onChange={handleAuthorChange}
          />
        </label>
        <label>
          Rack Number:
          <input
            type="number"
            value={newBook.rackNumber}
            onChange={handleRackNumberChange}
          />
        </label>
        <label>
          Category:
          <input
            type="text"
            value={newBook.category}
            onChange={handleCategoryChange}
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            value={newBook.description}
            onChange={handleDescriptionChange}
          />
        </label>
        <label>
          Status:
          <input
            type="text"
            value={newBook.status}
            onChange={handleStatusChange}
          />
        </label>
        <button type="submit">{editingBook ? "Update" : "Create"}</button>
        {editingBook && (
          <button type="button" onClick={handleCancelEdit}>
            Cancel
          </button>
        )}
      </form>
    </div>
  );
}

export default BookList;