import { NavLink } from "react-router-dom";
import "./NavigationCategory.css";
import Cart from "./Cart";
import Profile from "./Profile";
import Logout from "./Logout";
function NavigationCategory() {
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
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/all"
            className={({ isActive }) =>
              isActive
                ? "navigation--list--link__selected"
                : "navigation--list--link"
            }
          >
            All
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/samsung"
            className={({ isActive }) =>
              isActive
                ? "navigation--list--link__selected"
                : "navigation--list--link"
            }
          >
            Samsung
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/iphone"
            className={({ isActive }) =>
              isActive
                ? "navigation--list--link__selected"
                : "navigation--list--link"
            }
          >
            iPhone
          </NavLink>
        </li>
      </ul>
      <div className="navigation--info">
        <Cart />
        <Profile />
        <Logout/>
      </div>
    </nav>
  );
}
export default NavigationCategory;
