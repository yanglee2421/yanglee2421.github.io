import { FormControlLabel, Grid, Switch } from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useImmer } from "use-immer";

export function QueryLabs() {
  const [state, updateState] = useImmer({
    showLeft: true,
    showRight: true,
    showCenter: true,
  });
  const queryClient = useQueryClient();

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <button
          onClick={() => {
            queryClient.invalidateQueries();
          }}
        >
          invalidate
        </button>
        <FormControlLabel
          checked={state.showLeft}
          onChange={(evt, checked) => {
            void evt;
            updateState((draft) => {
              draft.showLeft = checked;
            });
          }}
          control={<Switch />}
          label="Show left"
        />
        <FormControlLabel
          checked={state.showRight}
          onChange={(evt, checked) => {
            void evt;
            updateState((draft) => {
              draft.showRight = checked;
            });
          }}
          control={<Switch />}
          label="Show right"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        {state.showRight && <RightLab />}
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        {state.showCenter && <CenterLab />}
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        {state.showLeft && <LeftLab />}
      </Grid>
    </Grid>
  );
}

function LeftLab() {
  const query = useQuery({
    queryKey: ["query lab"],
    queryFn() {
      return "left" + Date.now();
    },
  });

  return (
    <>
      <button
        onClick={() => {
          query.refetch();
        }}
      >
        refetch left
      </button>
      {query.data}
    </>
  );
}

function RightLab() {
  const query = useQuery({
    queryKey: ["query lab"],
    queryFn() {
      return "right" + Date.now();
    },
  });

  return (
    <>
      <button
        onClick={() => {
          query.refetch();
        }}
      >
        refetch right
      </button>
      {query.data}
    </>
  );
}
function CenterLab() {
  const query = useQuery({
    queryKey: ["query lab"],
    queryFn() {
      return "center" + Date.now();
    },
  });

  return (
    <>
      <button
        onClick={() => {
          query.refetch();
        }}
      >
        refetch center
      </button>
      {query.data}
    </>
  );
}
