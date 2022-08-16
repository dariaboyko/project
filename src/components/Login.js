import "../styles/LogInPage.css";
import Eye from "./Eye";
import { useState ,useEffect} from "react";
import actionFullLogin from "./ActionFullLogin";
import { connect } from "react-redux";
import store from "./Store";
import { Link } from "react-router-dom";
function LoginForm({setToken}) {

  function LoginForms({onLogin}) {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [passwordShown, setPasswordShown] = useState(false);
    function handleSubmit(event) {
      event.preventDefault();
      onLogin(login, password)
      store.dispatch(actionFullLogin(login, password))
      setTimeout(() => {
        setToken(localStorage.authToken)
      }, 3000);
      };
    
    return (
      <section>
        <form onSubmit={handleSubmit} className="main__form">
          <h1 className="main__form__title">Sign in</h1>
          <div className="main__form__input">
            <label>Login</label>
            <input
              value={login}
              onChange={(event) => setLogin(event.target.value)}
              type="text"
            />
          </div>
          <div className="main__form__input">
            <label>Password</label>
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type={passwordShown ? "text" : "password"}
            />
            {password && password.length < 6 && (
              <span className="main__form__warning">
                password must contain then 6 symbols
              </span>
            )}
            <button
              onClick={(event) => {
                event.preventDefault();
                setPasswordShown(!passwordShown);
              }}
              className="main__form__watch"
            >
              <Eye />
            </button>
          </div>
          <input
            disabled={login.length >= 1 && password.length >= 6 ? false : true}
            type="submit"
            value="Sign in"
            className="main__form__submit"
          />
          <p>Don`t have an account? <Link to="/signup">Sign up</Link></p>
        </form>
      </section>
    );
  }
  const ConnectedForm= connect(null, {onLogin: actionFullLogin})(LoginForms)
  return <><ConnectedForm/></>
}

export default LoginForm;