import React, { useState, useEffect } from "react";

const AdminComponent = () => {
  const [pendingRegistrations, setPendingRegistrations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:5000/pending-registrations")
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        if (data.status === "ok") {
          setPendingRegistrations(data.data);
        } else {
          setError("Failed to retrieve pending registrations");
        }
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
      });
  }, []);

  function handleApprove(email) {
    fetch("http://localhost:5000/approve-registration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        status: "approved",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "ok") {
          setMessage("Registration approved");
          fetch("http://localhost:5000/pending-registrations")
            .then((response) => response.json())
            .then((data) => {
              if (data.status === "ok") {
                setPendingRegistrations(data.data);
              } else {
                setError("Failed to retrieve pending registrations");
              }
            })
            .catch((error) => {
              setError(error.message);
            });
        } else {
          setError("Failed to approve registration");
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  }

  function handleReject(email) {
    fetch("http://localhost:5000/approve-registration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        status: "rejected",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "ok") {
          setMessage("Registration rejected");
          fetch("http://localhost:5000/pending-registrations")
            .then((response) => response.json())
            .then((data) => {
              if (data.status === "ok") {
                setPendingRegistrations(data.data);
              } else {
                setError("Failed to retrieve pending registrations");
              }
            })
            .catch((error) => {
              setError(error.message);
            });
        } else {
          setError("Failed to reject registration");
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Admin Panel</h1>
      <h2>Pending Registrations</h2>
      <br/>
      {pendingRegistrations.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pendingRegistrations.map((registration) => (
              <tr key={registration.email}>
                <td>{registration.email}</td>
                <td>
                  <button onClick={() => handleApprove(registration.email)}>Approve</button>
                  <button onClick={() => handleReject(registration.email)}>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No pending registrations</p>
      )}
      <p>{message}</p>
    </div>
  );
};

export default AdminComponent;