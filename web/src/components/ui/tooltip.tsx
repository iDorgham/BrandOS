
import * as React from "react"
import { createPortal } from "react-dom"

const TooltipProvider = ({ children }: { children: React.ReactNode }) => {
    return <>{children}</>
}

interface TooltipContextType {
    open: boolean
    setOpen: (open: boolean) => void
    triggerRef: React.RefObject<HTMLElement | null>
}

const TooltipContext = React.createContext<TooltipContextType | undefined>(undefined)

const Tooltip = ({
    children,
    delayDuration = 0,
    open: controlledOpen,
    onOpenChange
}: {
    children: React.ReactNode
    delayDuration?: number
    open?: boolean
    onOpenChange?: (open: boolean) => void
}) => {
    const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false)
    const open = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen;

    const setOpen = React.useCallback((val: boolean) => {
        if (controlledOpen === undefined) {
            setUncontrolledOpen(val);
        }
        onOpenChange?.(val);
    }, [controlledOpen, onOpenChange]);

    const triggerRef = React.useRef<HTMLElement>(null)

    return (
        <TooltipContext.Provider value={{ open, setOpen, triggerRef }}>
            <div
                className="relative inline-block"
                onMouseEnter={() => {
                    if (delayDuration > 0) {
                        setTimeout(() => setOpen(true), delayDuration);
                    } else {
                        setOpen(true);
                    }
                }}
                onMouseLeave={() => setOpen(false)}
            >
                {children}
            </div>
        </TooltipContext.Provider>
    )
}

const TooltipTrigger = React.forwardRef<
    HTMLElement,
    React.HTMLAttributes<HTMLElement> & { asChild?: boolean }
>(({ className, children, asChild, ...props }, ref) => {
    const context = React.useContext(TooltipContext)
    if (!context) throw new Error("TooltipTrigger must be used within Tooltip")

    // If asChild is true, we clone the child and attach refs/events
    if (asChild && React.isValidElement(children)) {
        return React.cloneElement(children as React.ReactElement<any>, {
            ref: (node: HTMLElement) => {
                // Handle both refs
                context.triggerRef.current = node
                if (typeof ref === 'function') ref(node)
                else if (ref) (ref as React.MutableRefObject<HTMLElement | null>).current = node

                // Handle child's existing ref
                const childRef = (children as any).ref
                if (typeof childRef === 'function') childRef(node)
                else if (childRef) childRef.current = node
            },
            ...props,
            // Merge classNames if needed, but for now just use child's
        })
    }

    return (
        <button
            ref={(node) => {
                context.triggerRef.current = node
                if (typeof ref === 'function') ref(node)
                else if (ref) (ref as React.MutableRefObject<HTMLElement | null>).current = node
            }}
            className={className}
            {...props}
        >
            {children}
        </button>
    )
})
TooltipTrigger.displayName = "TooltipTrigger"

const TooltipContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & { side?: "top" | "right" | "bottom" | "left" }
>(({ className, side = "top", children, ...props }, ref) => {
    const context = React.useContext(TooltipContext)
    if (!context) throw new Error("TooltipContent must be used within Tooltip")

    if (!context.open) return null

    // Calculate position (simple version)
    const triggerRect = context.triggerRef.current?.getBoundingClientRect()

    if (!triggerRect) return null

    const style: React.CSSProperties = {
        position: 'fixed',
        zIndex: 50,
    }

    // Simple positioning logic
    if (side === 'top') {
        style.bottom = window.innerHeight - triggerRect.top + 4
        style.left = triggerRect.left + triggerRect.width / 2
        style.transform = 'translateX(-50%)'
    } else if (side === 'bottom') {
        style.top = triggerRect.bottom + 4
        style.left = triggerRect.left + triggerRect.width / 2
        style.transform = 'translateX(-50%)'
    } else if (side === 'left') {
        style.top = triggerRect.top + triggerRect.height / 2
        style.right = window.innerWidth - triggerRect.left + 4
        style.transform = 'translateY(-50%)'
    } else if (side === 'right') {
        style.top = triggerRect.top + triggerRect.height / 2
        style.left = triggerRect.right + 4
        style.transform = 'translateY(-50%)'
    }

    return createPortal(
        <div
            ref={ref}
            style={style}
            className={`
        z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2
        ${className}
      `}
            {...props}
        >
            {children}
        </div>,
        document.body
    )
})
TooltipContent.displayName = "TooltipContent"

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
