import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const UpdateBookForm = ({ book }) => {
  const [bookData, setBookData] = useState(book);

  useEffect(() => {
    // Check if local storage is available
    if (typeof(Storage) !== "undefined") {
      // Retrieve the data from local storage
      const storedData = localStorage.getItem('myData');
      if (storedData) {
        // Parse the data into a JavaScript object
        const parsedData = JSON.parse(storedData);
        // Update the book data state with the parsed data
        setBookData(parsedData);
      }
    } else {
      // Local storage is not available
      console.log("Sorry, your browser does not support local storage.");
    }
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBookData({
      ...bookData,
      [name]: value,
    });
  };

  return (
    <form>
      <label htmlFor="bookName">Book Name:</label>
      <input
        type="text"
        id="bookName"
        name="bookName"
        value={bookData.bookName}
        onChange={handleInputChange}
      />

      <label htmlFor="ISBN">ISBN:</label>
      <input
        type="text"
        id="ISBN"
        name="ISBN"
        value={bookData.ISBN}
        onChange={handleInputChange}
      />

      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        name="title"
        value={bookData.title}
        onChange={handleInputChange}
      />

      <label htmlFor="author">Author:</label>
      <input
        type="text"
        id="author"
        name="author"
        value={bookData.author}
        onChange={handleInputChange}
      />

      <label htmlFor="rackNumber">Rack Number:</label>
      <input
        type="text"
        id="rackNumber"
        name="rackNumber"
        value={bookData.rackNumber}
        onChange={handleInputChange}
      />

      <label htmlFor="category">Category:</label>
      <select
        id="category"
        name="category"
        value={bookData.category}
        onChange={handleInputChange}
      >
        <optgroup label="Book Category">
          <option value="romance">Romance</option>
          <option value="science">Science</option>
          <option value="police">Police</option>
          <option value="action">Action</option>
          <option value="programming">Programming</option>
        </optgroup>
      </select>

      <button type="submit">Submit</button>
    </form>
  );
};

UpdateBookForm.propTypes = {
  book: PropTypes.shape({
    bookName: PropTypes.string.isRequired,
    ISBN: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    rackNumber: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  }).isRequired,
};

export default UpdateBookForm;