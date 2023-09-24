// Router Imports
import { NavLink } from "react-router-dom";

// MUI Imports
import { Button } from "@mui/material";

export function Component() {
  return (
    <NavLink to="/">
      <Button variant="contained" size="large">
        Take me home
      </Button>
    </NavLink>
  );
}
