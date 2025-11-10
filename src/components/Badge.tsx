import { cn } from "@/lib/utils";

type BadgeProps = {
  children: React.ReactNode;
  color?: "default" | "green" | "red" | "neutral";
  className?: string;
};

export function Badge({ children, color = "default", className }: BadgeProps) {
  const colorClasses = {
    default: "bg-accent/10 text-foreground",
    green: "bg-[oklch(0.71_0.17_149_/_0.12)] text-[oklch(0.71_0.17_149)]",
    red: "bg-[oklch(0.65_0.27_29_/_0.12)] text-[oklch(0.65_0.27_29)]",
    neutral: "bg-muted text-muted-foreground",
  } as const;

  return (
    <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium", colorClasses[color], className)}>
      {children}
    </span>
  );
}


