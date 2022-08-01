import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Cookies from "js-cookie";

function App() {

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [username, setUsername] = useState(Cookies.get("username") || null);

  return (
    <div className="App">
      <Router>
        <Header token={token}  />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/offers/:id" element={<Offer />} />
            <Route
              path="/signup"
              element={
                <Signup
                  token={token}
                  setToken={setToken}
                  user={user}
                  setUser={setUser}
                />
              }
            />
            <Route
              path="/login"
              element={
                <Login
                  token={token}
                  setToken={setToken}
                  user={user}
                  setUser={setUser}
                />
              }
            />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
