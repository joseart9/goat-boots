"use client";

import * as React from "react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface CustomProgressProps {
  value: number;
  className?: string;
  showValue?: boolean;
  label?: string;
  size?: "default" | "sm" | "lg";
}

export function CustomProgress({
  value,
  className,
  showValue = false,
  label,
  size = "default",
}: CustomProgressProps) {
  const sizeClasses = {
    default: "h-2",
    sm: "h-1",
    lg: "h-4",
  };

  return (
    <div className="space-y-2">
      {label && (
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-foreground">{label}</span>
          {showValue && (
            <span className="text-sm text-muted-foreground">{value}%</span>
          )}
        </div>
      )}
      <Progress value={value} className={cn(sizeClasses[size], className)} />
    </div>
  );
}
