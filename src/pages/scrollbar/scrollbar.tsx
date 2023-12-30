// React Imports
import React from "react";

// Form Imports
import { useForm, FormProvider } from "react-hook-form";

// Components Imports
import { ItemText, ScrollView } from "@/components";
import { Button, Card, CardContent, CardHeader, Grid } from "@mui/material";

export function ScrollbarPage() {
  // Form Hooks
  const formCtx = useForm({
    defaultValues: {
      goals: "",
    },
  });

  //
  const [list, setList] = React.useState<string[]>([]);
  const handleSubmit = formCtx.handleSubmit((data) => {
    const newItem = data.goals || crypto.randomUUID();
    setList((prev) => Array.from(new Set([...prev, newItem])));
  });
  const listEl = React.useMemo(() => {
    return list.map((item) => {
      const hadnleDelete = () => {
        setList((prev) => prev.filter((el) => item !== el));
      };
      return (
        <li key={item}>
          <button onClick={hadnleDelete}>delete</button>
          {item}
        </li>
      );
    });
  }, [list]);

  return (
    <>
      <Card>
        <CardHeader title="Scrollbar Component" />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <form onSubmit={handleSubmit}>
                <FormProvider {...formCtx}>
                  <ItemText name="goals" sx={{ mb: 2 }}></ItemText>
                  <Button type="submit" variant="contained" sx={{ mr: 3 }}>
                    add
                  </Button>
                  <Button type="reset" variant="outlined">
                    reset
                  </Button>
                </FormProvider>
              </form>
            </Grid>
            <Grid item xs={12} maxHeight={200}>
              <ScrollView>
                <ul>{listEl}</ul>
              </ScrollView>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
