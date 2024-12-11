"use client"

import { useState, useEffect } from "react";

const useScreenSize = () => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
  
  
    handleResize()

    return () => {
      window.removeEventListener("resize", handleResize);
    };
   }
  }, []);

  return { width, height };
};

export default useScreenSize;