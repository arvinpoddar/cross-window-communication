import { useEffect, useRef } from "react";
import { Point } from "../../utils/types";
import { useWindowId } from "../use-window-id";
import {
  channel,
  Events,
  joinNetwork,
  leaveNetwork,
  broadcastCenterChange,
  NetworkEventPayload,
} from "../../utils/events";

export function useBroadcastWindowCenter(center: Point): void {
  const windowId = useWindowId();

  useEffect(() => {
    window.onbeforeunload = () => leaveNetwork(windowId);
    return () => {
      window.onbeforeunload = () => {};
      leaveNetwork(windowId);
    };
  }, [windowId]);

  const hasJoinedNetwork = useRef(false);
  useEffect(() => {
    if (!hasJoinedNetwork.current) {
      joinNetwork(windowId, center);
      hasJoinedNetwork.current = true;
      return;
    }
    broadcastCenterChange(windowId, center);
  }, [windowId, center]);

  useEffect(() => {
    function handleMessage(event: MessageEvent<NetworkEventPayload>): void {
      if (event.data.windowId === windowId) return;
      if (event.data.type === Events.JOINED_NETWORK) {
        broadcastCenterChange(windowId, center);
      }
    }

    channel.addEventListener("message", handleMessage);
    return () => {
      channel.removeEventListener("message", handleMessage);
    };
  }, [windowId, center]);
}
