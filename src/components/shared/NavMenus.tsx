import { NavLink } from "react-router-dom";

export function NavMenus() {
  return (
    <nav className="border">
      <ul>
        <li className="group/item relative flex items-center justify-between rounded-xl p-4 hover:bg-slate-100">
          <NavLink to={"/"}>Home</NavLink>
        </li>
        <li className="group/item relative flex items-center justify-between rounded-xl p-4 hover:bg-slate-100">
          <NavLink to={"/account"}>Account</NavLink>
        </li>
        <li className="group/item relative flex items-center justify-between rounded-xl p-4 hover:bg-slate-100">
          <NavLink to="/calendar">Calendar</NavLink>
        </li>
        <li className="group/item relative flex items-center justify-between rounded-xl p-4 hover:bg-slate-100">
          <NavLink to={"/table"}>Table</NavLink>
        </li>
        <li className="group/item relative flex items-center justify-between rounded-xl p-4 hover:bg-slate-100">
          <NavLink to={"/lab"}>Lab</NavLink>
        </li>
      </ul>
    </nav>
  );
}
