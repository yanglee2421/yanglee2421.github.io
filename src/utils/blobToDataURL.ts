export function blobToDataURL(blob: Blob) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (evt) => {
      const result = evt.target?.result;

      if (typeof result === "string") {
        resolve(result);
      }

      throw new Error("reader failed");
    };

    reader.onerror = (evt) => {
      const error = evt.target?.error;

      if (!error) {
        throw new Error("reader failed");
      }

      reject(error);
    };

    reader.readAsDataURL(blob);
  });
}
