import React, { Children, cloneElement, type ComponentProps, type ReactElement, type ReactNode } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import "./star-button.css";

type StarButtonProps = ComponentProps<"button"> & { asChild?: boolean };

function StarDecoration() {
  return (
    <span className="star-button__stars" aria-hidden="true">
      {[1, 2, 3, 4, 5, 6].map(star => (
        <span key={star} className={`star-button__star star-button__star--${star}`}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 784.11 815.53" focusable="false">
            <path d="M392.05 0c-20.9,210.08-184.06,378.41-392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93-210.06 184.09-378.37 392.05-407.74-207.98-29.38-371.16-197.69-392.06-407.78z" />
          </svg>
        </span>
      ))}
    </span>
  );
}

/** The supplied six-star interaction, adapted to DM Labs' glass brand surface.
 * asChild preserves link semantics, handlers, refs, and localized labels.
 */
export default function StarButton({ asChild = false, className, children, type, ...props }: StarButtonProps) {
  const Comp = asChild ? Slot : "button";
  const child = asChild ? Children.only(children) as ReactElement<{ children?: ReactNode }> : null;
  const content = (
    <>
      <span className="star-button__label">{child ? child.props.children : children}</span>
      <StarDecoration />
    </>
  );

  return (
    <Comp {...props} {...(!asChild ? { type: type ?? "button" } : type ? { type } : {})}
      className={cn(!asChild && "btn-primary", "star-button", className)}>
      {child ? cloneElement(child, undefined, content) : content}
    </Comp>
  );
}
