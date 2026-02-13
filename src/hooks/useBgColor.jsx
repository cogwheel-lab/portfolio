"use client";
import layoutStyles from "@/styles/Layout.module.scss";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export const useBgColor = () => {
  const pathname = usePathname();

  const bgColor = useMemo(() => {
    const colorMap = {
      "/": layoutStyles.lightblue,
      "/todo": layoutStyles.pink,
    };

    return colorMap[pathname] || ""; // クラス名を返す
  }, [pathname]);

  return bgColor;
};
