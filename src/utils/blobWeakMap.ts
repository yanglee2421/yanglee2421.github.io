export function blobToHref(blob: Blob) {
  const oldValue = blobWeakMap.get(blob);

  if (oldValue) {
    return oldValue;
  }

  blobWeakMap.set(blob, URL.createObjectURL(blob));

  return blobToHref(blob);
}

const blobWeakMap = new WeakMap<Blob, string>();
