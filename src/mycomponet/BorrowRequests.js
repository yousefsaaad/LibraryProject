import React, { useState, useEffect } from "react";
import axios from "axios";

function BorrowRequests({ borrowingStatus }) {
  const [borrowRequests, setBorrowRequests] = useState([]);

  useEffect(() => {
    async function getBorrowRequests() {
      try {
        const response = await axios.get("http://localhost:5000/borrow-requests");
        setBorrowRequests(response.data.data);
      } catch (error) {
        console.error(error);
      }
    }
    getBorrowRequests();
  }, []);

  async function approveBorrowRequest(id) {
    try {
      const response = await axios.put(`http://localhost:5000/borrow-requests/${id}`, {
        status: "approved",
      });
      setBorrowRequests(
        borrowRequests.map((borrowRequest) =>
          borrowRequest._id === id ? { ...borrowRequest, status: response.data.data.status } : borrowRequest
        )
      );
    } catch (error) {
      console.error(error);
    }
  }

  async function rejectBorrowRequest(id, bookId) {
    try {
      const response = await axios.put(`http://localhost:5000/borrow-requests/${id}`, {
        status: "rejected",
      });
      setBorrowRequests(
        borrowRequests.map((borrowRequest) =>
          borrowRequest._id === id ? { ...borrowRequest, status: response.data.data.status } : borrowRequest
        )
      );
      await axios.put(`http://localhost:5000/books/${bookId}`, {
        status: "available",
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h2>Borrow Requests</h2>
      {borrowRequests.map((borrowRequest) => (
        <div key={borrowRequest._id}>
          <p>
            Book: {borrowRequest.bookId.title}, Status: {borrowRequest.status}
          </p>
          {borrowRequest.status === "pending" && (
            <div>
              <button onClick={() => approveBorrowRequest(borrowRequest._id)}>
                Approve
              </button>
              <button onClick={() => rejectBorrowRequest(borrowRequest._id, borrowRequest.bookId._id)}>
                Reject
              </button>
            </div>
          )}
        </div>
      ))}
      {borrowRequests.length === 0 && <p>No borrow requests.</p>}
    </div>
  );
}

export default BorrowRequests;