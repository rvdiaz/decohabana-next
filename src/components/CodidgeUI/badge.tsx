import React from "react";

type BadgeVariant = "default" | "secondary" | "destructive" | "outline";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant;
}

const badgeStyles: Record<BadgeVariant, string> = {
  default:
    "bg-primary text-primary-foreground border border-transparent hover:bg-primary/80",
  secondary:
    "bg-secondary text-secondary-foreground border border-transparent hover:bg-secondary/80",
  destructive:
    "bg-destructive text-destructive-foreground border border-transparent hover:bg-destructive/80",
  outline: "text-foreground border border-border hover:bg-accent",
};

export function Badge({
  variant = "default",
  className = "",
  ...props
}: BadgeProps) {
  return (
    <div
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors 
                  focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
                  ${badgeStyles[variant]} ${className}`}
      {...props}
    />
  );
}
