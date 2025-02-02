import { useCallback, useRef, useSyncExternalStore } from "react";
import { useWindowId } from "../use-window-id";
import { Point } from "../../utils/types";
import { deepEquals } from "../../utils/deep-equals";
import {
  createKey,
  getWindowCenters,
  subscribeToStorage,
} from "../../utils/storage";

export function useGetNeighbors(): Record<string, Point> {
  const windowId = useWindowId();
  const storageKey = createKey(windowId);

  const cachedCenters = useRef<Record<string, Point>>({});

  const getCenters = useCallback(() => {
    const centers = getWindowCenters();
    if (deepEquals(cachedCenters.current, centers)) {
      return cachedCenters.current;
    }
    cachedCenters.current = centers;
    return centers;
  }, []);

  const allWindowCenters = useSyncExternalStore(subscribeToStorage, getCenters);

  const neighbors = Object.fromEntries(
    Object.entries(allWindowCenters).filter(([key]) => key !== storageKey)
  );

  return neighbors;
}
