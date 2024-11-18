import { useMemo, useState } from "react";
import Box from "./components/Box";
import useHorizontalScrollPercent from "./hooks/useHorizontalScrollPercent";
import useHorizontalScroll from "./hooks/useHorizontalScroll";
import useMergedRef from "@react-hook/merged-ref";

function App() {
  //
  const [boxCount, setBoxCount] = useState(10);
  const { ref, scrollPercent } = useHorizontalScrollPercent();
  const containerRef = useHorizontalScroll();
  //
  const activeBoxId = useMemo(() => {
    return Math.floor((scrollPercent / 100) * (boxCount - 1));
  }, [scrollPercent, boxCount]);
  //
  const multiRef = useMergedRef(ref, containerRef);
  return (
    <div className="w-[100dvw] h-[100dvh] flex flex-col gap-5 items-center justify-center text-xs">
      <div className="flex items-center gap-3">
        <div className="">Number of boxes (10 - 50):</div>
        <input
          max={50}
          min={10}
          type="number"
          className="bg-black rounded w-16 py-1.5 px-2 text-white"
          value={boxCount}
          onChange={(e) => {
            setBoxCount(+e.target.value);
          }}
        />
      </div>
      <div
        ref={multiRef}
        className="shadow p-3 flex items-center rounded gap-3 w-[70%] overflow-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-200"
      >
        {Array.from({ length: boxCount }, (_, i) => ({
          id: i,
          label: i + 1,
        })).map((boxItem) => {
          return (
            <Box
              key={boxItem.id}
              number={boxItem.id + 1}
              isActive={boxItem.id === activeBoxId}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
