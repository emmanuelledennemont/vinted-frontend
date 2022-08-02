import { useState } from "react";
import axios from "axios";
import { useNavigate, Navigate, Link } from "react-router-dom";
import Cookies from "js-cookie";

const Login = ({ token, setToken, setUser }) => {
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
    <div className="form container modal-bkgd">
      <button>X</button>
      <h4>Se connecter</h4>
      <form
        className="form-inputs modal-container"
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
              setToken(
                Cookies.set("token", response.data.token, { expires: 7 })
              );
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
          placeholder="E-mail"
          value={mail}
          onChange={changeMail}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={changePassword}
        />

        <button type="submit" className="submit-btn">Se connecter</button>
      </form>
      <Link to="/signup" className="link">
      Pas encore de compte ? Inscris-toi !
      </Link>
    </div>
  );
};
export default Login;
