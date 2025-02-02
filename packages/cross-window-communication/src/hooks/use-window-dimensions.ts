import { useEffect, useState } from "react";
import { deepEquals } from "../utils/deep-equals";

type WindowDimensions = {
  screenX: number;
  screenY: number;
  innerWidth: number;
  innerHeight: number;
};

export function useWindowDimensions(): WindowDimensions {
  const [dimensions, setDimensions] = useState<WindowDimensions>({
    screenX: window.screenX,
    screenY: window.screenY,
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight,
  });

  useEffect(() => {
    const pollPositionInterval = setInterval(() => {
      const newPosition: WindowDimensions = {
        screenX: window.screenX,
        screenY: window.screenY,
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
      };

      if (deepEquals(newPosition, dimensions)) return;

      setDimensions(newPosition);
    }, 50);

    return () => clearInterval(pollPositionInterval);
  }, [setDimensions, dimensions]);

  return dimensions;
}
