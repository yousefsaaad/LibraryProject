import React, { useState, useEffect } from "react";
import axios from "axios";

function BodyList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get("/books").then((response) => {
      setBooks(response.data.data);
    });
  }, []);

  return (
    <div>
      {books.map((book) => (
        <div
          key={book._id}
          style={{
            backgroundColor: "white",
            border: "1px solid #ccc",
            borderRadius: "5px",
            boxShadow: "0 2px 8px #f0f0f0",
            margin: "10px",
            padding: "10px",
          }}
        >
          <img src={`data:image/png;base64,${book.image}`} alt={book.title} style={{ width: "100px" }} />
          <h2>{book.title}</h2>
          <p>{book.author}</p>
          <p>{book.category}</p>
          <p>{book.description}</p>
        </div>
      ))}
    </div>
  );
}

export default BodyList;