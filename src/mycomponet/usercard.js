import React from 'react';
import "../style/usercard.css"

function UserCard(props) {
  return (
    <div className="user-card">
      <div className="user-avatar"></div>
      <div className="user-info">
        <h2>{props.username}</h2>
        <p>{props.bio}</p>
      </div>
    </div>
  );
}export default UserCard;