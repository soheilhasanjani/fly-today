import React, { FC, useMemo } from "react";
import { cn } from "../utils/cn";
import getFibonacci from "../utils/getFibonacciItem";
import ResizableFontsize from "./ResizableFontsize";

interface BoxProps {
  number: number;
  isActive: boolean;
}

const Box: FC<BoxProps> = ({ number, isActive }) => {
  //
  const displayLabel = useMemo(() => getFibonacci(number), [number]);
  //
  return (
    <div
      className={cn(
        "aspect-square px-1 w-16 truncate flex-shrink-0 shadow rounded flex items-center justify-center hover:-translate-y-1 transition-transform hover:shadow-xl",
        {
          "bg-green-500 text-white": isActive,
        }
      )}
    >
      <ResizableFontsize text={String(displayLabel)} />
    </div>
  );
};

export default React.memo(Box);
