import { useEffect, useState } from "react";

export function useAutoSlider(length, delay = 6000) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!length) return;

    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % length);
    }, delay);

    return () => clearInterval(id);
  }, [length, delay]);

  return [index, setIndex];
}
