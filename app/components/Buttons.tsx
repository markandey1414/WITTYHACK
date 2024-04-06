"use client";
import React from "react";
import { Button } from "./ui/moving-border";

export default function MovingButton() {
  return (
    <div>
      <Button
        borderRadius="1.75rem"
        className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800 font-arial"
      >
        Explore
      </Button>
      <Button
        borderRadius="1.75rem"
        className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800 font-arial"
      >
        create
      </Button>
    </div>
  );
}
