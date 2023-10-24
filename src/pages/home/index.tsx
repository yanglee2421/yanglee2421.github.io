// MUI Imports
import { Box, Button, Stack } from "@mui/material";

// Components Imports
import { CopyBtn } from "@/components";

// Hooks Imports
import { useLogin } from "@/hooks";

export function Component() {
  // Login Hooks
  const { signOut } = useLogin();

  return (
    <Box>
      <Stack direction={"row"} spacing={3}>
        <Button onClick={signOut} variant="contained" color="error">
          sign out
        </Button>
        <CopyBtn text="2583169032" />
      </Stack>
    </Box>
  );
}
