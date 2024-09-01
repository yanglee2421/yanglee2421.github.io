import { NavLink } from "react-router-dom";

export function NavMenus() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to={"/"}>Home</NavLink>
        </li>
        <li>
          <NavLink to={"/account"}>Account</NavLink>
        </li>
        <li>
          <NavLink to="/calendar">Calendar</NavLink>
        </li>
        <li>
          <NavLink to={"/table"}>Table</NavLink>
        </li>
        <li>
          <NavLink to={"/lab"}>Lab</NavLink>
        </li>
      </ul>
    </nav>
  );
}
