import { v4 as uuid } from "uuid";

const windowId = uuid();

export function useWindowId(): string {
  return windowId;
}
