import { Link } from "@mui/material";
import * as consts from "@/lib/constants";

const FULL_YEAR = new Date().getFullYear();

export const AuthFooter = () => {
  return (
    <>
      &copy;{FULL_YEAR} by{" "}
      <Link href={consts.GITHUB_URL} target={consts.GITHUB_URL}>
        yanglee2421
      </Link>
    </>
  );
};
