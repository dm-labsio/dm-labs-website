import React, { Children, cloneElement, type ComponentProps, type ReactElement, type ReactNode } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import "./brand-button.css";

type BrandButtonProps = ComponentProps<"button"> & { asChild?: boolean };

/** One visual treatment, with the original link/button semantics and handlers. */
export default function BrandButton({ asChild = false, className, children, type, ...props }: BrandButtonProps) {
  const Comp = asChild ? Slot : "button";
  const child = asChild ? Children.only(children) as ReactElement<{ children?: ReactNode }> : null;
  const content = <span className="brand-button__label">{child ? child.props.children : children}</span>;
  return (
    <Comp {...props} {...(!asChild ? { type: type ?? "button" } : type ? { type } : {})}
      className={cn("brand-button", className)}>
      {child ? cloneElement(child, undefined, content) : content}
    </Comp>
  );
}
