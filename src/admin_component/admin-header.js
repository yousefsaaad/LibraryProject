import React from "react";
import { Link } from "react-router-dom";
import "../style/adminheader.css";

function AdminHeader() {
  return (
    <div className="header">
      <h2 className="header__title">Admin Home Page</h2>
      <div className="header__buttons">
        <button className="header__button">
          <Link to="/admin-managebooks" className="header__link">
            Add New Book
          </Link>
        </button>
        <button className="header__button">
          <Link to="/BorrowRequests" className="header__link">
            See Borrow Requests
          </Link>
        </button>
        <button className="header__button">
          <Link to="/contact" className="header__link">
          manage user accounts
          </Link>
        </button>
      </div>
    </div>
  );
}

export default AdminHeader;