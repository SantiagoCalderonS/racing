"use client"

import { useEffect, useState } from "react";

import Image from "next/image";

import Track from "../pista";
import Header from "../header";

const RaceTrack = () => {
    return(
      <div style={{display: "flex", width: "100vw", height: "100vh" }}>
          <Header/>
      <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center",
        alignItems: "center", backgroundColor: "grey" }}>
          <Track/>
          </div>
          </div>
    )
}
export default RaceTrack;