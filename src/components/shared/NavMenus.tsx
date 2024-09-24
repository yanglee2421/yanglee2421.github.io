import { NavLink } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

export function NavMenus() {
  return (
    <div>
      <NavigationMenu className="mx-auto">
        <NavigationMenuList>
          {navList.map((item) => (
            <NavigationMenuItem key={item.href} className="px-5 py-2">
              <NavigationMenuLink asChild>
                <NavLink
                  to={item.href}
                  className={"capitalize aria-[current=page]:text-blue-500"}
                >
                  {item.label}
                </NavLink>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
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
  {
    label: "overtime",
    href: "/overtime",
  },
];
