// Query Imports
import { useUploadAvator } from "@/hooks/api-firebase";

// MUI Imports
import { LoadingButton } from "@mui/lab";
import { UploadOutlined } from "@mui/icons-material";

export function UploadAvator() {
  const avatorMutation = useUploadAvator();

  return (
    <LoadingButton
      component="label"
      loading={avatorMutation.isPending}
      variant="contained"
      startIcon={<UploadOutlined></UploadOutlined>}
    >
      <input
        value={""}
        onChange={(evt) => {
          const files = evt.target.files;
          if (!files) return;

          const file = files[0];
          if (!file) return;

          avatorMutation.mutate(file);
        }}
        type="file"
        accept="image/*"
        hidden
      />
      upload
    </LoadingButton>
  );
}
