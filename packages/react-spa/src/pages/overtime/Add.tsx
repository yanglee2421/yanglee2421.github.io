import { AddOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Link, useParams } from "react-router";

export const Add = () => {
  const params = useParams();

  return (
    <Button
      component={Link}
      to={`/${params.lang}/overtime/new`}
      variant="contained"
      startIcon={<AddOutlined />}
    >
      add
    </Button>
  );
};
