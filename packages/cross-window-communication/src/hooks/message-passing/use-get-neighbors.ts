import { useEffect, useState } from "react";
import { Point } from "../../utils/types";

import { channel, Events, NetworkEventPayload } from "../../utils/events";
import { useWindowId } from "../use-window-id";

export function useGetNeighbors(): Record<string, Point> {
  const windowId = useWindowId();
  const [neighbors, setNeighbors] = useState<Map<string, Point>>(new Map());

  useEffect(() => {
    function handleMessage(event: MessageEvent<NetworkEventPayload>): void {
      if (event.data.windowId === windowId) return;

      switch (event.data.type) {
        case Events.JOINED_NETWORK:
        case Events.CENTER_CHANGED: {
          const { windowId: receivedId, center: receivedCenter } = event.data;
          setNeighbors((val) => new Map(val).set(receivedId, receivedCenter));
          break;
        }

        case Events.LEFT_NETWORK:
          setNeighbors((val) => {
            const newVal = new Map(val);
            newVal.delete(event.data.windowId);
            return newVal;
          });
          break;
        default:
          break;
      }
    }

    channel.addEventListener("message", handleMessage);

    return () => {
      channel.removeEventListener("message", handleMessage);
    };
  }, [windowId, setNeighbors]);

  return Object.fromEntries(neighbors);
}
