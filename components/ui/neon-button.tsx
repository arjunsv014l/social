import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Update the neonButtonVariants to work better with white background
const neonButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-white bg-opacity-80 backdrop-blur-sm border text-primary hover:bg-opacity-90",
        neon: "bg-white bg-opacity-80 backdrop-blur-sm border text-primary hover:bg-opacity-90 hover:shadow-lg",
        outline: "bg-transparent border hover:bg-gray-100",
        ghost: "hover:bg-gray-100 hover:text-primary border-none",
        link: "text-primary underline-offset-4 hover:underline",
      },
      neonColor: {
        blue: "neon-text-blue neon-border-blue hover:shadow-blue-500/20",
        purple: "neon-text-purple neon-border-purple hover:shadow-purple-500/20",
        pink: "neon-text-pink neon-border-pink hover:shadow-pink-500/20",
        green: "neon-text-green neon-border-green hover:shadow-green-500/20",
        cyan: "neon-text-cyan neon-border-cyan hover:shadow-cyan-500/20",
        yellow: "neon-text-yellow neon-border-yellow hover:shadow-yellow-500/20",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
      pulse: {
        true: "animate-pulse-glow",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      neonColor: "blue",
      size: "default",
      pulse: false,
    },
  },
)

export interface NeonButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof neonButtonVariants> {
  asChild?: boolean
}

const NeonButton = React.forwardRef<HTMLButtonElement, NeonButtonProps>(
  ({ className, variant, neonColor, size, pulse, ...props }, ref) => {
    return (
      <button className={cn(neonButtonVariants({ variant, neonColor, size, pulse, className }))} ref={ref} {...props}>
        {props.children}
        {variant === "neon" && (
          <span className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        )}
      </button>
    )
  },
)
NeonButton.displayName = "NeonButton"

export { NeonButton, neonButtonVariants }
