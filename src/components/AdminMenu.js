import { NavLink } from "react-router-dom";
import "./NavigationCategory.css";
import Cart from "./Cart";
import Profile from "./Profile";
import Logout from "./Logout";
function AdminMenu() {
  return (
    <nav className="navigation">
      <ul className="navigation--list">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "navigation--list--link__selected"
                : "navigation--list--link"
            }
          >
            Main
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/editCategories"
            className={({ isActive }) =>
              isActive
                ? "navigation--list--link__selected"
                : "navigation--list--link"
            }
          >
            Edit category
          </NavLink>
        </li>
      </ul>
      <div className="navigation--info">
        <Cart />
        <Profile />
        <Logout />
      </div>
    </nav>
  );
}
export default AdminMenu;
