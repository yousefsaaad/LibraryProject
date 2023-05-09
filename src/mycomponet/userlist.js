import React, { useState, useEffect } from 'react';

export default function Contact({ userData }) {
const [data, setData] = useState(userData);


  useEffect(() => {
    fetch("http://localhost:5000/getAllUsers", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        setData(data.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        // display an error message to the user
      });
  }, []);

  return (
    <div>
      <h1>User List</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>User Type</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user._id}>
              <td>{user.fullname}</td>
              <td>{user.email}</td>
              <td>{user.userType}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
