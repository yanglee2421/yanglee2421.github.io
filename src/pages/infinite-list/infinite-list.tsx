// MUI Imports
import { List, ListItem, Button, Grid } from "@mui/material";

// Components Imports
import { Scrollbar, ItemText } from "@/components";

// Form Imports
import { useForm, FormProvider } from "react-hook-form";

export function InifiniteList() {
  // Form Hooks
  const formCtx = useForm({
    defaultValues: {
      inputText: "",
    },
  });

  return (
    <>
      <FormProvider {...formCtx}>
        <Grid container spacing={3} alignItems={"center"}>
          <Grid item xs={true}>
            <ItemText size="small" name="inputText" />
          </Grid>
          <Grid item>
            <Button variant="contained" size="large">
              submit
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Scrollbar>
              <List>
                <ListItem>123</ListItem>
                <ListItem>123</ListItem>
                <ListItem>123</ListItem>
              </List>
            </Scrollbar>
          </Grid>
        </Grid>
      </FormProvider>
    </>
  );
}
