import { useRef, useState, useEffect } from "react";

const useHorizontalScrollPercent = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const { scrollLeft, scrollWidth, clientWidth } = ref.current;
        const maxScrollableWidth = scrollWidth - clientWidth;
        const percent =
          maxScrollableWidth > 0 ? (scrollLeft / maxScrollableWidth) * 100 : 0;
        setScrollPercent(percent);
      }
    };

    const element = ref.current;
    if (element) {
      element.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (element) {
        element.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return { ref, scrollPercent };
};

export default useHorizontalScrollPercent;
