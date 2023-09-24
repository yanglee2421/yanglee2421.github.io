// MUI Imports
import { Grid, Card, CardContent, Box, CardHeader } from "@mui/material";

// Theme Imports
import { ThemeToggle } from "@/themes";

// Components Imports
import { InputTextarea } from "./input-textarea";

export function Input() {
  return (
    <Box height={"100%"} padding={2}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardHeader title="Assistant" />
            <CardContent>
              <InputTextarea />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <ThemeToggle />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
