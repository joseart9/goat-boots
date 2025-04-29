"use client";

import * as React from "react";
import { Switch as ShadcnSwitch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof ShadcnSwitch> {
  label?: string;
  description?: string;
  error?: string;
}

export function Switch({
  label,
  description,
  error,
  className,
  ...props
}: SwitchProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center space-x-2">
        <ShadcnSwitch
          className={cn(
            "data-[state=checked]:bg-primary-500 data-[state=unchecked]:bg-secondary-400 dark:data-[state=unchecked]:bg-secondary-400",
            "h-6",
            "transition-colors duration-200",
            className
          )}
          {...props}
        />
        {label && (
          <label
            htmlFor={props.id}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-black dark:text-white"
          >
            {label}
          </label>
        )}
      </div>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
