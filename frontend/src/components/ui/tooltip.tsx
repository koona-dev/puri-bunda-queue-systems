import * as React from "react"
import { cn } from "@/lib/utils"

const TooltipProvider = ({ children }: { children: React.ReactNode }) => children

const Tooltip = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = React.useState(false)
  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<{ open: boolean }>, { open })
        }
        return child
      })}
    </div>
  )
}

const TooltipTrigger = ({ children }: { children: React.ReactNode }) => {
  return <span>{children}</span>
}

const TooltipContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { open?: boolean; sideOffset?: number }
>(({ className, sideOffset = 4, open, ...props }, ref) => {
  if (!open) return null
  return (
    <div
      ref={ref}
      style={{ bottom: `calc(100% + ${sideOffset}px)` } as React.CSSProperties}
      className={cn(
        "absolute left-1/2 z-50 -translate-x-1/2 mb-2 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in zoom-in-95 whitespace-nowrap",
        className
      )}
      {...props}
    />
  )
})
TooltipContent.displayName = "TooltipContent"

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
