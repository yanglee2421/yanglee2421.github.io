import { Print } from "@mui/icons-material";
import { Button } from "@mui/material";
import { createPortal } from "react-dom";
import style from "./style.module.css";

export const Component = () => {
  return (
    <>
      <div>
        <Button
          startIcon={<Print />}
          onClick={() => {
            window.print();
          }}
        >
          Print
        </Button>
      </div>
      {createPortal(
        <article className={style.article}>
          <section className={style.section}>
            <table>
              <thead>
                <tr>
                  <td>header</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>body</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td>footer</td>
                </tr>
              </tfoot>
            </table>
          </section>
          <section className={style.section}>
            <h2>Section 2</h2>
          </section>
        </article>,
        document.body,
      )}
    </>
  );
};
