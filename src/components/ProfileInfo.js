import  { Link } from 'react-router-dom'
function ProfileInfo() {
    return (
      <div>
       <p>Login:</p>
       <p>Nick:</p>
       <p>Change password:</p>
       <input></input>
       <button>Change</button>
       <p></p>
        <button onClick={()=>{localStorage.clear();window.location.reload()}}>Log out</button>
      </div>
    );
  }
  export default ProfileInfo;
  