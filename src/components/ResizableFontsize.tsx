import { FC, useEffect, useState } from "react";

interface ResizableFontsizeProps {
  text: string;
}

const ResizableFontsize: FC<ResizableFontsizeProps> = ({ text }) => {
  const [fontSize, setFontSize] = useState(16);

  useEffect(() => {
    const calculateFontSize = () => {
      const baseSize = 12;
      const maxTextLength = 5;
      if (text.length > maxTextLength) {
        setFontSize(baseSize - (text.length - maxTextLength) * 1);
      } else {
        setFontSize(baseSize);
      }
    };
    calculateFontSize();
  }, [text]);

  return <p style={{ fontSize: `${fontSize}px` }}>{text}</p>;
};

export default ResizableFontsize;
