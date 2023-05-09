import React, { useState } from 'react';
import PropTypes from 'prop-types';

const UpdateStatusForm = ({ book }) => {
  const [bookData, setBookData] = useState(book);
  const [selectedOption, setSelectedOption] = useState('active');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBookData({
      ...bookData,
      [name]: value,
    });
  };

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  }

  return (
    <form>
      <div>
        <label htmlFor="bookName">Book Name:</label>
        <input
          type="text"
          id="bookName"
          name="bookName"
          value={bookData.bookName}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="ISBN">ISBN:</label>
        <input
          type="text"
          id="ISBN"
          name="ISBN"
          value={bookData.ISBN}
          readOnly
          required
        />
      </div>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={bookData.title}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="author">Author:</label>
        <input
          type="text"
          id="author"
          name="author"
          value={bookData.author}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="rackNumber">Rack Number:</label>
        <input
          type="text"
          id="rackNumber"
          name="rackNumber"
          value={bookData.rackNumber}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="category">Category:</label>
        <input
          type="text"
          id="category"
          name="category"
          value={bookData.category}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <label htmlFor="describe">Describe:</label>
        <input
          type="text"
          id="describe"
          name="describe"
          value={bookData.describe}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <h2>Select an option:</h2>
        <select
          value={selectedOption}
          onChange={handleSelectChange}
        >
          <option value="active">active</option>
          <option value="inactive">inactive</option>
        </select>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

UpdateStatusForm.propTypes = {
  book: PropTypes.shape({
    bookName: PropTypes.string.isRequired,
    ISBN: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    rackNumber: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    describe: PropTypes.string.isRequired,
  }).isRequired,
};

export default UpdateStatusForm;