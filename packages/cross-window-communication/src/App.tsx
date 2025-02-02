import { useMemo } from "react";
import { useGetNeighbors } from "./hooks/message-passing/use-get-neighbors";
import { useBroadcastWindowCenter } from "./hooks/message-passing/use-broadcast-window-center";
import { useWindowDimensions } from "./hooks/use-window-dimensions";
import { Point } from "./utils/types";

function getNeighborPairs(
  neighbors: Record<string, Point>
): [string, string][] {
  const pairs: [string, string][] = [];
  const neighborIds = Object.keys(neighbors);
  for (let i = 0; i < neighborIds.length; i++) {
    for (let j = i + 1; j < neighborIds.length; j++) {
      pairs.push([neighborIds[i], neighborIds[j]]);
    }
  }
  return pairs;
}

function App() {
  const { screenX, screenY, innerWidth, innerHeight } = useWindowDimensions();

  const currentCenter = useMemo(
    () => ({
      x: Math.floor(screenX + innerWidth / 2),
      y: Math.floor(screenY + innerHeight / 2),
    }),
    [screenX, screenY, innerWidth, innerHeight]
  );

  useBroadcastWindowCenter(currentCenter);

  const neighbors = useGetNeighbors();

  const neighborPairs = useMemo(() => getNeighborPairs(neighbors), [neighbors]);

  return (
    <div className="h-screen w-screen overflow-hidden">
      <div className="absolute top-1 left-1 p-2 text-white text-xs font-mono bg-black bg-opacity-50">
        Pos: ({currentCenter.x}, {currentCenter.y})
      </div>
      <svg className="h-full w-full">
        {Object.entries(neighbors).map(([id, neighborCenter]) => {
          return (
            <line
              key={id}
              x1={currentCenter.x - screenX}
              y1={currentCenter.y - screenY}
              x2={neighborCenter.x - screenX}
              y2={neighborCenter.y - screenY}
              stroke="#4e46e5"
              strokeWidth="6"
              strokeLinecap="round"
            />
          );
        })}

        {neighborPairs.map(([neighborA, neighborB]) => {
          return (
            <line
              key={`${neighborA}-${neighborB}`}
              x1={neighbors[neighborA].x - screenX}
              y1={neighbors[neighborA].y - screenY}
              x2={neighbors[neighborB].x - screenX}
              y2={neighbors[neighborB].y - screenY}
              stroke="#4e46e5"
              strokeWidth="6"
              strokeLinecap="round"
            />
          );
        })}
      </svg>
    </div>
  );
}

export default App;
