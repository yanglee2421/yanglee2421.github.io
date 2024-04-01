import {
  TextField,
  Popper,
  Fade,
  ClickAwayListener,
  Paper,
} from "@mui/material";
import { useImmer } from "use-immer";

export function Datepicker() {
  const [state, updateState] = useImmer<{
    anchorEl: EventTarget | null;
  }>({
    anchorEl: null,
  });

  return (
    <>
      <TextField
        onFocus={(evt) => {
          if (!evt.currentTarget) {
            return;
          }

          updateState((draft) => {
            draft.anchorEl = evt.currentTarget;
          });
        }}
      />
      <Popper
        open={!!state.anchorEl}
        anchorEl={state.anchorEl instanceof HTMLElement ? state.anchorEl : null}
        transition
        sx={{
          zIndex(theme) {
            return theme.zIndex.modal;
          },
        }}
      >
        {(ctx) => {
          return (
            <Fade {...ctx.TransitionProps}>
              <Paper
                sx={{
                  maxWidth(theme) {
                    return theme.breakpoints.values.sm;
                  },
                }}
              >
                <ClickAwayListener
                  onClickAway={(evt) => {
                    if (!(state.anchorEl instanceof HTMLElement)) {
                      return;
                    }

                    if (state.anchorEl.contains(evt.target as Element)) {
                      return;
                    }

                    updateState((draft) => {
                      draft.anchorEl = null;
                    });
                  }}
                >
                  <div>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Non qui expedita obcaecati asperiores aspernatur ut labore?
                    Aut sed quae quaerat consequuntur. Asperiores dolor
                    adipisci, sed corrupti itaque atque autem reprehenderit?
                  </div>
                </ClickAwayListener>
              </Paper>
            </Fade>
          );
        }}
      </Popper>
    </>
  );
}
