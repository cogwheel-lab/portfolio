"use client";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export const useBgColor = () => {
  const pathname = usePathname();

  const bgColor = useMemo(() => {
    const colorMap = {
      "/": "lightblue",
      "/todo": "pink",
    };

    return colorMap[pathname] || ""; // クラス名を返す
  }, [pathname]);

  return bgColor;
};
