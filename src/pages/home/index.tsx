// MUI Imports
import { Grid, Button, Stack } from "@mui/material";

// Components Imports
import { CopyBtn } from "@/components";
import { CardRadio } from "./card-radio";
import { ThemeToggle } from "@/themes";

// Hooks Imports
import { useLogin } from "@/hooks";

export function Component() {
  // Login Hooks
  const { signOut } = useLogin();

  return (
    <Grid container spacing={3} p={2}>
      <Grid item xs={12}>
        <Stack direction={"row"} spacing={2}>
          <Button onClick={signOut} variant="contained" color="error">
            sign out
          </Button>
          <CopyBtn text="2583169032" />
          <ThemeToggle />
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <CardRadio />
      </Grid>
    </Grid>
  );
}
