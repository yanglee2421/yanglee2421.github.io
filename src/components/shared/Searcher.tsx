import { Search } from "@mui/icons-material";
import {
  IconButton,
  Backdrop,
  Box,
  OutlinedInput,
  InputAdornment,
  alpha,
} from "@mui/material";
import React from "react";
import { useForm, FormProvider, useController } from "react-hook-form";
import type { IconButtonProps } from "@mui/material";

export function Searcher(props: IconButtonProps) {
  const [open, setOpen] = React.useState(false);
  const inputRef = React.useRef<HTMLDivElement>(null);

  const formCtx = useForm({
    defaultValues: {
      search: "",
    },
  });

  const searchController = useController({
    control: formCtx.control,
    name: "search",
  });

  const closeHandler = () => {
    setOpen(false);
    document.body.style.overflow = "";
  };

  React.useEffect(() => {
    if (!open) {
      return;
    }

    inputRef.current?.querySelector<HTMLInputElement>(":scope input")?.focus();
  }, [open]);

  React.useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    document.addEventListener(
      "keydown",
      (evt) => {
        if (!evt.ctrlKey) {
          return;
        }

        if (evt.key === "/") {
          setOpen(true);
          return;
        }
      },
      { signal },
    );
    document.addEventListener(
      "keyup",
      (evt) => {
        if (evt.key === "Escape") {
          setOpen(false);
          return;
        }
      },
      { signal },
    );

    return () => {
      controller.abort();
    };
  }, [setOpen]);

  return (
    <>
      <IconButton
        onClick={() => {
          setOpen(true);
          document.body.style.overflow = "hidden";
        }}
        {...props}
      >
        <Search></Search>
      </IconButton>
      <Backdrop
        open={open}
        sx={{
          backgroundColor: alpha("#000", 0.15),
          backdropFilter: "blur(10px)",
          zIndex(theme) {
            return theme.zIndex.modal;
          },
        }}
      >
        <Box
          component={"form"}
          onSubmit={formCtx.handleSubmit(() => {
            closeHandler();
          })}
          autoComplete="off"
          noValidate
          width={"80%"}
          maxWidth={450}
          mt={-96}
        >
          <FormProvider {...formCtx}>
            <OutlinedInput
              {...searchController.field}
              ref={(el) => {
                searchController.field.ref(el);
                Reflect.set(inputRef, "current", el);
              }}
              onBlur={() => {
                searchController.field.onBlur();
                formCtx.reset();
                closeHandler();
              }}
              fullWidth
              startAdornment={
                <InputAdornment position="start">
                  <Search></Search>
                </InputAdornment>
              }
              sx={{ borderRadius: 56 }}
              placeholder="Search..."
              type="text"
            ></OutlinedInput>
          </FormProvider>
        </Box>
      </Backdrop>
    </>
  );
}
