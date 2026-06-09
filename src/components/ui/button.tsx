import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "relative overflow-hidden inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-secondary ring-offset-background transition-all duration-300 ease-out hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow/70 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:translate-y-0 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:bg-white/0 before:transition-colors before:duration-300 hover:before:bg-white/10",
  {
    variants: {
      variant: {
        default:
          "border border-brand-yellow/30 bg-gradient-to-b from-brand-black to-gray-900 text-brand-white font-semibold shadow-[0_10px_30px_rgba(0,0,0,0.35)] hover:border-brand-yellow/70 hover:text-brand-yellow",
        primary:
          "bg-brand-yellow text-white font-semibold shadow-[0_12px_30px_rgba(30,136,229,0.35)] hover:bg-[#1565C0] hover:shadow-[0_16px_40px_rgba(30,136,229,0.45)]",
        secondary:
          "border border-gray-700 bg-gray-900 text-gray-100 font-medium shadow-[0_10px_24px_rgba(0,0,0,0.35)] hover:border-gray-500 hover:bg-gray-800",
        glass:
          "border border-white/25 bg-white/10 text-brand-white backdrop-blur-md font-medium shadow-[0_10px_30px_rgba(0,0,0,0.25)] hover:border-brand-yellow/60 hover:bg-white/20 hover:text-brand-yellow",
        destructive:
          "bg-destructive text-destructive-foreground font-semibold hover:bg-destructive/90",
        outline:
          "border border-input bg-background font-medium hover:bg-accent hover:text-accent-foreground",
        ghost: "font-medium hover:bg-accent hover:text-accent-foreground",
        link: "before:hidden font-medium text-primary underline-offset-4 hover:underline hover:translate-y-0",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
