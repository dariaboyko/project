import actionPromise from "./ActionPromise";
import store from "./Store";
import {useState,useEffect} from "react";
import gotUserFromToken from "./GotUserFromToken";
function ProfileInfo() {
  const [login, setLogin] = useState("");
  const [nick, setNick] = useState("");
  const [password, setPassword] = useState("");
  let gql = (url, query, variables) =>
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(localStorage.authToken
          ? { Authorization: "Bearer " + localStorage.authToken }
          : {}),
        Accept: "application/json",
      },
      body: JSON.stringify({ query, variables }),
    }).then((res) => console.log(res.json()));

  function handleSubmit(event) {
    event.preventDefault();
  store.dispatch(
    actionPromise(
      "changeDetails",
      gql(
        "http://shop-roles.node.ed.asmer.org.ua/graphql",
        `mutation changeDetails($user:UserInput){
              UserUpsert(user:$user){
              login, _id, nick
              }
            }`,
        {
          user: {
            _id: gotUserFromToken(localStorage.authToken).sub.id,
            login:login,
            nick:nick
          },
        }
      )
    )
  );
  }
  useEffect(
    () => setLogin(gotUserFromToken(localStorage.authToken).sub.login),
    []
  );
  useEffect(
    () =>
      setNick(
        gotUserFromToken(localStorage.authToken).sub.nick
          ? gotUserFromToken(localStorage.authToken).sub.nick
          : ""
      ),
    []
  );
  return (
    <div>
      <form onSubmit={handleSubmit} className="main__form">
        <h1 className="main__form__title">My cabinet</h1>
        <div className="main__form__input">
          <label>Login</label>
          <input
            value={login}
            onChange={(event) => setLogin(event.target.value)}
            type="text"
          />
        </div>
        <div className="main__form__input">
          <label>Nick</label>
          <input
            value={nick}
            onChange={(event) => setNick(event.target.value)}
          />
        </div>
        {/* <div className="main__form__input">
          <label>New password</label>
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {password.length > 0 && password.length < 6 && (
            <span className="main__form__warning">
              password must contain then 6 symbols
            </span>
          )}
        </div> */}
        <input
          disabled={
            (login.length >= 1 && password.length === 0) ||
            (login.length >= 1 && password.length >= 6)
              ? false
              : true
          }
          type="submit"
          value="Save changes"
          className="main__form__submit"
        />
      </form>
      <p className="form__delete">
        Do you want to delete account?
        <button
          className="main__form__submit"
          onClick={() => {
            store.dispatch(
              actionPromise(
                "delete",
                gql(
                  "http://shop-roles.node.ed.asmer.org.ua/graphql",
                  `mutation delete($user:UserInput){
                    UserDelete(user:$user){login}
                  }`,
                  {
                    user: {
                      login: login
                    }
                  }
                )
              )
            );
          }}
        >
          Delete
        </button>
      </p>
    </div>
  );
}
export default ProfileInfo;
