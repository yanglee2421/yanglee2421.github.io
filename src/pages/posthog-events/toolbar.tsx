// MUI Imports
import { Box, Button } from "@mui/material";
import {
  GridToolbarQuickFilter,
  GridToolbarFilterButton,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { ReadMoreOutlined } from "@mui/icons-material";

export function toolbar(props: toolbarProps) {
  // ** Props
  const { loading, hasNextPage, onClick } = props;

  return (
    <Box display={"flex"} p={3}>
      <GridToolbarFilterButton />
      <GridToolbarExport sx={{ ml: 3 }} />
      {hasNextPage && (
        <Button
          onClick={onClick}
          disabled={loading}
          startIcon={<ReadMoreOutlined />}
          sx={{ ml: 3 }}
        >
          load more
        </Button>
      )}
      <GridToolbarQuickFilter sx={{ ml: "auto" }} />
    </Box>
  );
}

interface toolbarProps {
  loading: boolean;
  hasNextPage: boolean;
  onClick(): void;
}
