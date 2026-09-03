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
        "bg-synq-coral text-white shadow-card hover:bg-[#dc5d5a]",
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
        "border border-synq-navy/12 bg-white/80 text-synq-navy hover:border-synq-teal hover:text-synq-teal",
        className,
      )}
    >
      {children}
    </a>
  );
}
