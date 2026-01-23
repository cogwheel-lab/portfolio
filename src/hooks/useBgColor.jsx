import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
export const useBgColor = () => {
  const router = useRouter();

  const bgColor = useMemo(() => {
    const colorMap = {
      "/": "lightblue",
      "/about": "beige",
      "/todo": "pink",
    };

    return colorMap[router.pathname] || "white";
  }, [router.pathname]);

  // マウント時の処理
  useEffect(() => {
    document.body.style.backgroundColor = bgColor;

    // アンマウント時の処理
    return () => {
      document.body.style.backgroundColor = "";
    };
    // 関数が更新されるとuseEffectの処理が走る
  }, [bgColor]);
};
