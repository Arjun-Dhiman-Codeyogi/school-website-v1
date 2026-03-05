import { cva } from "class-variance-authority";

export const navigationMenuTriggerStyle = cva(
  "group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-accent/80 hover:text-accent-foreground hover:shadow-sm focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 bubble-hover",
);
