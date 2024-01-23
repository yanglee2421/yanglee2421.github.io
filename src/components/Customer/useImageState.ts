// React Imports
import React from "react";

// Utils Imports
import { useImmer } from "use-immer";
import localforage from "localforage";

export function useImageState() {
  const [imageState, updateImageState] = useImmer<{
    loading: boolean;
    error: unknown;
    src: string;
  }>({
    loading: true,
    error: null,
    src: "",
  });

  React.useEffect(() => {
    if (imageState.src) {
      return;
    }

    void (async () => {
      updateImageState((prev) => {
        prev.loading = true;
      });

      try {
        const file = await localforage.getItem("bg-img");

        if (file instanceof File) {
          updateImageState((prev) => {
            prev.src = URL.createObjectURL(file);
          });
        }
      } catch (error) {
        console.error(error);

        updateImageState((prev) => {
          prev.error = error;
        });
      } finally {
        updateImageState((prev) => {
          prev.loading = false;
        });
      }
    })();
  }, [imageState.src, updateImageState]);

  return imageState;
}
