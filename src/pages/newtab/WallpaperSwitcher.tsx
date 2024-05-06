import { CloseOutlined } from "@mui/icons-material";
import {
  alpha,
  Box,
  Button,
  CardActionArea,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
} from "@mui/material";
import { createPortal } from "react-dom";
import { useImmer } from "use-immer";
import { ScrollView } from "@/components/ui/ScrollView";
import { useForageFileMutation } from "@/hooks/api-localforage/useForageFileMutation";
import { useForageFiles } from "@/hooks/api-localforage/useForageFiles";
import { useThemeStore } from "@/hooks/store/useThemeStore";
import { fileToFileKey } from "@/utils/fileToFileKey";

export function WallpaperSwitcher() {
  const mutation = useForageFileMutation();
  const query = useForageFiles();
  const setSmBgImgKey = useThemeStore((store) => store.setSmBgImgKey);

  const [state, updateState] = useImmer({
    showDialog: false,
  });

  const handleClose = () => {
    updateState((draft) => {
      draft.showDialog = false;
    });
  };

  return (
    <>
      <CardActionArea
        onClick={() => {
          updateState((draft) => {
            draft.showDialog = true;
          });
        }}
        title="click to change image"
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 3,
          backgroundColor(theme) {
            return alpha(
              theme.palette.mode === "dark"
                ? theme.palette.common.white
                : theme.palette.common.black,
              0.2,
            );
          },
          opacity: 0,
          transition(theme) {
            return theme.transitions.create(["opacity"]);
          },
          "&:hover": {
            opacity: 1,
          },
          display: "flex",
        }}
      >
        <Button
          component="span"
          disableRipple
          disableFocusRipple
          disableTouchRipple
          disableElevation
          variant="contained"
          color="inherit"
          sx={{
            color: "common.white",
            bgcolor: alpha("#000", 0.3),
            "&:hover": {
              bgcolor: alpha("#000", 0.3),
            },
          }}
        >
          Change
        </Button>
      </CardActionArea>
      {createPortal(
        <Dialog
          open={state.showDialog}
          onClose={handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle textAlign={"center"}>Select wallpaper</DialogTitle>
          <DialogContent>
            <IconButton
              onClick={handleClose}
              sx={(theme) => {
                const insetLength = theme.spacing(4);

                return {
                  position: "absolute",
                  right: insetLength,
                  top: insetLength,
                };
              }}
            >
              <CloseOutlined />
            </IconButton>

            <FormControl>
              <FormLabel sx={{ textTransform: "capitalize" }}>
                wallpaper source
              </FormLabel>
              <RadioGroup row>
                <FormControlLabel
                  control={<Radio />}
                  label="upload"
                  value="upload"
                />
                <FormControlLabel
                  control={<Radio />}
                  label="bing"
                  value="bing"
                />
              </RadioGroup>
            </FormControl>
            <ScrollView height={360}>
              <Box height={1000}>
                <input
                  type="file"
                  name=""
                  id=""
                  onChange={(evt) => {
                    const file = evt.target.files?.item(0);
                    if (!file) {
                      return;
                    }

                    mutation.mutate(file);
                  }}
                />
                {(() => {
                  if (query.data) {
                    return query.data.map((item, idx) => {
                      return (
                        <img
                          key={idx}
                          src={URL.createObjectURL(item)}
                          alt=""
                          onLoad={(evt) => {
                            URL.revokeObjectURL(evt.currentTarget.src);
                          }}
                          onClick={() => {
                            setSmBgImgKey(fileToFileKey(item));
                          }}
                          width={160}
                          height={90}
                        />
                      );
                    });
                  }
                })()}
              </Box>
            </ScrollView>
          </DialogContent>
        </Dialog>,
        document.body,
      )}
    </>
  );
}
