"use client"

import { useEffect, useState } from "react";

import Image from "next/image";

import RaceTrack from "../pista";

const HomePage = () => {
    return(
      <div style={{  width: "100%", height: "100%", display: "flex", justifyContent: "center",
        alignItems: "center", backgroundColor: "grey" }}><RaceTrack/></div>
    )
}
export default HomePage;