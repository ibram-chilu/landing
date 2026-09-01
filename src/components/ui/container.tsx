import { ReactNode } from "react";

import { cn } from "@/lib/utils";

type ContainerProps = {
  as?: "div" | "section";
  children: ReactNode;
  className?: string;
  id?: string;
};

export function Container({
  as: Component = "div",
  children,
  className,
  id,
}: ContainerProps) {
  return (
    <Component
      id={id}
      className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}
    >
      {children}
    </Component>
  );
}
