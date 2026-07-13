import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-md text-sm font-extrabold transition disabled:pointer-events-none disabled:opacity-60 [&_svg]:size-4',
  {
    variants: {
      variant: {
        default:
          'bg-[#ed3237] !text-white hover:bg-[#d82730] shadow-[0_14px_28px_rgba(237,50,55,.18)]',
        secondary: 'bg-[#f4f5f7] text-[#35374b] hover:bg-[#eceef2]',
        outline:
          'border border-[#e5e7eb] bg-white text-[#35374b] hover:border-[#f4a1a4] hover:text-[#ed3237]',
        ghost: 'bg-transparent text-[#35374b] hover:bg-[#fff0f0] hover:text-[#ed3237]',
        destructive: 'border border-[#f4d0d2] bg-white text-[#b4232a] hover:bg-[#fff0f0]',
      },
      size: {
        default: 'h-11 px-4',
        sm: 'h-9 px-3',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
