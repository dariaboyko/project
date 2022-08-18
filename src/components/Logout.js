function Logout() {
  return (
    <button
      className="navigation--logout"
      onClick={() => {
        localStorage.clear();
        window.location.reload();
      }}
    >
      <img
        className="navigation--logout"
        src={require("../img/logout.png")}
      ></img>
    </button>
  );
}
export default Logout;
