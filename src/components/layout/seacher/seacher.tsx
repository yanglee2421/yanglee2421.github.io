// MUI Imports
import {
  IconButton,
  Backdrop,
  Box,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import { Search } from "@mui/icons-material";

// React Imports
import React from "react";

// Form Imports
import { useForm, FormProvider } from "react-hook-form";

export function Seacher() {
  const [open, setOpen] = React.useState(false);
  const inputRef = React.useRef<HTMLDivElement>(null);

  const formCtx = useForm({
    defaultValues: {
      search: "",
    },
  });

  const closeHandler = () => {
    setOpen(false);
  };

  const openHandler = () => {
    setOpen(true);
  };

  const submitHandler = formCtx.handleSubmit((data) => {
    console.log(data);
    closeHandler();
  });

  React.useEffect(() => {
    if (!open) return;

    const el =
      inputRef.current?.querySelector<HTMLInputElement>(":scope input");
    el?.focus();
  }, [open]);

  return (
    <>
      <IconButton onClick={openHandler}>
        <Search />
      </IconButton>
      <Backdrop
        open={open}
        sx={{
          backgroundColor: "rgba(0,0,0,.15)",
          backdropFilter: "blur(10px)",
          zIndex(theme) {
            return theme.zIndex.modal;
          },
        }}
      >
        <Box flexBasis={450}>
          <form onSubmit={submitHandler}>
            <FormProvider {...formCtx}>
              <OutlinedInput
                {...formCtx.register("search")}
                ref={inputRef}
                onBlur={closeHandler}
                fullWidth
                startAdornment={
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                }
                sx={{ borderRadius: 56 }}
              />
            </FormProvider>
          </form>
        </Box>
      </Backdrop>
    </>
  );
}
