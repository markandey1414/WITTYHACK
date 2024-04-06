"use client";
import React from "react";
import { motion } from "framer-motion";
import { LampContainer } from "./components/ui/lamp";
import MovingButton from "./components/Buttons";
import Navbar from "./components/NavBar";
// import Footer from "./components/Footer";
import { HeroScrollDemo } from "./components/HowTo";

export default function LampDemo() {
  return (
    <>
    
    <Navbar />
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
      >
        Create , Buy or<br /> Sell Electricity
      <MovingButton />
      </motion.h1>
    </LampContainer>
   <HeroScrollDemo />
    {/* <Footer /> */}
    </>
  );
}
