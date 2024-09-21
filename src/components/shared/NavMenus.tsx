import { NavLink } from "react-router-dom";

export function NavMenus() {
  return (
    <div className="overflow-auto">
      <nav className="flex space-x-4 border px-6 py-2 sm:justify-center">
        {navList.map((item) => (
          <NavLink
            to={item.href}
            key={item.href}
            className="rounded-lg px-3 py-2 font-medium capitalize text-slate-700 hover:bg-slate-100 hover:text-slate-900 aria-[current=page]:text-blue-500"
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

const navList = [
  {
    label: "home",
    href: "/",
  },
  {
    label: "account",
    href: "/account",
  },
  {
    label: "calendar",
    href: "/calendar",
  },
  {
    label: "table",
    href: "/table",
  },
  {
    label: "lab",
    href: "/lab",
  },
];
