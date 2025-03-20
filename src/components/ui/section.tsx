
import React from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Section = React.forwardRef<HTMLDivElement, SectionProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn("w-full py-16 px-4 container mx-auto", className)}
        {...props}
      >
        {children}
      </section>
    );
  }
);

Section.displayName = "Section";
