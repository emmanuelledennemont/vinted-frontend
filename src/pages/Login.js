import { useState } from "react";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const Login = ({ token, setUser }) => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const changeMail = (event) => {
    const value = event.target.value;
    setMail(value);
  };

  const changePassword = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  return token ? (
    <Navigate to="/" />
  ) : (
    <div className="login-form container">
      <h3>Se connecter</h3>
      <form
        className="inputs"
        onSubmit={(event) => {
          event.preventDefault();
          const fetchData = async () => {
            try {
              const response = await axios.post(
                "https://lereacteur-vinted-api.herokuapp.com/user/login",
                {
                  email: mail,
                  password: password,
                }
              );
              setUser(response.data);
              Cookies.set("token", response.data.token, { expires: 7 });
              navigate("/");
            } catch (error) {
              console.log(error.response);
            }
          };
          fetchData();
        }}
      >
        <input
          type="mail"
          placeholder="e-mail"
          value={mail}
          onChange={changeMail}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={changePassword}
        />

        <button type="submit" className="submit-btn">se connecter</button>
      </form>
    </div>
  );
};
export default Login;
