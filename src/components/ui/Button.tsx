"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { type ReactNode, type ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "electric";
  size?: "sm" | "md" | "lg";
  href?: string;
  icon?: ReactNode;
  children: ReactNode;
}

const variants = {
  primary:
    "bg-accent text-primary font-bold hover:bg-accent-dark shadow-lg hover:shadow-xl",
  secondary:
    "border-2 border-white text-white hover:bg-white/10",
  outline:
    "border-2 border-primary text-primary hover:bg-primary hover:text-white",
  electric:
    "bg-electric text-white hover:bg-electric-light shadow-lg hover:shadow-xl",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export default function Button({
  variant = "primary",
  size = "md",
  href,
  icon,
  children,
  className,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 hover:-translate-y-0.5 cursor-pointer",
    variants[variant],
    sizes[size],
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
        {icon && <span className="inline-flex">{icon}</span>}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
      {icon && <span className="inline-flex">{icon}</span>}
    </button>
  );
}
