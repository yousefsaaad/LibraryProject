import React from "react";
import { Card, Button } from "react-bootstrap";

const BookCard = ({ book }) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={`data:image/jpeg;base64,${book.image}`} />
      <Card.Body>
        <Card.Title>{book.bookName}</Card.Title>
        <Card.Text>{book.description}</Card.Text>
        <Button variant="primary">View Details</Button>
      </Card.Body>
    </Card>
  );
};

export default BookCard;