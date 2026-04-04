import * as React from "react"
import { cn } from "@/lib/utils"

const badgeVariants = {
  base: "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  variant: {
    default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
    secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
    destructive: "border-transparent bg-destructive text-white shadow hover:bg-destructive/80",
    outline: "text-foreground",
    warning: "border-transparent bg-amber-100 text-amber-800 shadow hover:bg-amber-100/80",
    success: "border-transparent bg-green-100 text-green-800 shadow hover:bg-green-100/80",
    info: "border-transparent bg-blue-100 text-blue-800 shadow hover:bg-blue-100/80",
  },
}

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof badgeVariants.variant
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div 
      className={cn(
        badgeVariants.base, 
        badgeVariants.variant[variant], 
        className
      )} 
      {...props} 
    />
  )
}

export { Badge }
