// I18n Imports
import { useTranslation } from "react-i18next";

// Components Imports
import { LangSelect } from "@/components";
import { Typography } from "@mui/material";

export function ForgotPasswd() {
  const { t } = useTranslation();
  return (
    <>
      <Typography>{t("hello")}</Typography>
      <LangSelect />
    </>
  );
}
