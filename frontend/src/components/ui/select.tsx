import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const Select = ({ children, value, onValueChange }: { children: React.ReactNode; value?: string; onValueChange?: (value: string) => void }) => {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onValueChange?.(e.target.value)}
        className={cn(
          "flex h-9 w-full appearance-none rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pr-8"
        )}
      >
        {children}
      </select>
      <ChevronDown className="absolute right-2 top-2.5 h-4 w-4 opacity-50 pointer-events-none" />
    </div>
  )
}

const SelectValue = () => null 

const SelectTrigger = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={cn("flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50", className)}>
      {children}
    </div>
  )
}

const SelectContent = ({ children }: { children: React.ReactNode }) => children

const SelectItem = ({ children, value }: { children: React.ReactNode; value: string }) => (
  <option value={value}>{children}</option>
)

const SelectGroup = ({ children }: { children: React.ReactNode }) => <optgroup label="">{children}</optgroup>

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectItem,
}
