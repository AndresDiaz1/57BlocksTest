"use client";

import { animatePageIn } from "@/utils/animations";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();
  const shouldAnimate =
    pathName === "/home-list" || pathName.includes("/pokemon-detail/");

  useEffect(() => {
    if (shouldAnimate) {
      animatePageIn();
    }
  }, []);

  return (
    <div className="container">
      {shouldAnimate && (
        <>
          <div id="banner-1" className="split"></div>
          <div id="banner-2" className="split"></div>
          <div id="banner-3" className="split"></div>
          <div id="banner-4" className="split"></div>
        </>
      )}

      {children}
    </div>
  );
}
