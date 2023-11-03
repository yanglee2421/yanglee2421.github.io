// MUI Imports
import {
  IconButton,
  Backdrop,
  Box,
  OutlinedInput,
  InputAdornment,
  IconButtonProps,
} from "@mui/material";
import { Search } from "@mui/icons-material";

// React Imports
import React from "react";

// Form Imports
import { useForm, FormProvider, useController } from "react-hook-form";

export function Searcher(props: SearcherProps) {
  // ** Props
  const { ...restProps } = props;

  const [open, setOpen] = React.useState(false);
  const inputRef = React.useRef<HTMLDivElement>(null);

  const formCtx = useForm({
    defaultValues: {
      search: "",
    },
  });

  const { field } = useController({ control: formCtx.control, name: "search" });

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
    formCtx.reset();
    closeHandler();
  };
  const chgHandler: React.ChangeEventHandler<HTMLInputElement> = (evt) => {
    field.onChange(evt.target.value);
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
        if (evt.key !== "/") return;
        setOpen(true);
      },
      { signal }
    );
    document.addEventListener(
      "keyup",
      (evt) => {
        if (evt.key !== "Escape") return;
        setOpen(false);
      },
      { signal }
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
                ref={(el) => {
                  field.ref(el);
                  Reflect.set(inputRef, "current", el);
                }}
                value={field.value}
                onChange={chgHandler}
                onBlur={blurHandler}
                disabled={field.disabled}
                name={field.name}
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
