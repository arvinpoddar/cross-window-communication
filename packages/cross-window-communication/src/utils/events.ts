import { Point } from "./types";

const CHANNEL_NAME = "window-center";

export const Events = {
  JOINED_NETWORK: "JOINED",
  CENTER_CHANGED: "CENTER_CHANGED",
  LEFT_NETWORK: "LEFT",
} as const;

export type NetworkEventPayload =
  | {
      type: typeof Events.JOINED_NETWORK;
      windowId: string;
      center: Point;
    }
  | {
      type: typeof Events.LEFT_NETWORK;
      windowId: string;
    }
  | {
      type: typeof Events.CENTER_CHANGED;
      windowId: string;
      center: Point;
    };

export const channel = new BroadcastChannel(CHANNEL_NAME);

export function joinNetwork(windowId: string, center: Point): void {
  channel.postMessage({ type: Events.JOINED_NETWORK, windowId, center });
}

export function leaveNetwork(windowId: string): void {
  channel.postMessage({ type: Events.LEFT_NETWORK, windowId });
}

export function broadcastCenterChange(windowId: string, center: Point): void {
  channel.postMessage({ type: Events.CENTER_CHANGED, windowId, center });
}
