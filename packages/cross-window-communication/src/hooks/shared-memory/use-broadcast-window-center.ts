import { useEffect } from "react";
import { clearCenter, setCenter } from "../../utils/storage";
import { Point } from "../../utils/types";
import { useWindowId } from "../use-window-id";

export function useBroadcastWindowCenter(center: Point): void {
  const windowId = useWindowId();

  useEffect(() => {
    window.onbeforeunload = () => clearCenter(windowId);
    return () => {
      window.onbeforeunload = () => {};
      clearCenter(windowId);
    };
  }, [windowId]);

  useEffect(() => {
    setCenter(windowId, center);
  }, [windowId, center]);
}
