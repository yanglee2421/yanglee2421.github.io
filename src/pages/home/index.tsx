// MUI Imports
import { Box, Button } from "@mui/material";

// Hooks Imports
import { useLogin } from "@/hooks";

export function Component() {
  // Login Hooks
  const { signOut } = useLogin();

  return (
    <Box>
      <Button onClick={signOut} variant="contained" color="error">
        sign out
      </Button>
    </Box>
  );
}
