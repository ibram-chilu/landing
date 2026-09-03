import { ReactNode } from "react";

import { cn } from "@/lib/utils";

const baseButtonClasses =
  "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-synq-coral";

export function PrimaryButton({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={cn(
        baseButtonClasses,
        "bg-[#17a99d] text-white shadow-[0_14px_34px_-16px_rgba(45,223,207,0.9)] hover:bg-[#119086]",
        className,
      )}
    >
      {children}
    </a>
  );
}

export function SecondaryButton({
  href,
  children,
  className,
  onClick,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(
        baseButtonClasses,
        "border border-white/30 bg-white/5 text-white backdrop-blur hover:border-[#76e3d7] hover:bg-white/10 hover:text-[#b6fff7]",
        className,
      )}
    >
      {children}
    </a>
  );
}
