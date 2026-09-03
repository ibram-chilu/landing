"use client";

import Link from "next/link";
import { useState } from "react";

import { siteContent } from "@/content/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#071b2f]/90 text-white backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="#top"
          className="font-display text-2xl font-bold tracking-tight text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-synq-coral"
        >
          Synq
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {siteContent.navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-white/78 transition hover:text-[#76e3d7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-synq-coral"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((value) => !value)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-synq-coral md:hidden"
        >
          <span className="sr-only">Toggle navigation</span>
          <span
            className={cn(
              "relative block h-4 w-5",
              "[&::before]:absolute [&::before]:left-0 [&::before]:top-0 [&::before]:h-0.5 [&::before]:w-5 [&::before]:rounded-full [&::before]:bg-current [&::before]:transition",
              "[&::after]:absolute [&::after]:bottom-0 [&::after]:left-0 [&::after]:h-0.5 [&::after]:w-5 [&::after]:rounded-full [&::after]:bg-current [&::after]:transition",
              menuOpen &&
                "[&::before]:top-[7px] [&::before]:rotate-45 [&::after]:bottom-[7px] [&::after]:-rotate-45",
            )}
          >
            <span
              className={cn(
                "absolute left-0 top-[7px] h-0.5 w-5 rounded-full bg-current transition",
                menuOpen && "opacity-0",
              )}
            />
          </span>
        </button>
      </div>

      <div
        id="mobile-menu"
        className={cn(
          "overflow-hidden border-t border-white/10 bg-[#0b233b] transition-[max-height] duration-300 md:hidden",
          menuOpen ? "max-h-96" : "max-h-0 border-t-0",
        )}
      >
        <nav
          className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6"
          aria-label="Mobile"
        >
          {siteContent.navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-2xl px-4 py-3 text-sm font-medium text-white transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-synq-coral"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
