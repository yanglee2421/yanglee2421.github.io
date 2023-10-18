// I18n Imports
import { useTranslation } from "react-i18next";

// Components Imports
import { LangSelect } from "@/components";

// MUI Imports
import { Typography, Grid, Button } from "@mui/material";

export function ForgotPasswd() {
  const { t } = useTranslation();
  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Typography>{t("hello")}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button>{t("submit", { ns: "button" })}</Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <LangSelect />
        </Grid>
      </Grid>
    </>
  );
}
