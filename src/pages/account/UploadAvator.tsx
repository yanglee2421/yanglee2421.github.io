// import { UploadOutlined } from "@mui/icons-material";
// import { Button } from "@mui/material";
// import { useUploadAvator } from "@/hooks/api-firebase/useUploadAvator";

// export function UploadAvator() {
//   const avatorMutation = useUploadAvator();

//   return (
//     <Button
//       component="label"
//       disabled={avatorMutation.isPending}
//       variant="contained"
//       startIcon={<UploadOutlined />}
//     >
//       <input
//         value={""}
//         onChange={(evt) => {
//           const files = evt.target.files;
//           if (!files) return;

//           const file = files[0];
//           if (!file) return;

//           avatorMutation.mutate(file);
//         }}
//         type="file"
//         accept="image/*"
//         hidden
//       />
//       upload
//     </Button>
//   );
// }
