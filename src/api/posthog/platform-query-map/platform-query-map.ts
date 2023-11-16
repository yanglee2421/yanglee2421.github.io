//
import { shoplineQueryMap } from "./shopline-query-map";

export const platformQueryMap = new Map<number, typeof shoplineQueryMap>();

platformQueryMap.set(3, shoplineQueryMap);
