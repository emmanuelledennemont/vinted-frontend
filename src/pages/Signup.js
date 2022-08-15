import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Signup = ({ token, setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mail, setMail] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        {
          username: username,
          email: mail,
          password: password,
          newsletter: newsletter,
        }
      );

      Cookies.set("token", response.data.token, { expires: 7 });
      setToken(Cookies.set("token", response.data.token, { expires: 7 }));
      navigate("/");
    } catch (error) {
      console.log(error.response);
    }
    setIsLoading(false);
  };

  return (
    <div className="form container modal-bkgd">
      <button>X</button>
      <h4>S'inscrire</h4>
      <form
        className="form-inputs modal-container"
        onSubmit={(event) => {
          event.preventDefault();
          fetchData();
        }}
      >
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <input
          type="email"
          placeholder="E-mail"
          value={mail}
          onChange={(event) => setMail(event.target.value)}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
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
        {isLoading ? (
          <p>Inscription en cours ...</p>
        ) : (
          <button type="submit" className="submit-btn">
            S'inscrire
          </button>
        )}
      </form>
      <Link to="/login" className="link">
        Tu as déjà un compte ? Connecte-toi !
      </Link>
    </div>
  );
};

export default Signup;
