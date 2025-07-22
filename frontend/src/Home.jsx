import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Home({ user, handleLogout, handleDelete }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/"); // Redirect to login if no user is logged in
    }
  }, [navigate, user]);

  return (
    <div>
      <h1>Welcome! {user?.userName}</h1>
      <p>Click "DELETE" to delete your record</p>
      <p>Click "LOG OUT" to exit home page</p>
      <button className="logout" onClick={handleLogout}>
        LOG OUT
      </button>
      <button className="delete" onClick={handleDelete}>
        DELETE
      </button>
    </div>
  );
}

export default Home;
// { user, handleLogout, handleDelete }onClick={handleLogout}{user?.username
