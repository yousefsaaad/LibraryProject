import React, { useState } from 'react';
import '../admin_component/adminstyle/manageboos.css';
import axios from 'axios';

function BookForm() {
  const [formData, setFormData] = useState({
    bookName: '',
    ISBN: '',
    title: '',
    author: '',
    rackNumber: '',
    category: '',
    description: '',
    image: null,
    status: 'available'
  });

  const [bookAdded, setBookAdded] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setFormData((prevFormData) => ({
      ...prevFormData,
      image: imageFile
    }));
  };

  const handleRackNumberChange = (event) => {
    const rackNumber = event.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      rackNumber: rackNumber
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    // Create a new book object with the form data
    const newBook = {
      bookName: formData.bookName,
      ISBN: formData.ISBN,
      title: formData.title,
      author: formData.author,
      rackNumber: formData.rackNumber,
      category: formData.category,
      description: formData.description,
      status: formData.status
    };
  
    try {
      // Send a POST request to the server to add the new book to the database
      const response = await axios.post('http://localhost:5000/books', newBook);
  
      // Check if the book was added successfully
      if (response.status === 200) {
        alert('Book added successfully!');
        setFormData({
          bookName: '',
          ISBN: '',
          title: '',
          author: '',
          rackNumber: '',
          category: '',
          description: '',
          image: null,
          status: 'available'
        });
        setBookAdded(true);
      }
    } catch (error) {
      console.log(error);
      alert('Error adding book!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {bookAdded && (
        <div className="alert alert-success" role="alert">
          Book added successfully!
        </div>
      )}
      <div className="input-container">
        <label htmlFor="bookName">Book Name:</label>
        <input
          type="text"
          id="bookName"
          name="bookName"
          required
          value={formData.bookName}
          onChange={handleChange}
        />

        <label htmlFor="ISBN">ISBN:</label>
        <input
          type="text"
          id="ISBN"
          name="ISBN"
          required
          value={formData.ISBN}
          onChange={handleChange}
        />

        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          required
          value={formData.title}
          onChange={handleChange}
        />

        <label htmlFor="author">Author:</label>
        <input
          type="text"
          id="author"
          name="author"
          required
          value={formData.author}
          onChange={handleChange}
        />

        <label htmlFor="rackNumber">Rack Number:</label>
        <select
          id="rackNumber"
          name="rackNumber"
          required
          value={formData.rackNumber}
          onChange={handleRackNumberChange}
        >
          <option value="">Choose a rack number</option>
          {[...Array(5)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          required
          value={formData.description}
          onChange={handleChange}
        />

        <label htmlFor="category">Category:</label>
        <select
          id="category"
          name="category"
          required
          value={formData.category}
          onChange={handleChange}
        >
          <option value="">Choose a category</option>
          <option value="science">Science</option>
          <option value="police">Police</option>
          <option value="action">Action</option>
          <option value="programming">Programming</option>
          <option value="romance">Romance</option>
        </select>

        <label htmlFor="image">Upload Image:</label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          required
        />
        <br/>
        <br/>

        <button type="submit" className="btn btn-primary">
          Add Book
        </button>
      </div>
    </form>
  );
}

export default BookForm;
