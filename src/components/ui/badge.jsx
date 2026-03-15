import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/utils/cn"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg shadow-purple-500/20",
        secondary: "border-transparent bg-gradient-to-r from-teal-600 to-teal-700 text-white shadow-lg shadow-teal-500/20",
        destructive: "border-transparent bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-500/20",
        outline: "text-purple-400 border-purple-500/30",
        success: "border-transparent bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg shadow-green-500/20",
        warning: "border-transparent bg-gradient-to-r from-yellow-600 to-yellow-700 text-white shadow-lg shadow-yellow-500/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({ className, variant, ...props }) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }

