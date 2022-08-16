import "../styles/LogInPage.css";
import Eye from "./Eye";
import { useState } from "react";
import actionPromise from "./ActionPromise";
import { connect } from "react-redux";
import store from "./Store";
import { Link } from "react-router-dom";
function Signing({data}){
  console.log(data)
  if(data){
    if(data.errors){
      return <div>{data.errors[0].message}</div>
    }
    else{
      return <div>Signed up successfully! Now you can sign in:</div>
    }
  }
}
function SignUp() {
  const [SignedUp, setSignedUp] = useState();
  let gql = (url, query, variables) =>
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ query, variables }),
    }).then((res) => res.json());

  function LoginForms() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [passwordrepeat, setPasswordrepeat] = useState("");
    const [passwordShown, setPasswordShown] = useState(false);
    function handleSubmit(event) {
      event.preventDefault();
      store.dispatch(
        actionPromise(
          "signUp",
          gql(
            "http://shop-roles.node.ed.asmer.org.ua/graphql",
            `mutation signup($user:UserInput){
              UserUpsert(user:$user){
              login,  _id
              }
            }`,
            { user: {"login":login,"password": password} }
          )
        )
      );
      setSignedUp(connect((state) => ({
        data: state.promise.signUp.payload,
      }))(Signing));
    }
    return (
      <section>
        <form onSubmit={handleSubmit} className="main__form">
          <h1 className="main__form__title">Sign up</h1>
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
          <div className="main__form__input">
            <label>Repeat password</label>
            <input
              value={passwordrepeat}
              onChange={(event) => setPasswordrepeat(event.target.value)}
              type={passwordShown ? "text" : "password"}
            />
            {password!==passwordrepeat && passwordrepeat.length >= 1 &&(
              <span className="main__form__warning">
                passwords don`t match
              </span>
            )}
          </div>
          <input
            disabled={login.length >= 1 && password.length >= 6 && password===passwordrepeat? false : true}
            type="submit"
            value="Sign up"
            className="main__form__submit"
          />
           {SignedUp?<><SignedUp/><Link to="/">Sign in</Link></>:<p>Already have an account? <Link to="/">Sign in</Link></p>}
        </form>
      </section>
    );
  }
  return <><LoginForms/></>
}

export default SignUp;