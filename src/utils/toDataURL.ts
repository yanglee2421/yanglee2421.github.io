export function toDataURL(blob: Blob) {
  return new Promise<string>((res, rej) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = (evt) => {
      res(String(evt.target?.result));
    };
    reader.onerror = (evt) => {
      rej(evt.target?.error);
    };
  });
}
