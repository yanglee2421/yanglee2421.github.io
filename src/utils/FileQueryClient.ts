import { FileQuery } from "./FileQuery";

export class FileQueryClient {
  cache = new Map<string, FileQuery>();

  get<TData>(key: unknown[]) {
    const mapKey = keyToMapKey(key);
    const lastQuery = this.cache.get(mapKey) as FileQuery<TData>;

    if (lastQuery) {
      return lastQuery;
    }

    const fileQuery = new FileQuery<TData>();
    this.cache.set(mapKey, fileQuery);

    return fileQuery;
  }

  invalidate(key: unknown[]) {
    const mapKey = keyToMapKey(key);

    [...this.cache.entries()].forEach(([itemKey, fileQuery]) => {
      if (itemKey.startsWith(mapKey)) {
        fileQuery.fetch();
      }
    });
  }
}

function keyToMapKey(key: unknown[]) {
  return key.map((item) => JSON.stringify(item)).join();
}
