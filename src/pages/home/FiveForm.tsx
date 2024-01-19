// MUI Imports
import {
  Card,
  CardHeader,
  CardContent,
  Grid,
  InputAdornment,
  TextField,
  IconButton,
} from "@mui/material";
import { VisibilityOutlined, SearchOutlined } from "@mui/icons-material";

// Components Imports
import { SkeletonCard } from "@/components/ui";
import { ItemText } from "@/components";
import { CircularProgressWithLabel } from "./CircularProgressWithLabel";

// Form Imports
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Utils Imports
import { timeout } from "@/utils";

export function FiveForm() {
  const formCtx = useForm<FormValues>({
    async defaultValues() {
      await timeout(1000 * 2);
      return {
        input_text: "",
      };
    },

    resolver: zodResolver(schema),
  });

  // API pending
  if (formCtx.formState.isLoading) {
    return <SkeletonCard />;
  }

  // Normal content
  return (
    <FormProvider {...formCtx}>
      <Card>
        <CardHeader title="Form" />
        <CardContent>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={6}>
              <ItemText
                name="input_text"
                required
                variant="standard"
                size="small"
                label="Standard"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <VisibilityOutlined />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                hiddenLabel
                size="small"
                variant="filled"
                fullWidth
                placeholder="Search go"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton size="small">
                        <SearchOutlined fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <CircularProgressWithLabel
                value={100}
              ></CircularProgressWithLabel>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </FormProvider>
  );
}

const schema = z.object({
  input_text: z.string().min(1).max(128),
});

export type FormValues = z.infer<typeof schema>;
