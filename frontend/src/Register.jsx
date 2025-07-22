import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [email, setEmail] = useState("");
  const formRef = useRef(null);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    if (!form.checkValidity()) {
      form.reportValidity(); // Show built-in browser validation UI
      return;
    }

    // Create the payload for registration
    const payload = {
      userName: name,
      password: pass,
      email: email,
    };

    try {
      const response = await fetch("https://user-managment-ch0d.onrender.com/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registration successful!");
        navigate("/"); // Redirect to login page after successful registration
      } else {
        alert(data.message); // Show error message if registration fails
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="Reg">
      <h2>SIGN UP</h2>
      <form onSubmit={onSubmit} ref={formRef}>
        <label>Email: </label>
        <input
          className="mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Username:</label>
        <input
          className="usr-name "
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label>Password:</label>
        <input
          className="pass-word"
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          required
          pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}"
          title="Password must be at least 8 characters, include an uppercase letter, a lowercase letter, and a number."
        />
        <button className="sub_but" type="submit">
          REGISTER
        </button>
      </form>
    </div>
  );
}

export default Register;
