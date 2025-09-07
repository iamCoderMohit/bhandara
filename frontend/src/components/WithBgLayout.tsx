import React from "react";
import { BgComponent } from "./Bg";
import Navbar from "./Navbar";

function WithBgLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <BgComponent
        color="rgba(0,0,0,0.7)"
        animation={{ scale: 50, speed: 70 }}
        noise={{ opacity: 0.3, scale: 2 }}
      />
      <Navbar />
      {children}
    </div>
  );
}

export default WithBgLayout;
