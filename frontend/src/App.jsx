import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";

function App() {
  const [user, setUser] = useState(null);

  // const [records, setRecords] = useState([]);

  // useEffect(() => {
  //   fetchRecord();
  // }, []);

  // const fetchRecord = async () => {
  //   const response = await fetch("http://127.0.0.1:5000/record");
  //   const data = await response.json();
  //   setRecords(data.records);
  //   console.log(data.records);
  // };

  const handleLogin = (userName, id) => {
    setUser({ userName, id }); // Set user state on login
  };

  const handleLogout = () => {
    setUser(null); // Clear user state on logout
    console.log("User logged out.", user);
  };

  const handleDelete = async () => {
    if (!user) return;

    console.log("Attempting to delete user with ID:", user.id); // Log the userId

    try {
      const response = await fetch(`http://127.0.0.1:5000/delete/${user.id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("Record deleted successfully");
        handleLogout();
      } else {
        alert("Failed to delete the record");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login handleLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/home"
          element={
            <Home
              handleDelete={handleDelete}
              user={user}
              handleLogout={handleLogout}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

