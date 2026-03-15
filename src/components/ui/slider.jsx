import * as React from "react"
import { cn } from "@/utils/cn"

const Slider = React.forwardRef(({ className, value, onValueChange, min = 0, max = 100, step = 1, ...props }, ref) => {
  const [internalValue, setInternalValue] = React.useState(value ?? 50)

  const handleChange = (e) => {
    const newValue = Number(e.target.value)
    setInternalValue(newValue)
    onValueChange?.(newValue)
  }

  const currentValue = value ?? internalValue
  const percentage = ((currentValue - min) / (max - min)) * 100

  return (
    <div className={cn("relative flex w-full touch-none select-none items-center", className)}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={currentValue}
        onChange={handleChange}
        className="sr-only"
        ref={ref}
        {...props}
      />
      <div className="relative h-2 w-full grow overflow-hidden rounded-full bg-purple-900/30">
        <div
          className="absolute h-full bg-gradient-to-r from-purple-600 to-purple-700 transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div
        className="absolute h-4 w-4 rounded-full bg-white shadow-lg ring-2 ring-purple-500/50 transition-all"
        style={{ left: `calc(${percentage}% - 8px)` }}
      />
    </div>
  )
})
Slider.displayName = "Slider"

export { Slider }

