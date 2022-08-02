import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const Signup = ({ token, setUser, setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mail, setMail] = useState("");
  const [newsletter, setNewsletter] = useState(false);

  const changeUsername = (event) => {
    const value = event.target.value;
    setUsername(value);
  };

  const changeMail = (event) => {
    const value = event.target.value;
    setMail(value);
  };

  const changePassword = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  return !token ? (
    <div className="form container modal-bkgd">
      <button>X</button>
      <h4>S'inscrire</h4>
      <form
        className="form-inputs modal-container"
        onSubmit={(event) => {
          event.preventDefault();
          const fetchData = async () => {
            try {
              const response = await axios.post(
                "https://lereacteur-vinted-api.herokuapp.com/user/signup",
                {
                  email: mail,
                  username: username,
                  password: password,
                  newsletter: newsletter,
                }
              );
              setUsername("");
              setMail("");
              setPassword("");
              setNewsletter(false);
              setUser(response.data);
              Cookies.set("token", response.data.token, { expires: 7 });
              setToken(
                Cookies.set("token", response.data.token, { expires: 7 })
              );
            } catch (error) {
              console.log(error.response);
            }
          };
          fetchData();
        }}
      >
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={changeUsername}
        />
        <input
          type="email"
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
        <div className="newsletter">
          <div className="input-chek">
          <input
            id="checkbox"
            type="checkbox"
            checked={newsletter}
            onChange={() => {
              setNewsletter((prevState) => !prevState);
            }}
          />
          <label htmlFor="checkbox">S'inscrire à la newsletter</label>
          </div>
          <p>
            En m'inscrivant je confirme avoir lu et accepté les Termes &
            Conditions et Politique de Confidentialité de Vinted. Je confirme
            avoir au moins 18 ans.
          </p>
        </div>
        <button type="submit" className="submit-btn">
          S'inscrire
        </button>
      </form>
      <Link to="/login" className="link">
        Tu as déjà un compte ? Connecte-toi !
      </Link>
    </div>
  ) : (
    <div className="form">
        <p>Votre compte a été créé !</p>
    </div>
  );
};

export default Signup;
