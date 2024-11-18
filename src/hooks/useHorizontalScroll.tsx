import { useRef, useEffect } from "react";

const useHorizontalScroll = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handlePointerDown = (e: PointerEvent) => {
      isDragging.current = true;
      startX.current = e.clientX;
      scrollLeft.current = container.scrollLeft;

      container.setPointerCapture(e.pointerId);
      container.style.cursor = "grabbing";
      container.style.userSelect = "none";
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging.current) return;

      const deltaX = e.clientX - startX.current;
      container.scrollLeft = scrollLeft.current - deltaX;
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (!isDragging.current) return;

      isDragging.current = false;
      container.releasePointerCapture(e.pointerId);
      container.style.cursor = "grab";
      container.style.userSelect = "auto";
    };

    const handlePointerLeave = () => {
      if (!isDragging.current) return;

      isDragging.current = false;
      container.style.cursor = "grab";
      container.style.userSelect = "auto";
    };

    // Attach pointer event listeners
    container.addEventListener("pointerdown", handlePointerDown);
    container.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("pointerup", handlePointerUp);
    container.addEventListener("pointercancel", handlePointerUp); // Handle cancellation
    container.addEventListener("pointerleave", handlePointerLeave); // Stop drag on leave

    return () => {
      // Cleanup event listeners
      container.removeEventListener("pointerdown", handlePointerDown);
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerup", handlePointerUp);
      container.removeEventListener("pointercancel", handlePointerUp);
      container.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return containerRef;
};

export default useHorizontalScroll;
