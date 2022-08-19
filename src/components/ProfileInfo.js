import actionPromise from "./ActionPromise";
import store from "./Store";
import {useState} from "react";
import gotUserFromToken from "./GotUserFromToken";
import { connect } from "react-redux";
function ProfileInfo() {
  const id = gotUserFromToken(localStorage.authToken).sub.id;

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
   }).then((res) => res.json());
 store.dispatch(
   actionPromise(
     "userData",
     gql(
       "http://shop-roles.node.ed.asmer.org.ua/graphql",
       `query user($q:String){
            UserFindOne(query:$q){
              _id login nick 
            }
          }`,
       { q: JSON.stringify([{ _id: id }]) }
     )
   )
 );
  function UserInfo({user}){
    const [login, setLogin] = useState(user?user.data.UserFindOne.login:"");
    const [nick, setNick] = useState(user?user.data.UserFindOne.nick:"");
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
                 login: login.length >= 1 ? login : user.data.UserFindOne.login,
                 nick: nick.length >= 1 ? nick : user.data.UserFindOne.nick,
               },
             }
           )
         )
       );
     }

    return user ? (
      <div>
        <form onSubmit={handleSubmit} className="main__form">
          <h1 className="main__form__title">My cabinet</h1>
          <div className="main__form__input">
            <label>Login</label>
            <input
              placeholder={user ? user.data.UserFindOne.login : ""}
              value={login}
              onChange={(event) => {
                event.preventDefault();
                setLogin(event.target.value);
              }}
              type="text"
            />
          </div>
          <div className="main__form__input">
            <label>Nick</label>
            <input
              placeholder={user ? user.data.UserFindOne.nick : ""}
              value={nick}
              onChange={(event) => {
                event.preventDefault();
                setNick(event.target.value);
              }}
            />
          </div>
          <input
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
                        login: login,
                      },
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
    ) : (
      <>wait..</>
    );
  }

  const ProfileUserInfo = connect((state) => ({
    user: state.promise.userData.payload,
  }))(UserInfo);
  return (
    <ProfileUserInfo/>
  );
}
export default ProfileInfo;
