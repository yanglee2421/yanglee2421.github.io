import { Search } from "@mui/icons-material";
import {
  IconButton,
  Backdrop,
  Box,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import React from "react";
import { useForm, FormProvider, useController } from "react-hook-form";
import type { IconButtonProps } from "@mui/material";

export function Searcher(props: SearcherProps) {
  const { ...restProps } = props;

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

  const openHandler = () => {
    setOpen(true);
    document.body.style.overflow = "hidden";
  };

  const submitHandler = formCtx.handleSubmit((data) => {
    console.log(data);
    closeHandler();
  });

  const blurHandler = () => {
    searchController.field.onBlur();
    formCtx.reset();
    closeHandler();
  };

  React.useEffect(() => {
    if (!open) return;

    const el = inputRef.current;
    const inputEl = el?.querySelector<HTMLInputElement>(":scope input");
    inputEl?.focus();
  }, [open, inputRef]);

  React.useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    document.addEventListener(
      "keydown",
      (evt) => {
        if (!evt.ctrlKey) return;
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
      <IconButton onClick={openHandler} {...restProps}>
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
        <Box width={"80%"} maxWidth={450} mt={-96}>
          <form onSubmit={submitHandler} autoComplete="off" noValidate>
            <FormProvider {...formCtx}>
              <OutlinedInput
                {...searchController.field}
                onBlur={blurHandler}
                ref={(el) => {
                  searchController.field.ref(el);
                  Reflect.set(inputRef, "current", el);
                }}
                fullWidth
                startAdornment={
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                }
                sx={{ borderRadius: 56 }}
                placeholder="Search..."
                type="text"
              />
            </FormProvider>
          </form>
        </Box>
      </Backdrop>
    </>
  );
}

export interface SearcherProps extends IconButtonProps {}
