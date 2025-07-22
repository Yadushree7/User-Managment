import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Login({ handleLogin }) {
  //{ handleLogin }
  const [name, setName] = useState(""); // State for username
  const [pass, setPass] = useState(""); // State for password
  const navigate = useNavigate(); // Hook for navigation

  const onSubmit = async (e) => {
    e.preventDefault();

    // Create the payload for login
    const payload = {
      userName: name,
      password: pass,
    };

    try {
      // Make a POST request to the Flask login endpoint
      const response = await fetch("https://user-managment-ch0d.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        // Successful login, navigate to a different page, e.g., home page
        const data = await response.json();
        console.log("Login successful:", data);
        handleLogin(data.user.userName, data.user.id);
        console.log(data.userId);
        navigate("/home");
      } else {
        // Handle errors (e.g., invalid credentials)
        const errorData = await response.json();
        alert(errorData.message); // Display error message
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again.");
    }
  };
  return (
    // <h1>LOGIN  PAGE</h1>
    <div className="log">
      <h2>LOGIN</h2>
      <form onSubmit={onSubmit}>
        <label>Username:</label>
        <input
          className="usr_name "
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label>Password:</label>
        <input
          className="pass_word"
          type="password"
          onChange={(e) => setPass(e.target.value)}
          required
        />
        <button className="sub-but" type="submit">
          LOGIN
        </button>
        <Link to="/register">REGISTER</Link>
      </form>
    </div>
  );
}

export default Login;
