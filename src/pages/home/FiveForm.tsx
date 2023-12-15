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

// Form Imports
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Utils Imports
import { timeout } from "@/utils";

export function FiveForm() {
  const formCtx = useForm({
    async defaultValues() {
      await timeout(1000 * 2);
      return {
        input_text: "",
      };
    },

    resolver: yupResolver(
      yup.object().shape({
        input_text: yup.string().max(128).required(),
      })
    ),
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
          </Grid>
        </CardContent>
      </Card>
    </FormProvider>
  );
}
