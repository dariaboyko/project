import { NavLink } from "react-router-dom";
import "./NavigationCategory.css";
import Profile from "./Profile";
import Logout from "./Logout";
function AdminMenu() {
  return (
    <nav className="navigation admin--navigation">
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
            Edit categories and goods
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/editOrders"
            className={({ isActive }) =>
              isActive
                ? "navigation--list--link__selected"
                : "navigation--list--link"
            }
          >
            Edit orders
          </NavLink>
        </li>
      </ul>
      <div className="navigation--info">
        <Profile />
        <Logout />
      </div>
    </nav>
  );
}
export default AdminMenu;
